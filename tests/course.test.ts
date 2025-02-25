import { render, screen, waitFor } from "@testing-library/react";
import { CourseGetOne } from "../src/components/index";
import { useGet } from "../src/hooks/index";
import {
  getUser,
  checkPurchase,
  checkSubscription,
  Course,
} from "../src/utils/index";

jest.mock("../src/hooks/index", () => ({
  useGet: jest.fn(),
}));

jest.mock("../src/utils/index", () => ({
  getUser: jest.fn(),
  checkPurchase: jest.fn(),
  checkSubscription: jest.fn(),
}));

describe("CourseGetOne Component", () => {
  const mockCourse: Course = {
    id: "1",
    title: "Test Course",
    resume: "This is a test course",
    price: 50,
    topics: [{ id: 1, description: "Topic 1" }],
    createdAt: "2024-01-01T00:00:00Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the course details correctly", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    render(<CourseGetOne id="1" />);

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(screen.getByText("This is a test course")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("Topic 1")).toBeInTheDocument();
  });

  it("should show the edit button for an admin", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    (getUser as jest.Mock).mockResolvedValue({ id: "user1", admin: true });

    render(<CourseGetOne id="1" />);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
    );
  });

  it("should show the purchase button for non-admins without access", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    (getUser as jest.Mock).mockResolvedValue({ id: "user2", admin: false });
    (checkPurchase as jest.Mock).mockResolvedValue(false);
    (checkSubscription as jest.Mock).mockResolvedValue(false);

    render(<CourseGetOne id="1" />);

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Purchase" })
      ).toBeInTheDocument()
    );
  });
});
