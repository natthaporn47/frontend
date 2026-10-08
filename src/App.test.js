import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Hero from './Hero/Hero';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import Skills from './pages/Skills';
import HomeSections from './components/HomeSections';
import ProjectPage from './pages/ProjectPage';
import Contact, { contactEndpoint, contactActivationEndpoint } from './pages/Contact';

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

test('selects a technology without showing the removed detail strip', () => {
  const { container } = render(<MemoryRouter><Skills /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Flutter' }));
  expect(screen.getByRole('button', { name: 'Flutter' })).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelector('.skill-spotlight')).not.toBeInTheDocument();
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
  expect(screen.getByRole('button', { name: 'Flutter' })).toHaveAttribute('aria-pressed', 'true');
});

test('places home About Me first and maps the reordered filters to the right groups', () => {
  const { container } = render(<MemoryRouter><HomeSections /></MemoryRouter>);
  expect(container.querySelector('section')).toHaveAttribute('id', 'home-about');
  expect(screen.getByRole('link', { name: 'Firebase', exact: true })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Backend', exact: true }));
  expect(screen.getByRole('link', { name: 'Node.js', exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Flutter', exact: true })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Tools', exact: true }));
  expect(screen.getByRole('link', { name: 'GitHub', exact: true })).toBeInTheDocument();
  expect(container.querySelector('#home-about')).toBeInTheDocument();
  expect(container.querySelector('#home-contact')).toBeInTheDocument();
});

test('opens the tool selected on the home page', () => {
  render(<MemoryRouter initialEntries={[{ pathname: '/skills', state: { skillLabel: 'GitHub' } }]}><Skills /></MemoryRouter>);
  expect(screen.getByRole('button', { name: 'GitHub' })).toHaveAttribute('aria-pressed', 'true');
});

test('filters the reordered skills groups correctly', () => {
  const { container } = render(<MemoryRouter><Skills /></MemoryRouter>);
  const allLayout = container.querySelector('.skills-layout');
  fireEvent.click(screen.getByRole('button', { name: 'Mobile', exact: true }));
  expect(container.querySelector('.skills-layout')).not.toBe(allLayout);
  expect(screen.getByRole('button', { name: 'Flutter' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'HTML' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Backend', exact: true }));
  expect(screen.getByRole('button', { name: 'Node.js' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Flutter' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Tools & Platforms', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'GitHub', exact: true }));
  expect(screen.getByRole('button', { name: 'GitHub' })).toHaveAttribute('aria-pressed', 'true');
});

test('shows the reference Skills layout using existing technologies without ratings', () => {
  const { container } = render(<MemoryRouter><Skills /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Skills & Technologies' })).toBeInTheDocument();
  expect(container.querySelector('h1 br')).not.toBeInTheDocument();
  expect(container.querySelectorAll('.skill-group')).toHaveLength(5);
  expect(screen.getByRole('button', { name: 'ESP32', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Supabase', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Currently Learning' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Soft Skills' })).toBeInTheDocument();
  expect(container.querySelectorAll('.skills-approach-items article')).toHaveLength(5);
  expect(container.querySelector('.skills-approach').textContent).toMatch(/[\u0e00-\u0e7f]/);
  expect(container.querySelectorAll('.skills-approach-items p')).toHaveLength(5);
  expect(container.textContent).not.toMatch(/\d+%/);
  fireEvent.click(screen.getByRole('button', { name: 'IoT & Hardware', exact: true }));
  expect(container.querySelectorAll('.skill-group')).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'DHT22', exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'HTML', exact: true })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'All', exact: true }));
  expect(container.querySelectorAll('.skill-group')).toHaveLength(5);
});

test('restores the original tools without a database group or technology counts', () => {
  const { container } = render(<MemoryRouter><Skills /></MemoryRouter>);
  expect(Array.from(container.querySelectorAll('.skill-area-tools .skill-pick')).map(button => button.textContent)).toEqual(['VS Code', 'GitHub', 'Git', 'Firebase', 'Supabase', 'Arduino IDE', 'Linux', 'Azure']);
  expect(container.querySelector('.skill-area-database')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Database', exact: true })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'React', exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'React.js', exact: true })).not.toBeInTheDocument();
  expect(container.querySelectorAll('.skill-group-summary small')).toHaveLength(0);
  fireEvent.click(screen.getByRole('button', { name: 'Tools & Platforms', exact: true }));
  expect(container.querySelectorAll('.skill-group')).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'Arduino IDE', exact: true })).toBeInTheDocument();
});

test('maps the React label from Home to its renamed Skills tile', () => {
  render(<MemoryRouter initialEntries={[{ pathname: '/skills', state: { skillLabel: 'React.js' } }]}><Skills /></MemoryRouter>);
  expect(screen.getByRole('button', { name: 'React', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('removes the Skills portrait and owner line and gives Arduino uno the board icon', () => {
  const { container } = render(<MemoryRouter><Skills /></MemoryRouter>);
  expect(container.querySelector('.skills-hero img')).not.toBeInTheDocument();
  expect(container.querySelector('.skills-art-note')).not.toBeInTheDocument();
  expect(screen.queryByText('Nattaporn Wangsuk / Earn')).not.toBeInTheDocument();
  expect(container.querySelector('.skills-heading blockquote')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Arduino uno', exact: true }).querySelector('img')).toHaveAttribute('src', '/images/skills-icons8-68008.png');
  expect(screen.getByRole('button', { name: 'Raspberry Pi', exact: true }).querySelector('img')).not.toBeInTheDocument();
});

test.each(['/', '/about', '/skills', '/projects', '/projects/hungryhub', '/contact'])('uses shared capsule navigation on %s without extra buttons', (path) => {
  const { container } = render(<MemoryRouter initialEntries={[path]}><Navbar /></MemoryRouter>);
  expect(screen.getByRole('navigation')).toHaveClass('navbar-capsule');
  expect(container.querySelector('.nav-monogram')).toHaveTextContent('NW');
  expect(screen.queryByRole('link', { name: /Let's Connect|Contact Earn/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('href', '/contact');
  expect(screen.queryByRole('link', { name: /Resume/ })).not.toBeInTheDocument();
});

test('shows project tabs and supports keyboard navigation', () => {
  render(<MemoryRouter initialEntries={['/projects/hungryhub']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  fireEvent.click(screen.getByRole('tab', { name: 'Tech Stack' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Flutter');
  expect(screen.getByRole('tab', { name: 'Tech Stack' })).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Tech Stack' }), { key: 'Home' });
  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('My Contribution');
});

test('handles an unknown project route', () => {
  render(<MemoryRouter initialEntries={['/projects/missing']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back to Projects' })).toHaveAttribute('href', '/projects');
});

test('shows the HungryHub flow and real captured screenshots', () => {
  render(<MemoryRouter initialEntries={['/projects/hungryhub']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  fireEvent.click(screen.getByRole('tab', { name: 'App Flow' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('What Should I Eat?');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('สุ่มเมนูวันนี้');
  fireEvent.click(screen.getByRole('tab', { name: 'Screenshots' }));
  expect(screen.getByRole('link', { name: 'Open Welcome screenshot' })).toHaveAttribute('href', '/images/projects/hungryhub/welcome.png');
});

test('puts About Me before Skills and uses actual project previews on Home', () => {
  const { container } = render(<MemoryRouter><HomeSections /></MemoryRouter>);
  expect(Array.from(container.querySelectorAll('section[id]')).map(section => section.id).slice(0, 3)).toEqual(['home-about', 'home-skills', 'home-projects']);
  expect(screen.getByRole('img', { name: 'HungryHub screenshot 1' })).toHaveAttribute('src', '/images/projects/hungryhub/welcome.png');
  expect(screen.getByRole('img', { name: 'VanVan screenshot 1' })).toHaveAttribute('src', '/images/projects/vanvan/26.png');
});

test('browses actual VanVan screenshots and wraps gallery navigation', () => {
  render(<MemoryRouter initialEntries={['/projects/vanvan']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  fireEvent.click(screen.getByRole('tab', { name: 'Screenshots' }));
  expect(screen.getByRole('link', { name: 'Open Sign In screenshot' })).toHaveAttribute('href', '/images/projects/vanvan/sign-in.png');
  fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
  expect(screen.getByRole('button', { name: 'Create Account' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Search Trips' }));
  expect(screen.getByRole('img', { name: 'Search Trips' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  fireEvent.click(screen.getByRole('button', { name: 'Previous screenshot' }));
  expect(screen.getByRole('button', { name: 'Pending Payment Warning' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Screenshots' }), { key: 'Home' });
  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
});

test('opens any Home project thumbnail in its gallery and restores scrolling', () => {
  render(<MemoryRouter><HomeSections /></MemoryRouter>);
  expect(screen.getByRole('group', { name: 'HungryHub screenshots' }).querySelectorAll('button')).toHaveLength(14);
  expect(screen.getByRole('group', { name: 'VanVan screenshots' }).querySelectorAll('button')).toHaveLength(14);
  fireEvent.click(screen.getByRole('button', { name: 'View VanVan Pending Payment Warning' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Open Pending Payment Warning screenshot' })).toHaveAttribute('href', '/images/projects/vanvan/40.png');
  fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
  expect(screen.getByRole('button', { name: 'Sign In', exact: true })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Close project details' }));
  expect(document.body.style.overflow).toBe('');
  fireEvent.click(screen.getByRole('button', { name: 'View HungryHub Discover Recipes' }));
  expect(screen.getByRole('link', { name: 'Open Discover Recipes screenshot' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Menu Randomizer', exact: true }));
  expect(screen.getByRole('link', { name: 'Open Menu Randomizer screenshot' })).toHaveAttribute('href', '/images/projects/hungryhub/menu-game.png');
  fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
  expect(screen.getByRole('button', { name: 'Welcome', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('validates contact fields and preserves the requested layout', () => {
  render(<Contact />);
  expect(screen.getByLabelText('Name')).toBeRequired();
  expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  expect(screen.getByLabelText('Message')).toBeRequired();
  expect(screen.getByLabelText('Subject')).toHaveAttribute('maxLength', '140');
  expect(screen.getByRole('heading', { name: 'Contact Information' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Follow Me' })).toBeInTheDocument();
  expect(screen.getByText('Bangkok, Thailand')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /GitHub github.com\/natthaporn47/ })).toHaveAttribute('href', 'https://github.com/natthaporn47');
  expect(screen.getByRole('heading', { name: 'Follow Me' }).closest('section')).not.toHaveClass('contact-notebook');
  expect(screen.queryByLabelText('A note from Earn')).not.toBeInTheDocument();
  expect(screen.queryByText(/I'm always open to new opportunities/)).not.toBeInTheDocument();
  expect(screen.queryByText('ติดตามผลงานและพูดคุยกันได้ค่ะ')).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Call Earn' })).not.toBeInTheDocument();
});

test.each([true, false])('sends contact messages directly and handles success=%s', async success => {
  const previousFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: success, json: async () => ({ success: String(success) }) });
  try {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Earn & Team' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'hello@example.com' } });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Project & Team' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello\nA new idea?' } });
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form');
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
    expect(global.fetch).toHaveBeenCalledWith(contactEndpoint, expect.objectContaining({ method: 'POST' }));
    const payload = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(payload).toMatchObject({ name: 'Earn & Team', email: 'hello@example.com', message: 'Hello\nA new idea?', _subject: 'Project & Team' });
    await screen.findByText(success ? 'บริการรับข้อความแล้วค่ะ ขอบคุณที่ติดต่อมา' : 'ส่งข้อความไม่สำเร็จ กรุณาลองอีกครั้ง หรือใช้อีเมลติดต่อโดยตรงค่ะ');
    expect(screen.getByLabelText('Message')).toHaveValue(success ? '' : 'Hello\nA new idea?');
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  } finally { global.fetch = previousFetch; }
});

test('explains missing email activation without discarding the message', async () => {
  const previousFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: 'false', message: 'Please activate your form by confirming your email.' }) });
  try {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Earn' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'hello@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'My project details' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }).closest('form'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Activate Form');
    const activation = screen.getByRole('button', { name: 'ขออีเมลยืนยัน' });
    expect(activation).toHaveAttribute('formtarget', '_blank');
    expect(activation.closest('form')).toHaveAttribute('action', contactActivationEndpoint);
    expect(activation.closest('form')).toHaveAttribute('method', 'POST');
    expect(screen.getByLabelText('Message')).toHaveValue('My project details');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body)._url).toBe(window.location.href);
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  } finally { global.fetch = previousFetch; }
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
