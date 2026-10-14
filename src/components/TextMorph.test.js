import { act, render, screen } from "@testing-library/react";
import TextMorph from "./TextMorph";
import { StrictMode } from "react";

const words = ['Web Developer', 'Mobile Developer'];
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test('morphs between developer roles while keeping both roles accessible', () => {
  const { container, unmount } = render(<TextMorph words={words} />);
  expect(screen.getByLabelText('Web Developer, Mobile Developer')).toBeInTheDocument();
  expect(container.querySelector('.morph-current')).toHaveTextContent('Web Developer');
  expect(container.querySelectorAll('.morph-sizer')).toHaveLength(2);
  act(() => jest.advanceTimersByTime(2600));
  act(() => jest.advanceTimersByTime(720));
  expect(container.querySelector('.morph-current')).toHaveTextContent('Mobile Developer');
  act(() => jest.advanceTimersByTime(2600));
  act(() => jest.advanceTimersByTime(720));
  expect(container.querySelector('.morph-current')).toHaveTextContent('Web Developer');
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test('keeps text still when reduced motion is requested', () => {
  const original = window.matchMedia;
  window.matchMedia = () => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  try {
    const { container } = render(<TextMorph words={words} />);
    act(() => jest.advanceTimersByTime(10000));
    expect(container.querySelector('.morph-current')).toHaveTextContent('Web Developer');
    expect(jest.getTimerCount()).toBe(0);
  } finally {
    window.matchMedia = original;
  }
});

test('ignores an already queued frame after unmounting during the morph', () => {
  let queuedFrame;
  const request = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    queuedFrame = callback;
    return 42;
  });
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  try {
    const { unmount } = render(<StrictMode><TextMorph words={words} /></StrictMode>);
    act(() => jest.advanceTimersByTime(2600));
    expect(request).toHaveBeenCalledTimes(1);
    unmount();
    expect(cancel).toHaveBeenCalledWith(42);
    expect(() => queuedFrame(performance.now() + 200)).not.toThrow();
    expect(request).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  } finally {
    request.mockRestore();
    cancel.mockRestore();
  }
});

test('ignores stale frames when the words are removed mid-animation', () => {
  let queuedFrame;
  const request = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    queuedFrame = callback;
    return 24;
  });
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  try {
    const { rerender, container } = render(<TextMorph words={words} />);
    act(() => jest.advanceTimersByTime(2600));
    rerender(<TextMorph words={[]} />);
    expect(container).toBeEmptyDOMElement();
    expect(() => queuedFrame(performance.now() + 200)).not.toThrow();
    expect(request).toHaveBeenCalledTimes(1);
  } finally {
    request.mockRestore();
    cancel.mockRestore();
  }
});
