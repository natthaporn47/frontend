import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Hero from './Hero/Hero';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import Skills from './pages/Skills';
import HomeSections from './components/HomeSections';
import ProjectPage from './pages/ProjectPage';
import Contact, { contactEndpoint, contactActivationEndpoint } from './pages/Contact';
import About from './pages/About';

jest.mock('@iconify/react', () => ({ Icon: () => null }));
// CRA's Jest resolver predates Router 7's subpath exports.
jest.mock('react-router-dom', () => jest.requireActual('react-router'));

test('matches the About reference with existing information and generated portraits', () => {
  const { container } = render(<About />);
  expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Natthaporn Wangsuk' })).toBeInTheDocument();
  expect(screen.getByLabelText('ณัฐฐาภรณ์ หวังสุข (เอิร์น)')).toBeInTheDocument();
  expect(screen.getByText('นักศึกษาวิศวกรรมศาสตรบัณฑิต')).toBeInTheDocument();
  expect(screen.getByText('25 ก.ค. 2547')).toBeInTheDocument();
  expect(screen.getByText('22 ปี')).toBeInTheDocument();
  expect(screen.getByText('23 พ.ย. 2569 - 31 มี.ค. 2570')).toBeInTheDocument();
  expect(screen.getByText('2.80')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'My Journey' })).not.toBeInTheDocument();
  expect(container.querySelectorAll('.about-journey li')).toHaveLength(0);
  expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
  expect(screen.getByText('2566 - ปัจจุบัน', { exact: false })).toBeInTheDocument();
  expect(screen.queryByText('กำลังศึกษา')).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'ปริญญาตรี สาขาเทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์ แขนงคอมพิวเตอร์' })).toBeInTheDocument();
  expect(screen.getByText('2560 - 2565')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'มัธยมศึกษาตอนต้น - มัธยมศึกษาตอนปลาย' })).toBeInTheDocument();
  expect(screen.getByText('แผนการเรียนวิทย์–คณิต')).toBeInTheDocument();
  expect(screen.getByText('โรงเรียนวัดธรรมจริยาภิรมย์').tagName).toBe('EM');
  expect(container.querySelectorAll('.about-education-history li')).toHaveLength(2);
  expect(screen.getByLabelText('Portrait of Earn')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'ภาพเอิร์นในชุดสีขาว' })).toHaveAttribute('src', '/images/earn-about-white-clean-v2.png');
  expect(screen.queryByRole('img', { name: 'ภาพเอิร์นในชุดเสื้อฟ้า' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Next portrait' })).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Reserved university photo space')).not.toBeInTheDocument();
  expect(container.querySelector('.about-portrait-column h1')).toBeInTheDocument();
  expect(container.querySelectorAll('.about-education-year')).toHaveLength(2);
  expect(container.querySelectorAll('.about-education-marker')).toHaveLength(2);
  expect(container.querySelector('.about-inner .about-layout')).toBeInTheDocument();
  expect(container.querySelector('.about-inner .about-education')).toBeInTheDocument();
  expect(container.querySelector('.about-circuit-art')).not.toBeInTheDocument();
  expect(container.querySelectorAll('img')).toHaveLength(1);
  expect(container.querySelector('.about-copy blockquote')).not.toBeInTheDocument();
});

test('introduces Earn with her own name and working project and About links', () => {
  render(<MemoryRouter><Hero /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Natthaporn Wangsuk' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View My Projects' })).toHaveAttribute('href', '#home-projects');
  expect(screen.getByRole('link', { name: 'About Me' })).toHaveAttribute('href', '/about');
  expect(screen.getByText('นักศึกษาที่สนใจการพัฒนาเว็บไซต์และแอปพลิเคชัน ชอบเรียนรู้สิ่งใหม่ ๆ และนำความรู้มาลงมือทำจริง')).toBeInTheDocument();
});

