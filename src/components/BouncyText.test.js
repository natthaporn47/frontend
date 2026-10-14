import { render, screen } from "@testing-library/react";
import BouncyText from "./BouncyText";

test("keeps the complete heading accessible while animating individual letters", () => {
  const { container } = render(<h1><BouncyText text="Skills & Technologies" /></h1>);
  expect(screen.getByRole("heading", { name: "Skills & Technologies" })).toBeInTheDocument();
  expect(container.querySelectorAll(".bouncy-word")).toHaveLength(3);
  expect(container.querySelector(".bouncy-text-colorful")).toBeInTheDocument();
});

test("allows names to bounce without changing their color", () => {
  const { container } = render(<BouncyText text="Natthaporn Wangsuk" colorful={false} />);
  expect(container.querySelector(".bouncy-letter")).toBeInTheDocument();
  expect(container.querySelector(".bouncy-text-colorful")).not.toBeInTheDocument();
});

test("keeps Thai combining marks attached to the letter", () => {
  const { container } = render(<BouncyText text={"\u0e40\u0e2d\u0e34\u0e23\u0e4c\u0e19"} colorful={false} />);
  expect(Array.from(container.querySelectorAll(".bouncy-letter"), letter => letter.textContent)).toEqual(["\u0e40", "\u0e2d\u0e34", "\u0e23\u0e4c", "\u0e19"]);
});
