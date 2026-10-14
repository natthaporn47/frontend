import { render, screen } from "@testing-library/react";
import TextRepel, { getRepelOffset } from "./TextRepel";

test("preserves the accessible name and word boundaries", () => {
  const { container } = render(<h2><TextRepel text="Natthaporn Wangsuk" /></h2>);
  expect(screen.getByRole('heading', { name: 'Natthaporn Wangsuk' })).toBeInTheDocument();
  expect(container.querySelectorAll('.repel-word')).toHaveLength(2);
  expect(container.querySelectorAll('.repel-letter')).toHaveLength(17);
  expect(container.querySelector('.repel-letter').closest('[aria-hidden="true"]')).not.toBeNull();
});

test("pushes away from the pointer with quadratic falloff", () => {
  expect(getRepelOffset(60, 0, 120, 40)).toEqual({ x: 10, y: 0 });
  expect(getRepelOffset(0, -60, 120, 40)).toEqual({ x: 0, y: -10 });
});

test("leaves distant letters still and handles the exact center without invalid numbers", () => {
  expect(getRepelOffset(120, 0, 120, 40)).toEqual({ x: 0, y: 0 });
  expect(getRepelOffset(0, 0, 120, 40)).toEqual({ x: 0, y: -40 });
});
