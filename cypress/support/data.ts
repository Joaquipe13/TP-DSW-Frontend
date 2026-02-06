

export const course = {
    title: 'E2E Test Course',
    resume: 'Test course description',
    price: '99.99',
}

export const topic = {
    description: 'Test EtE',
}

export const level = {
    name: 'E2E Test Level',
    description: 'E2E test level description. Blah blah blah.',
}

export const unit = {
    name: 'E2E Test Unit',
    content: 'E2E test unit content. Blah blah blah.',
}

export const mockTopics = [
  { id: 1, description: "Hooks" },
  { id: 2, description: "Context API" },
  { id: 3, description: "Components" },
  { id: 4, description: "JSX" },
  { id: 5, description: "State Management" },
  { id: 6, description: "Props" },
  { id: 7, description: "Types" },
  { id: 8, description: "Interfaces" },
  { id: 9, description: "Generics" },
  { id: 10, description: "React Router" },
];

export const mockCourses = [
  {
    id: 1,
    title: "React Basics",
    price: 1000,
    resume: "Learn React basics",
    isActive: true,
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
    topics: [
        mockTopics[0],
        mockTopics[1],
        mockTopics[3],
    ],
  },
  {
    id: 2,
    title: "React Advanced",
    resume: "Learn React advanced",
    price: 2000,
    isActive: false,
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
    topics: [
        mockTopics[0],
        mockTopics[1],
        mockTopics[9],
    ],
  },
  {
    id: 3,
    title: "TypeScript Basics",
    resume: "Learn TypeScript",
    price: 1500,
    isActive: true,
    createdAt: new Date("2025-01-15T00:00:00.000Z"),
    topics: [
      mockTopics[6],
      mockTopics[7],
      mockTopics[8],
    ],
  },
];


export const baseCourse = {
  id: 5,
  title: "React Avanzado",
  resume: "Curso avanzado de React",
  price: 2500,
  createdAt: new Date("2025-01-15T00:00:00.000Z"),
  topics: [
    mockTopics[0],
    mockTopics[1],
  ],
};