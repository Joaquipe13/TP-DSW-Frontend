import { course, topic, level, unit } from './data';
const apiUrl = Cypress.env('apiUrl');

Cypress.Commands.add('userMenuNavBar', () => {
  cy.get('[data-testid="navbar-user-menu"]').click();
  cy.wait(500);    
});

Cypress.Commands.add('getAdminCredentials', () => {
  return cy.request('GET', `${apiUrl}/api/e2e/adminCredentials`).then((response) => {
    expect(response.status).to.equal(200);
    return response.body.data;
  });
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.getAdminCredentials().then((adminData) => {
    cy.logout();

    cy.visit('/');

    cy.get('[data-testid="navbar-user-menu"]').click();

    cy.get('[data-testid="navbar-login-button"]').should('be.visible').wait(500);
    cy.get('[data-testid="navbar-login-button"]').click();

    cy.get('form').should('be.visible').wait(500);
    cy.get('[data-testid="login-email-input"]').type(adminData.email);
    cy.get('[data-testid="login-password-input"]').type(adminData.password);
    cy.get('[data-testid="login-submit-button"]').click();
    
    cy.url().should('include', '/');
    cy.wait(1000);
  });
});

Cypress.Commands.add('getUserCredentials', () => {
  return cy.request('GET', `${apiUrl}/api/e2e/userCredentials`).then((response) => {
    expect(response.status).to.equal(200);
    console.log(response.body.data);
    return response.body.data; 
  });
});

Cypress.Commands.add('loginAsUser', () => {
  cy.getUserCredentials().then((userData) => {
    cy.logout();

    cy.visit('/');
    cy.get('[data-testid="navbar-user-menu"]').click();

    cy.get('[data-testid="navbar-login-button"]').should('be.visible').wait(500).click();
    
    
    cy.get('form').should('be.visible').wait(500);
    cy.get('[data-testid="login-email-input"]').should('be.visible').wait(500);
    cy.get('[data-testid="login-email-input"]').type(userData.email);
    cy.get('[data-testid="login-password-input"]').type(userData.password);
    cy.get('[data-testid="login-submit-button"]').click();
    
    cy.url().should('include', '/');
    cy.wait(1000);
  });
});

Cypress.Commands.add('logout', () => {
  cy.visit('/');
  cy.get('[data-testid="navbar-user-menu"]').click();

  cy.get('body').then($body => {
    if ($body.find('[data-testid="navbar-logout-button"]').length > 0) {
      cy.get('[data-testid="navbar-logout-button"]').click();
      cy.wait(1000);
      cy.get('[data-testid="navbar-user-menu"]').click();
    }
  });
});

Cypress.Commands.add('createTopic', () => {
  cy.visit('/topic/create');
  cy.get('form').should('be.visible').wait(500);
  cy.get('[data-testid="topic-name"]').type(topic.description);
  cy.get('[data-testid="create-topic-button"]').click();
  cy.on('window:confirm', () => true);
  cy.get(`[data-testid="topic-item-${topic.description}"]`).should('be.visible').wait(500);
});

Cypress.Commands.add('createCourse', () : Cypress.Chainable<number> => {
  cy.intercept('POST', '**/api/courses').as('createCourseRequest');
  
  cy.visit('/course/create');
  cy.get('form').should('be.visible').wait(500);
  cy.get('[data-testid="course-title"]').type(course.title);
  cy.get('[data-testid="course-resume"]').type(course.resume);
  cy.get('[data-testid="course-price"]').type(course.price);
  cy.get(`[data-testid="unselected-topic-${topic.description}"]`).should('be.visible').wait(500);
  cy.get(`[data-testid="unselected-topic-${topic.description}"]`).click();
  cy.get('[data-testid="create-course-button"]').click();
  cy.on('window:confirm', () => true);
  
  cy.wait('@createCourseRequest').then((interception) => {
    const courseId = interception.response?.body.data.id;
    cy.url().should('include', '/course/');
    cy.wrap(courseId).as('courseId');
  });
  return cy.get<number>('@courseId');
});

