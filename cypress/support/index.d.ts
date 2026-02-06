declare namespace Cypress {
  interface Chainable {
    mount(component: React.ReactElement, options?: MountOptions): Chainable<void>;
    userMenuNavBar(): Chainable<void>;
    getAdminCredentials(): Chainable<{ email: string; password: string }>;
    loginAsAdmin(): Chainable<void>;
    getUserCredentials(): Chainable<{ email: string; password: string }>;
    loginAsUser(): Chainable<void>;
    logout(): Chainable<void>;
    createTopic(): Chainable<void>;
    createCourse(): Chainable<number>;
    createLevelAndUnit(course: Number | String): Chainable<void>;
    publishCourse(course: Number | String): Chainable<void>;
    createCourseViaAPI(): Chainable<number>;
  }
}
