import { course, topic } from '../../support/data';

const apiUrl = Cypress.env('apiUrl');

describe('Create course', () => {
  beforeEach(() => {
    cy.request('POST', `${apiUrl}/api/e2e/reset-schema`)
    cy.loginAsAdmin();
    cy.createTopic();
  });

  it('Should create and publish a course as admin and then purchase it as user', () => {
    cy.createCourse().then((courseId) => {
      if (!courseId) {
        throw new Error('courseId is undefined');
      }
      cy.createLevelAndUnit(courseId);
      cy.publishCourse(courseId);
    });
    cy.logout();
    cy.loginAsUser();

    cy.get(`[data-testid="view-course-${course.title}-button"]`).click();
    cy.get('[data-testid="purchase-course-button"]').click();
  });

  it('Should validate required fields when creating a course', () => {
    cy.visit('/course/create');
    cy.get('form').should('be.visible').wait(500);

    cy.get('[data-testid="create-course-button"]').click();

    cy.get('[data-testid="course-title-error"]').should('be.visible').wait(500);
    cy.get('[data-testid="course-resume-error"]').should('be.visible');
    cy.get('[data-testid="course-price-error"]').should('be.visible');
    cy.get('[data-testid="course-topics-error"]').should('be.visible')
  });

  it('Should validate that price is a positive number', () => {
    cy.visit('/course/create');
    cy.get('form').should('be.visible').wait(500);
    cy.get('[data-testid="course-title"]').type(course.title);
    cy.get('[data-testid="course-resume"]').type(course.resume);
    cy.get('[data-testid="course-price"]').type('-50');
    cy.get(`[data-testid="unselected-topic-${topic.description}"]`).should('be.visible').wait(500);
    cy.get(`[data-testid="unselected-topic-${topic.description}"]`).click();
    cy.get('[data-testid="create-course-button"]').click();
    cy.get('[data-testid="course-price-error"]').should('be.visible');
  });
  
});


describe('Edit and delete published course', () => {
  let courseId: number;
  beforeEach(() => {
    cy.request('POST', `${apiUrl}/api/e2e/reset-schema`)
    cy.createCourseViaAPI().then((id) => {
      courseId = id;
    });
  })

  it('Should edit a published course', () => {
    cy.loginAsAdmin();
    cy.publishCourse(courseId);

    const updatedTitle = 'Updated Course';
    const updatedResume = 'Updated course description';
    cy.get('[data-testid="course-title"]').clear().type(updatedTitle);
    cy.get('[data-testid="course-resume"]').clear().type(updatedResume);
    cy.get('[data-testid="save-course-changes-button"]').click();

    cy.on('window:confirm', () => true);
    cy.get('[data-testid="course-title"]').should('have.value', updatedTitle);
  });

  it('Should display errors when trying to save with empty fields', () => {
    cy.loginAsAdmin();
    cy.publishCourse(courseId);
    
    cy.get('[data-testid="course-title"]').clear();
    cy.get('[data-testid="course-title"]').should('have.value', '');
    
    cy.get('[data-testid="course-resume"]').clear();
    cy.get('[data-testid="course-resume"]').should('have.value', '');
    cy.get('[data-testid="course-price"]').clear().type('-50');
    cy.get('[data-testid="unselect-all-topics-button"]').click();
    
    cy.get('[data-testid="save-course-changes-button"]').click();
    
    cy.get('[data-testid="course-title-error"]').should('be.visible').wait(500);
    cy.get('[data-testid="course-resume-error"]').should('be.visible');
    cy.get('[data-testid="course-price-error"]').should('be.visible');
    cy.get('[data-testid="course-topics-error"]').should('be.visible')
  });


  it('Should delete a published course', () => {
    cy.loginAsAdmin();
    cy.publishCourse(courseId);

    cy.get('[data-testid="delete-course-button"]').click();
    cy.on('window:confirm', () => true);

    cy.get(`[data-testid="course-item-${course.title}"]`).should('not.exist');
  });
});

