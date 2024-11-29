import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

// Mock the AuthContext and useRouter
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navbar", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render login button if the user is not logged in", () => {
    // Mock user as null (not logged in)
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    render(<Navbar />);

    // Check if Login button is rendered
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should render dashboard and logout buttons if the user is logged in", () => {
    // Mock user object (logged in)
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testuser" },
      logout: jest.fn(),
    });

    render(<Navbar />);

    // Check if Dashboard and Logout buttons are rendered
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should navigate to home when home button is clicked", () => {
    // Mock user as logged in
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testuser" },
      logout: jest.fn(),
    });

    render(<Navbar />);

    fireEvent.click(screen.getByText("Home"));

    // Check if router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should navigate to login page when login button is clicked (if not logged in)", () => {
    // Mock user as null (not logged in)
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    render(<Navbar />);

    fireEvent.click(screen.getByText("Login"));

    // Check if router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should call logout function when logout button is clicked", () => {
    const mockLogout = jest.fn();
    // Mock user object (logged in)
    (useAuth as jest.Mock).mockReturnValue({
      user: { username: "testuser" },
      logout: mockLogout,
    });

    render(<Navbar />);

    fireEvent.click(screen.getByText("Logout"));

    // Check if logout function was called
    expect(mockLogout).toHaveBeenCalled();
  });
});
