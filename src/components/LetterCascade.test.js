import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useAnimate, useReducedMotion } from "framer-motion";
import LetterCascade from "./LetterCascade";

jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: { span: React.forwardRef((props, ref) => <span {...props} ref={ref} />) },
    stagger: jest.fn(() => () => 0),
    useAnimate: jest.fn(),
    useReducedMotion: jest.fn(),
  };
});

let animate;
beforeEach(() => {
  animate = jest.fn().mockResolvedValue(undefined);
  useAnimate.mockReturnValue([{ current: null }, animate]);
  useReducedMotion.mockReturnValue(false);
});

test("keeps Thai graphemes intact and hides the duplicate letters from assistive technology", () => {
  const text = "\u0e40\u0e2d\u0e34\u0e23\u0e4c\u0e19";
  const { container } = render(<LetterCascade text={text} />);
  expect(screen.getByLabelText(text)).toBeInTheDocument();
  expect([...container.querySelectorAll('.cascade-front')].map(e => e.textContent)).toEqual(["\u0e40", "\u0e2d\u0e34", "\u0e23\u0e4c", "\u0e19"]);
  expect(container.querySelector('.cascade-echo').closest('[aria-hidden="true"]')).not.toBeNull();
});

test("plays a staggered spring flip on click, ignores overlapping triggers, and resets", async () => {
  render(<LetterCascade text="Name" />);
  const text = screen.getByLabelText('Name');
  fireEvent.click(text);
  fireEvent.click(text);
  expect(animate).toHaveBeenCalledTimes(2);
  expect(animate).toHaveBeenCalledWith('.cascade-front', expect.objectContaining({ rotateX: 90 }), expect.objectContaining({ type: 'spring', stiffness: 220, damping: 16 }));
  await waitFor(() => expect(animate).toHaveBeenCalledTimes(4));
  fireEvent.click(text);
  await waitFor(() => expect(animate).toHaveBeenCalledTimes(8));
});

test("does not animate when reduced motion is requested", () => {
  useReducedMotion.mockReturnValue(true);
  render(<LetterCascade text="Name" />);
  fireEvent.click(screen.getByLabelText('Name'));
  expect(animate).not.toHaveBeenCalled();
});