Cypress.Commands.add('createLevelAndUnit', (course:Number|String) => {
cy.visit(`/course/update/${course}`);

  cy.get('[data-testid="add-level-button"]').click();
  cy.url().should('include', '/level/create');
  cy.get('form').should('be.visible').wait(500);
  cy.get('[data-testid="level-name"]').type(level.name);
  cy.get('[data-testid="level-description"]').type(level.description);
  cy.get('[data-testid="create-level-button"]').click();
  cy.url().should('include', '/level/');

  cy.get('[data-testid="add-unit-button"]').click();
  cy.url().should('include', '/unit/create');
  cy.get('form').should('be.visible').wait(500);
  cy.get('[data-testid="unit-name"]').type(unit.name);
  cy.get('[data-testid="unit-content"]').type(unit.content);
  cy.get('[data-testid="create-unit-button"]').click();
  cy.url().should('include', '/level/');
});

Cypress.Commands.add('publishCourse', (course:Number|String) => {
  cy.visit(`/course/update/${course}`);
  cy.get('[data-testid="publish-course-button"]').click();

  cy.get('[data-testid="delete-course-button"]').should('be.visible').wait(500);
});

Cypress.Commands.add('createCourseViaAPI', ()  : Cypress.Chainable<number> => {
  return cy.getAdminCredentials().then((adminData) => {
    return cy.request('POST', `${apiUrl}/api/login`, {
      email: adminData.email,
      password: adminData.password,
    }).then((response) => {
      expect(response.status).to.equal(200);
      const token = response.body.data;
    
      return cy.request({
        method: 'GET',
        url: `${apiUrl}/api/topics`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then((topicsResponse) => {
        let topicId = topicsResponse.body.data?.find((t: any) => t.description === topic.description)?.id;
        
        if (!topicId) {
          return cy.request({
            method: 'POST',
            url: `${apiUrl}/api/topics`,
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: { description: topic.description },
          }).then((topicResponse) => {
            expect(topicResponse.status).to.equal(201);
            topicId = topicResponse.body.data.id;
            return cy.request({
              method: 'POST',
              url: `${apiUrl}/api/courses`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              body: {
                title: course.title,
                resume: course.resume,
                price: parseFloat(course.price),
                topics: [topicId],
              },
            }).then((courseResponse) => {
              expect(courseResponse.status).to.equal(201);
              const courseId = courseResponse.body.data?.id;
              
              return cy.request({
                method: 'POST',
                url: `${apiUrl}/api/levels`,
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: { name: level.name, description: level.description, course: courseId },
              }).then((levelResponse) => {
                expect(levelResponse.status).to.equal(201);
                const levelId = levelResponse.body.data?.id;
                
                return cy.request({
                  method: 'POST',
                  url: `${apiUrl}/api/units`,
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                  body: { name: unit.name, content: unit.content, level: levelId },
                }).then((unitResponse) => {
                  expect(unitResponse.status).to.equal(201);
                  return courseId;
                });
              });
            });
          });
        } else {
          return cy.request({
            method: 'POST',
            url: `${apiUrl}/api/courses`,
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: {
              title: course.title,
              resume: course.resume,
              price: parseFloat(course.price),
              topics: [topicId],
            },
          }).then((courseResponse) => {
            expect(courseResponse.status).to.equal(201);
            const courseId = courseResponse.body.data?.id;
            
            return cy.request({
              method: 'POST',
              url: `${apiUrl}/api/levels`,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              body: { name: level.name, description: level.description, course: courseId },
            }).then((levelResponse) => {
              expect(levelResponse.status).to.equal(201);
              const levelId = levelResponse.body.data?.id;
              
              return cy.request({
                method: 'POST',
                url: `${apiUrl}/api/units`,
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: { name: unit.name, content: unit.content, level: levelId },
              }).then((unitResponse) => {
                expect(unitResponse.status).to.equal(201);
                return courseId;
              });
            });
          });
        }
      });
    });      
  });
});

