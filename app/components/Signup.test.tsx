import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Signup Component", () => {
  const mockLogin = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    mockLogin.mockClear();
    mockPush.mockClear();
  });

  it("should render the signup form", () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
  });

  // it("should show error when fields are empty", async () => {
  //   render(<Signup />);

  //   fireEvent.click(screen.getByRole("button", { name: /signup/i }));

  //   await waitFor(() => {
  //     expect(screen.getByText("All fields are required.")).toBeInTheDocument();
  //   });
  // });

  it("should show error when passwords do not match", async () => {
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });
  });

  it("should show error when signup fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Signup failed" }),
      })
    ) as jest.Mock;

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText("Signup failed")).toBeInTheDocument();
    });
  });
});
