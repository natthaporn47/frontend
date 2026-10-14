import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SiteFooter from "./SiteFooter";

jest.mock('react-router-dom', () => jest.requireActual('react-router'));

test.each(['/about', '/skills', '/projects', '/contact', '/projects/hungryhub'])('shows the shared footer on %s', route => {
  render(<MemoryRouter initialEntries={[route]}><SiteFooter /></MemoryRouter>);
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getByLabelText('Natthaporn Wangsuk')).toBeInTheDocument();
});

test('does not duplicate the existing Home footer', () => {
  render(<MemoryRouter initialEntries={['/']}><SiteFooter /></MemoryRouter>);
  expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
});
