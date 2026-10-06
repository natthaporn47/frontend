import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from './Hero/Hero';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import Skills from './pages/Skills';
import HomeSections from './components/HomeSections';

jest.mock('@iconify/react', () => ({ Icon: () => null }));
// CRA's Jest resolver predates Router 7's subpath exports.
jest.mock('react-router-dom', () => jest.requireActual('react-router'));

test('switches the workspace focus when an interest is selected', () => {
  render(<MemoryRouter><Hero /></MemoryRouter>);
  const iot = screen.getByRole('button', { name: 'IoT' });
  fireEvent.click(iot);
  expect(iot).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'Frontend' })).toHaveAttribute('aria-pressed', 'false');
  expect(screen.getByText('ESP32, Arduino, MQTT')).toBeInTheDocument();
});

test('filters projects and restores the complete portfolio', () => {
  render(<MemoryRouter><Projects /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Mobile' }));
  expect(screen.getByRole('heading', { name: 'HungryHub' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Automatic Spraying Boat System' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 / 3 projects');
  fireEvent.click(screen.getByRole('button', { name: 'IoT' }));
  expect(screen.getByRole('heading', { name: 'Automatic Spraying Boat System' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Web' }));
  expect(screen.getByRole('status')).toHaveTextContent('2 / 3 projects');
  fireEvent.click(screen.getByRole('button', { name: 'All' }));
  expect(screen.getAllByRole('article')).toHaveLength(3);
});

test('runs the selected profile and closes the preview', () => {
  render(<MemoryRouter><Hero /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'IoT' }));
  fireEvent.click(screen.getByRole('button', { name: 'Run profile' }));
  expect(screen.getByRole('status')).toHaveTextContent('IoT & Embedded Systems');
  expect(screen.getByRole('status')).toHaveTextContent('ESP32, Arduino, MQTT');
  fireEvent.click(screen.getByRole('button', { name: 'Close profile preview' }));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

test('opens real project details and restores scrolling on close', () => {
  render(<MemoryRouter><Projects /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'View HungryHub details' }));
  expect(screen.getByRole('dialog')).toHaveTextContent('เชื่อมต่อข้อมูลผ่าน REST API');
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.click(screen.getByRole('button', { name: 'Close project details' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
});

test('selects a technology and shows only related projects', () => {
  render(<MemoryRouter><Skills /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Flutter' }));
  expect(screen.getByRole('heading', { name: 'Flutter' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /HungryHub/ })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Automatic Spraying/ })).not.toBeInTheDocument();
});

test('filters home skills and opens project details without leaving home', () => {
  render(<MemoryRouter><HomeSections /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Mobile' }));
  expect(screen.getByRole('status')).toHaveTextContent('2 technologies / Mobile');
  expect(screen.getByRole('link', { name: 'Flutter' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'React.js' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /HungryHub/ }));
  expect(screen.getByRole('dialog')).toHaveTextContent('HungryHub');
  fireEvent.click(screen.getByRole('button', { name: 'Close project details' }));
  expect(document.body.style.overflow).toBe('');
});

test('opens the technology selected on the home page', () => {
  render(<MemoryRouter initialEntries={[{ pathname: '/skills', state: { skillLabel: 'Flutter' } }]}><Skills /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Flutter' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /HungryHub/ })).toBeInTheDocument();
});

test('opens the tool selected on the home page', () => {
  render(<MemoryRouter initialEntries={[{ pathname: '/skills', state: { skillLabel: 'GitHub' } }]}><Skills /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'GitHub' })).toBeInTheDocument();
});

test('closes the mobile menu after navigation and with Escape', () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('link', { name: 'Projects' }));
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  fireEvent.keyDown(screen.getByRole('navigation'), { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});
