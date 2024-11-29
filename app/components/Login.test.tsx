import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render the login form", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  // it("should display an error message when fields are empty", async () => {
  //   render(<Login />);

  //   fireEvent.click(screen.getByRole("button", { name: /login/i }));

  //   expect(screen.getByText(/both fields are required/i)).toBeInTheDocument();
  // });

  it("should display an error for unsuccessful login", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongPassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("should redirect to dashboard if the user is already logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "loggedInUser" },
      login: mockLogin,
    });

    render(<Login />);

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
