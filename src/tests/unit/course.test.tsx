import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CourseGetOne from "@components/course/course";
import useGet from "@hooks/crud/useGet";
import getUser from "@utils/auth/getUser";
import checkSubscription from "@utils/auth/checkSubscription";
import checkPurchase from "@utils/auth/checkPurchase";

// Mock de dependencias
jest.mock("../../hooks/crud/useGet");
jest.mock("../../utils/auth/getUser", () => ({
  getUser: jest.fn(),
}));
jest.mock("../../utils/auth/checkPurchase", () => ({
  checkPurchase: jest.fn(),
}));
jest.mock("../../utils/auth/checkSubscription", () => ({
  checkSubscription: jest.fn(),
}));

// Mock de componentes secundarios
jest.mock("../../components/common/loading", () => () => (
  <div data-testid="loading">Loading...</div>
));
jest.mock(
  "../../components/common/error",
  () =>
    ({ message }: { message: string }) =>
      <div data-testid="error">{message}</div>
);
jest.mock("../../components/topic/topics", () => () => (
  <div data-testid="topics">Topics</div>
));
jest.mock("../../components/level/levelList", () => () => (
  <div data-testid="levels">Levels</div>
));
jest.mock("../../components/common/buttons/navigationButton", () => () => (
  <button data-testid="edit-button">Edit</button>
));
jest.mock("../../components/common/buttons/purchaseButton", () => () => (
  <button data-testid="purchase-button">Purchase</button>
));

describe("CourseGetOne Component", () => {
  const mockCourse = {
    id: "1",
    title: "React Testing",
    resume: "Learn how to test React components",
    price: 100,
    topics: [],
    createdAt: "2023-09-22",
  };

  test("muestra el loading al inicio", () => {
    (useGet as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      fetchData: jest.fn(),
    });

    render(<CourseGetOne id="1" />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("muestra error si ocurre un problema en la API", () => {
    (useGet as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Error fetching course",
      fetchData: jest.fn(),
    });

    render(<CourseGetOne id="1" />);

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Error fetching course"
    );
  });

  test("muestra la información del curso si se carga correctamente", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    render(<CourseGetOne id="1" />);

    expect(screen.getByText("React Testing")).toBeInTheDocument();
    expect(
      screen.getByText("Learn how to test React components")
    ).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByTestId("topics")).toBeInTheDocument();
    expect(screen.getByTestId("levels")).toBeInTheDocument();
  });

  test("muestra el botón de compra para un usuario no autenticado", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    (getUser as jest.Mock).mockResolvedValue(null);

    render(<CourseGetOne id="1" />);

    await waitFor(() => {
      expect(screen.getByTestId("purchase-button")).toBeInTheDocument();
    });
  });

  test("muestra el botón de edición para un administrador", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    (getUser as jest.Mock).mockResolvedValue({ id: "123", admin: true });

    render(<CourseGetOne id="1" />);

    await waitFor(() => {
      expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    });
  });

  test("muestra el botón de compra si el usuario no ha comprado ni está suscrito", async () => {
    (useGet as jest.Mock).mockReturnValue({
      data: mockCourse,
      loading: false,
      error: null,
      fetchData: jest.fn(),
    });

    (getUser as jest.Mock).mockResolvedValue({ id: "123", admin: false });
    (checkPurchase as jest.Mock).mockResolvedValue(false);
    (checkSubscription as jest.Mock).mockResolvedValue(false);

    render(<CourseGetOne id="1" />);

    await waitFor(() => {
      expect(screen.getByTestId("purchase-button")).toBeInTheDocument();
    });
  });
});
