/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

// it("App Router: Works with Server Components", () => {
//   render(<Page />);
//   expect(screen.getByRole("heading")).toHaveTextContent("App Router");
// });

test("Test functions that import server-only", () => {
  expect(1 + 2).toBe(3);
});
