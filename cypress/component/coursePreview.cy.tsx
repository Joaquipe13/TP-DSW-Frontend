import { MemoryRouter } from "react-router-dom";
import CoursePreview from "../../src/components/course/coursePreview";
import { baseCourse } from "../support/data";

describe("CoursePreview", () => {
  const setAdminUser = () => {
    cy.setCookie(
      "user",
      JSON.stringify({
        id: 10,
        name: "Admin",
        surname: "User",
        email: "admin@test.com",
        admin: true,
      })
    );
  };

  const setRegularUser = () => {
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
  };

  it("muestra datos del curso", () => {
    setRegularUser();

    cy.mount(
      <MemoryRouter>
        <CoursePreview course={baseCourse as any} />
      </MemoryRouter>
    );

    cy.contains(baseCourse.title).should("be.visible");
    cy.contains(baseCourse.resume).should("be.visible");
    cy.contains("Price:").should("be.visible");
    cy.contains(baseCourse.price).should("be.visible");
    cy.contains(baseCourse.topics[0].description).should("be.visible");
    cy.contains(baseCourse.topics[1].description).should("be.visible");
    cy.contains("Created at:").should("be.visible");
    cy.contains(
      new Date(baseCourse.createdAt).toLocaleDateString("es-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ).should("be.visible");
  });

  it("muestra botón Edit para admin", () => {
    setAdminUser();

    cy.mount(
      <MemoryRouter>
        <CoursePreview course={baseCourse as any} />
      </MemoryRouter>
    );

    cy.get('[data-testid="edit-course-React Avanzado-button"]').should(
      "be.visible"
    );
  });

  it("muestra botón View para usuario", () => {
    setRegularUser();

    cy.mount(
      <MemoryRouter>
        <CoursePreview course={baseCourse as any} />
      </MemoryRouter>
    );

    cy.get('[data-testid="view-course-React Avanzado-button"]').should(
      "be.visible"
    );
  });
});