test('shows the complete portfolio without the removed filter toolbar', () => {
  render(<MemoryRouter><Projects /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'HungryHub' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'VanVan' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Automatic Spraying Boat System' })).toBeInTheDocument();
  expect(screen.queryByRole('group', { name: 'Filter projects' })).not.toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(3);
});

test('shows numbered project cards with original application previews', () => {
  const { container } = render(<MemoryRouter><Projects /></MemoryRouter>);
  expect(screen.getByText('งาน 1')).toBeInTheDocument();
  expect(screen.getByText('งาน 2')).toBeInTheDocument();
  expect(screen.getByText('งาน 3')).toBeInTheDocument();
  expect(Array.from(container.querySelectorAll('.project-category'), badge => badge.textContent)).toEqual(['2568', '2568', '2569']);
  expect(container.querySelectorAll('.project-cover-mobile img')).toHaveLength(2);
  expect(container.querySelector('.project-cover-desktop img')).toHaveAttribute('src', expect.stringContaining('/vanvan/latest/3.png'));
  expect(screen.getAllByText('View Details')).toHaveLength(3);
});

test('links each project GitHub icon to its own repository in a new tab', () => {
  render(<MemoryRouter><Projects /></MemoryRouter>);
  const repositories = [
    ['HungryHub', 'https://github.com/natthaporn47/mobile_app-first-time'],
    ['VanVan', 'https://github.com/chal-48/software_project-html-version.git'],
    ['Automatic Spraying Boat System', 'https://github.com/natthaporn47/boat-frontend'],
  ];
  repositories.forEach(([title, repository]) => {
    const link = screen.getByRole('link', { name: `${title} on GitHub` });
    expect(link).toHaveAttribute('href', repository);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('uses existing contact information in the hero without an unavailable resume', () => {
  const { container } = render(<MemoryRouter><Hero /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/natthaporn47');
  expect(screen.getByRole('button', { name: 'Email Natthaporn' })).toHaveAttribute('aria-haspopup', 'dialog');
  expect(screen.queryByRole('link', { name: /Resume/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'LINE' })).toHaveAttribute('href', 'https://line.me/ti/p/~earn25477');
  expect(container.querySelector('.hero-editor')).toHaveTextContent('Natthaporn');
  expect(container.querySelectorAll('.hero-topic-labels span')).toHaveLength(4);
  expect(screen.getByLabelText('Web Developer, Mobile Developer')).toBeInTheDocument();
});

test.each(['hungryhub', 'vanvan', 'agricultural-spraying'])('opens the full project page directly from View Details: %s', id => {
  render(<MemoryRouter initialEntries={['/projects']}><Routes><Route path='/projects' element={<Projects />} /><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  const link = screen.getAllByRole('link', { name: /^View .* details$/ }).find(item => item.getAttribute('href') === `/projects/${id}`);
  expect(link).toBeDefined();
  fireEvent.click(link);
  expect(screen.getByRole('link', { name: 'Back to Projects' })).toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
});

test('opens a compact preview from Home and continues to the actual project page', () => {
  render(<MemoryRouter><Routes><Route path='/' element={<HomeSections />} /><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  fireEvent.click(screen.getByRole('link', { name: 'View HungryHub details' }));
  const dialog = screen.getByRole('dialog');
  expect(within(dialog).queryByText('Project Preview')).not.toBeInTheDocument();
  expect(within(dialog).getByText('01')).toBeInTheDocument();
  const more = within(dialog).getByRole('button', { name: 'ดูรายละเอียดเพิ่มเติม' });
  expect(more).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(more);
  expect(more).toHaveAttribute('aria-expanded', 'true');
  expect(within(dialog).getByText('My Contribution')).toBeInTheDocument();
  fireEvent.click(more);
  expect(within(dialog).queryByText('My Contribution')).not.toBeInTheDocument();
  const detailsLink = within(dialog).getByRole('link', { name: 'หน้า Project' });
  expect(detailsLink).toHaveAttribute('href', '/projects/hungryhub');
  fireEvent.click(detailsLink);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
  expect(screen.getByRole('heading', { level: 1, name: 'HungryHub' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View Source Code' })).toHaveAttribute('href', 'https://github.com/natthaporn47/mobile_app-first-time');
  expect(screen.getByRole('region', { name: 'Project screenshots' })).toBeInTheDocument();
});

test('shows all boat screenshots and uses its own number and contribution', () => {
  render(<MemoryRouter><HomeSections /></MemoryRouter>);
  fireEvent.click(screen.getByRole('link', { name: 'View Automatic Spraying Boat System details' }));
  const dialog = screen.getByRole('dialog');
  expect(within(dialog).getByText('03')).toBeInTheDocument();
  expect(within(dialog).getByRole('img', { name: 'Boat Concept Model' })).toBeInTheDocument();
  expect(within(dialog).getByRole('group', { name: 'Choose screenshot' }).querySelectorAll('button')).toHaveLength(4);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Boat Dashboard' }));
  expect(within(dialog).getByRole('img', { name: 'Boat Dashboard' })).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Boat Mission / Map' }));
  expect(within(dialog).getByRole('img', { name: 'Boat Mission / Map' })).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Boat Operation History' }));
  expect(within(dialog).getByRole('img', { name: 'Boat Operation History' })).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', { name: 'ดูรายละเอียดเพิ่มเติม' }));
  expect(within(dialog).getByText(/ออกแบบและพัฒนา Frontend ด้วย React/)).toBeInTheDocument();
  expect(within(dialog).getByRole('link', { name: 'หน้า Project' })).toHaveAttribute('href', '/projects/agricultural-spraying');
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
  fireEvent.click(screen.getByRole('button', { name: 'Tools & Platforms', exact: true }));
  expect(screen.getByRole('link', { name: 'GitHub', exact: true })).toBeInTheDocument();
  expect(container.querySelector('#home-about')).toBeInTheDocument();
  expect(container.querySelector('#home-contact')).toBeInTheDocument();
});

test('reuses the Skills page labels and leaves only the boat image reserved on Home', () => {
  const { container } = render(<MemoryRouter><HomeSections /></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'React', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'VS Code', exact: true })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'IoT & Hardware', exact: true }));
  expect(screen.getByRole('link', { name: 'Arduino uno', exact: true }).querySelector('img')).toHaveAttribute('src', expect.stringContaining('skills-icons8-68008.png'));
  expect(screen.getByRole('link', { name: 'DHT22', exact: true })).toBeInTheDocument();
  expect(container.querySelectorAll('.home-project-item')).toHaveLength(3);
  expect(container.querySelectorAll('.home-project-art img')).toHaveLength(4);
  expect(screen.getByRole('img', { name: 'Automatic Spraying Boat System boat model' })).toHaveAttribute('src', expect.stringContaining('spraying-boat-model-v3.png'));
  expect(container.querySelectorAll('#home-contact img')).toHaveLength(0);
  expect(container.querySelector('#home-journey')).not.toBeInTheDocument();
  expect(screen.getByText('25 กรกฎาคม 2547')).toBeInTheDocument();
});

test('matches the compact Home contact layout without LinkedIn or extra paw sparkle', () => {
  const { container } = render(<MemoryRouter><HomeSections /></MemoryRouter>);
  const contact = container.querySelector('#home-contact');
  expect(within(contact).getByText('earn25477')).toBeInTheDocument();
  expect(within(contact).getByRole('link', { name: 'Earn on LINE' })).toHaveAttribute('href', 'https://line.me/ti/p/~earn25477');
  expect(within(contact).getByRole('link', { name: 'Earn on GitHub' })).toHaveAttribute('href', 'https://github.com/natthaporn47');
  expect(within(contact).queryByRole('link', { name: /LinkedIn/i })).not.toBeInTheDocument();
  expect(contact.querySelectorAll('.home-contact-links > :is(a, button)')).toHaveLength(3);
  expect(contact.querySelectorAll('.home-connect-socials > :is(a, button)')).toHaveLength(3);
  expect(contact.querySelectorAll('img')).toHaveLength(0);
  expect(container.querySelector('.skill-filter-count').textContent).toMatch(/technologies/);
  expect(container.querySelector('.home-footer a')).not.toBeInTheDocument();
  expect(contact.querySelector('.home-thankyou')).not.toBeInTheDocument();
  expect(contact.querySelector('.connect-heart')).not.toBeInTheDocument();
});

test('arranges Home About with one portrait, own facts and known interests', () => {
  const { container } = render(<MemoryRouter><HomeSections /></MemoryRouter>);
  const about = container.querySelector('#home-about');
  expect(about.querySelectorAll('img')).toHaveLength(1);
  expect(about.querySelector('.home-about-number')).not.toBeInTheDocument();
  expect(within(about).queryByText(/กำลังศึกษาปริญญาตรี/)).not.toBeInTheDocument();
  expect(within(about).getByLabelText('ณัฐฐาภรณ์ หวังสุข')).toBeInTheDocument();
  expect(within(about).queryByText(/สวัสดีค่ะ ฉันชื่อ|\(เอิร์น\)/)).not.toBeInTheDocument();
  expect(within(about).getByText('25 กรกฎาคม 2547')).toBeInTheDocument();
  expect(about.querySelectorAll('.scrapbook-about-facts > div')).toHaveLength(3);
  expect(about.querySelector('.home-about-copy .scrapbook-about-facts')).toBeInTheDocument();
  expect(within(about).getByRole('heading', { name: 'Hobbies' })).toBeInTheDocument();
  expect([...about.querySelectorAll('.home-about-interests li h4')].map(item => item.textContent)).toEqual(['ดูหนัง', 'ฟังเพลง', 'เล่นเกม', 'ท่องเที่ยว']);
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

test.each(['hungryhub', 'vanvan', 'agricultural-spraying'])('omits the removed reading tabs on %s and preserves the project summary', projectId => {
  render(<MemoryRouter initialEntries={[`/projects/${projectId}`]}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Overview' })).not.toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Project technologies' })).toBeInTheDocument();
  expect(screen.getByText('บทบาทของฉัน')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View Source Code' })).toBeInTheDocument();
});

test('handles an unknown project route', () => {
  render(<MemoryRouter initialEntries={['/projects/missing']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Project Not Found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back to Projects' })).toHaveAttribute('href', '/projects');
});

test('shows HungryHub real captured screenshots without the removed tabs', () => {
  render(<MemoryRouter initialEntries={['/projects/hungryhub']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'Open Welcome screenshot' })).toHaveAttribute('href', '/images/projects/hungryhub/welcome.png');
  expect(screen.getByRole('button', { name: 'Welcome', exact: true })).toHaveTextContent(/^Onboarding$/);
  expect(screen.getByRole('button', { name: 'Discover Recipes', exact: true })).toHaveTextContent(/^Onboarding$/);
  expect(screen.getByRole('button', { name: 'Find Restaurants', exact: true })).toHaveTextContent(/^Onboarding$/);
  expect(screen.getByRole('button', { name: 'Exclusive Offers', exact: true })).toHaveTextContent(/^Onboarding$/);
  expect(screen.queryByText('หน้าเริ่มต้นของแอปพลิเคชัน')).not.toBeInTheDocument();
  expect(screen.getByText('แนะนำการใช้งาน HungryHub')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Menu Randomizer', exact: true }));
  expect(screen.getByRole('button', { name: 'Menu Randomizer', exact: true })).toHaveTextContent('Menu Randomizer');
  expect(screen.getByText('ฟีเจอร์สำหรับช่วยตัดสินใจเลือกเมนู โดยสุ่มเมนูอาหารสำหรับผู้ใช้งานที่ยังไม่รู้ว่าจะรับประทานอะไร')).toBeInTheDocument();
});

test('puts About Me before Skills and uses actual project previews on Home', () => {
  const { container } = render(<MemoryRouter><HomeSections /></MemoryRouter>);
  expect(Array.from(container.querySelectorAll('section[id]')).map(section => section.id).slice(0, 3)).toEqual(['home-about', 'home-skills', 'home-projects']);
  expect(screen.getByRole('img', { name: 'HungryHub screenshot 1' })).toHaveAttribute('src', '/images/projects/hungryhub/home.png');
  expect(screen.getByRole('img', { name: 'VanVan screenshot 1' })).toHaveAttribute('src', '/images/projects/vanvan/latest/3.png');
});

test('browses actual VanVan screenshots and wraps gallery navigation', () => {
  render(<MemoryRouter initialEntries={['/projects/vanvan']}><Routes><Route path='/projects/:projectId' element={<ProjectPage />} /></Routes></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'Open Sign In screenshot' })).toHaveAttribute('href', '/images/projects/vanvan/latest/1.png');
  expect(screen.getByText('Admin', { selector: '.project-screenshot-group' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
  expect(screen.getByRole('button', { name: 'Create Account' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Search Trips' }));
  expect(screen.getByRole('img', { name: 'Search Trips' })).toBeInTheDocument();
  expect(screen.getByText('User', { selector: '.project-screenshot-group' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  fireEvent.click(screen.getByRole('button', { name: 'Previous screenshot' }));
  expect(screen.getByRole('button', { name: 'Upcoming Trips' })).toHaveAttribute('aria-pressed', 'true');
});

test('opens galleries from Home project rows and restores scrolling', () => {
  render(<MemoryRouter><HomeSections /></MemoryRouter>);
  fireEvent.click(screen.getByRole('link', { name: 'View VanVan details' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'Choose screenshot' }).querySelectorAll('button')).toHaveLength(14);
  fireEvent.click(screen.getByRole('button', { name: 'Upcoming Trips', exact: true }));
  expect(screen.getByRole('link', { name: 'Open Upcoming Trips screenshot' })).toHaveAttribute('href', '/images/projects/vanvan/latest/16.png');
  fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
  expect(screen.getByRole('button', { name: 'Sign In', exact: true })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Close project details' }));
  expect(document.body.style.overflow).toBe('');
  fireEvent.click(screen.getByRole('link', { name: 'View HungryHub details' }));
  expect(screen.getByRole('group', { name: 'Choose screenshot' }).querySelectorAll('button')).toHaveLength(14);
  fireEvent.click(screen.getByRole('button', { name: 'Discover Recipes', exact: true }));
  expect(screen.getByRole('link', { name: 'Open Discover Recipes screenshot' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Menu Randomizer', exact: true }));
  expect(screen.getByRole('link', { name: 'Open Menu Randomizer screenshot' })).toHaveAttribute('href', '/images/projects/hungryhub/menu-game.png');
  fireEvent.click(screen.getByRole('button', { name: 'Next screenshot' }));
  expect(screen.getByRole('button', { name: 'Welcome', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test.each(['Email Natthaporn', 'Email naththaphrnh@gmail.com', 'Email Earn'])('opens the shared contact form from Home: %s', name => {
  const { container } = render(<MemoryRouter><Hero /><HomeSections /></MemoryRouter>);
  expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  const trigger = screen.getByRole('button', { name });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Send a Message' });
  expect(within(dialog).getByLabelText('Name')).toBeRequired();
  expect(within(dialog).getByLabelText('Email')).toHaveAttribute('type', 'email');
  expect(within(dialog).getByLabelText('Message')).toBeRequired();
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close message' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
  expect(trigger).toHaveFocus();
});

test('opens the shared message dialog from the Contact Information email icon', () => {
  render(<Contact />);
  const trigger = screen.getByRole('button', { name: 'Send a message by email' });
  trigger.focus();
  fireEvent.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Send a Message' });
  expect(within(dialog).getByLabelText('Email')).toHaveAttribute('type', 'email');
  expect(screen.getByRole('button', { name: 'Copy email' })).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close message' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});

test('sends a Home email through the same Contact form service', async () => {
  const previousFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  try {
    render(<MemoryRouter><Hero /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Email Natthaporn' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Visitor' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'visitor@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello Earn' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }).closest('form'));
    expect(global.fetch).toHaveBeenCalledWith(contactEndpoint, expect.objectContaining({ method: 'POST' }));
    await screen.findByText('บริการรับข้อความแล้วค่ะ ขอบคุณที่ติดต่อมา');
  } finally { global.fetch = previousFetch; }
});

test.each(['HungryHub', 'VanVan', 'Automatic Spraying Boat System'])('opens an image viewer above the project popup: %s', name => {
  render(<MemoryRouter><HomeSections /></MemoryRouter>);
  fireEvent.click(screen.getByRole('link', { name: `View ${name} details` }));
  const preview = screen.getByRole('dialog');
  const imageLink = within(preview).getByRole('link', { name: /^Open .* screenshot$/ });
  imageLink.focus();
  fireEvent.click(imageLink);
  const viewer = document.querySelector('.project-image-lightbox');
  expect(viewer).toHaveAttribute('open');
  fireEvent(viewer, new Event('close', { bubbles: true }));
  expect(preview).toHaveAttribute('open');
  expect(document.querySelector('.project-image-lightbox')).toBe(viewer);
  expect(within(viewer).getByText(/^1 \/ \d+$/)).toBeInTheDocument();
  fireEvent.click(within(viewer).getByRole('button', { name: 'Next image' }));
  expect(within(viewer).getByText(/^2 \/ \d+$/)).toBeInTheDocument();
  fireEvent.keyDown(viewer, { key: 'ArrowLeft' });
  expect(within(viewer).getByText(/^1 \/ \d+$/)).toBeInTheDocument();
  fireEvent.keyDown(viewer, { key: 'ArrowLeft' });
  const counter = viewer.querySelector('.image-lightbox-caption span').textContent.split(' / ');
  expect(counter[0]).toBe(counter[1]);
  fireEvent.click(within(viewer).getByRole('button', { name: 'Close image viewer' }));
  expect(document.querySelector('.project-image-lightbox')).toBeNull();
  expect(preview).toHaveAttribute('open');
  expect(document.body.style.overflow).toBe('hidden');
  expect(imageLink).toHaveFocus();
  fireEvent.click(within(preview).getByRole('button', { name: 'Close project details' }));
  expect(document.body.style.overflow).toBe('');
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

test('opens a message popup from Follow Me, sends a message and restores focus on close', async () => {
  const previousFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: 'true' }) });
  try {
    render(<Contact />);
    const trigger = screen.getByRole('button', { name: 'Email Earn' });
    trigger.focus();
    fireEvent.click(trigger);
    const popup = screen.getByRole('dialog', { name: 'Send a Message' });
    expect(popup).toHaveAttribute('open');
    expect(document.body.style.overflow).toBe('hidden');
    const form = within(popup);
    fireEvent.change(form.getByLabelText('Name'), { target: { value: 'Earn' } });
    fireEvent.change(form.getByLabelText('Email'), { target: { value: 'hello@example.com' } });
    fireEvent.change(form.getByLabelText('Message'), { target: { value: 'Message from popup' } });
    fireEvent.submit(form.getByRole('button', { name: 'Send Message' }).closest('form'));
    await form.findByText('บริการรับข้อความแล้วค่ะ ขอบคุณที่ติดต่อมา');
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).message).toBe('Message from popup');
    fireEvent.click(form.getByRole('button', { name: 'Close message' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(trigger).toHaveFocus();
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
