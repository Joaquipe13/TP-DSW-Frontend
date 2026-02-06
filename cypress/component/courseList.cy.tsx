import { MemoryRouter } from "react-router-dom";
import CourseList from "../../src/components/course/courseList";
import { mockCourses } from "../support/data";


describe("CourseList", () => {
  const getCourses = (data = mockCourses) => {
    cy.intercept("GET", "**/api/courses*", (req) => {
      const title = typeof req.query.title === "string" ? req.query.title : "";
      const filteredData = title
        ? data.filter((course) => course.title.includes(title))
        : data;

      req.reply({
        statusCode: 200,
        body: {
          status: "Success",
          message: "Found all courses",
          data: filteredData,
        },
      });
    }).as("getCourses");
  };

  beforeEach(() => {
    cy.setCookie(
      "user",
      JSON.stringify({
        id: 20,
        name: "User",
        surname: "Test",
        email: "user@test.com",
        admin: false,
      })
    );
  });

  it("renders active courses when view=1", () => {
    getCourses();

    cy.mount(
      <MemoryRouter>
        <CourseList view={1} title="" />
      </MemoryRouter>
    );

    cy.wait("@getCourses");
    cy.contains(mockCourses[0].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[0].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[0].topics.length; i++) {
      cy.contains(mockCourses[0].topics[i].description).should("be.visible");
    }
    cy.contains(mockCourses[1].title).should("not.exist");
    cy.contains(mockCourses[2].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[2].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[2].topics.length; i++) {
      cy.contains(mockCourses[2].topics[i].description).should("be.visible");
    }
  });

  it("renders inactive courses when view=2", () => {
    getCourses(); 
    cy.mount(
      <MemoryRouter>
        <CourseList view={2} title="" />
      </MemoryRouter>
    );

    cy.wait("@getCourses");
    cy.contains(mockCourses[2].title).should("not.exist");
    cy.contains(mockCourses[0].title).should("not.exist");
    cy.contains(mockCourses[1].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[1].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[1].topics.length; i++) {
      cy.contains(mockCourses[1].topics[i].description).should("be.visible");
    }
  });

  it("renders all courses when view=3", () => {
    getCourses();

    cy.mount(
      <MemoryRouter>
        <CourseList view={3} title="" />
      </MemoryRouter>
    );

    cy.wait("@getCourses");
    cy.contains(mockCourses[0].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[0].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[0].topics.length; i++) {
      cy.contains(mockCourses[0].topics[i].description).should("be.visible");
    }
    cy.contains(mockCourses[1].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[1].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[1].topics.length; i++) {
      cy.contains(mockCourses[1].topics[i].description).should("be.visible");
    }
    cy.contains(mockCourses[2].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[2].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[2].topics.length; i++) {
      cy.contains(mockCourses[2].topics[i].description).should("be.visible");
    }
    
  });

  it("renders NotAvailableAlert when no courses are found", () => {
    getCourses([]);

    cy.mount(
      <MemoryRouter>
        <CourseList view={1} title="nonExistentTitle"/>
      </MemoryRouter>
    );

    cy.wait("@getCourses");
    cy.contains("No courses available").should("be.visible");
  });

  it("filters courses by title via the API", () => {
    getCourses();

    cy.mount(
      <MemoryRouter>
        <CourseList view={3} title={mockCourses[0].title} />
      </MemoryRouter>
    );

    cy.wait("@getCourses");
    cy.contains(mockCourses[0].title).should("be.visible");
    cy.contains(`Price: $${mockCourses[0].price}`).should("be.visible");
    for (let i = 0; i < mockCourses[0].topics.length; i++) {
      cy.contains(mockCourses[0].topics[i].description).should("be.visible");
    }
    cy.contains(mockCourses[1].title).should("not.exist");
    cy.contains(mockCourses[2].title).should("not.exist");
  });  
});
