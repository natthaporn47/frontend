import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PageEffects from './PageEffects';
import About from '../pages/About';
import Skills from '../pages/Skills';

jest.mock('@iconify/react', () => ({ Icon: () => null }));
jest.mock('react-router-dom', () => jest.requireActual('react-router'));

const originalObserver = window.IntersectionObserver;
const originalMatchMedia = window.matchMedia;
let observers;

beforeEach(() => {
  observers = [];
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  window.IntersectionObserver = jest.fn(function (callback) {
    this.callback = callback;
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
    observers.push(this);
  });
});

afterEach(() => {
  window.IntersectionObserver = originalObserver;
  window.matchMedia = originalMatchMedia;
  jest.restoreAllMocks();
});

const page = content => <MemoryRouter><PageEffects>{content}</PageEffects></MemoryRouter>;

test('reveals the shared footer when it enters the viewport', () => {
  render(page(<footer className="site-footer" data-reveal-delay="120"><span>Footer name</span></footer>));
  const footer = screen.getByRole('contentinfo');
  expect(footer).toHaveClass('scroll-reveal');
  expect(footer).not.toHaveClass('is-revealed');
  expect(footer.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  observers[0].callback([{ target: footer, isIntersecting: true }]);
  expect(footer).toHaveClass('is-revealed');
  expect(observers[0].unobserve).toHaveBeenCalledWith(footer);
});

test('registers Home sections with staggered delays without animating modal content', () => {
  const { container } = render(page(<main className="home-reference">
    <div className="hero-text" data-reveal-delay="0">Introduction</div>
    <div className="hero-scene" data-reveal-delay="120">Portrait</div>
    <article className="home-project-item home-reveal" data-reveal-delay="240">Project</article>
    <dialog open><div className="home-reveal">Modal content</div></dialog>
  </main>));
  const items = [...container.querySelectorAll('.scroll-reveal')];
  expect(items.map(item => item.style.getPropertyValue('--reveal-delay'))).toEqual(['0ms', '120ms', '240ms']);
  items.forEach(target => observers[0].callback([{ target, isIntersecting: true }]));
  items.forEach(item => expect(item).toHaveClass('is-revealed'));
  expect(screen.getByText('Modal content')).not.toHaveClass('scroll-reveal');
});

test('reveals project detail copy and preview individually, keeping facts together', () => {
  const { container } = render(page(<main className="project-showcase">
    <header className="project-showcase-heading">
      <div className="project-showcase-copy"><div data-reveal-delay="120">Category</div><h1 data-reveal-delay="240">HungryHub</h1><p data-reveal-delay="340">Description</p></div>
      <div className="project-showcase-art" data-reveal-delay="200">Preview</div>
    </header>
    <dl className="project-showcase-facts home-reveal" data-reveal-delay="440"><div>Year</div><div>Role</div></dl>
  </main>));
  expect(container.querySelector('.project-showcase-heading')).not.toHaveClass('scroll-reveal');
  expect(screen.getByRole('heading', { name: 'HungryHub' }).style.getPropertyValue('--reveal-delay')).toBe('240ms');
  expect(screen.getByText('Preview')).toHaveClass('scroll-reveal');
  expect(screen.getByText('Description')).toHaveClass('scroll-reveal');
  const facts = container.querySelector('.project-showcase-facts');
  expect(facts).toHaveClass('scroll-reveal');
  expect(facts.querySelectorAll('.scroll-reveal')).toHaveLength(0);
});

test('reveals Contact Information and Follow Me as one group', () => {
  const { container } = render(page(<main className="contact-reference">
    <header className="contact-heading">Contact</header>
    <div className="contact-left-column">
      <section className="contact-information">Contact Information</section>
      <section className="contact-follow">Follow Me</section>
    </div>
  </main>));
  const group = container.querySelector('.contact-left-column');
  expect(group).toHaveClass('scroll-reveal');
  expect(group.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  expect(group.querySelectorAll('.scroll-reveal')).toHaveLength(0);
  observers[0].callback([{ target: group, isIntersecting: true }]);
  expect(group).toHaveClass('is-revealed');
});

test('reveals technical Skills together, then Soft Skills, and filters through the Frontend artwork', async () => {
  const { container } = render(page(<Skills />));
  const layout = container.querySelector('.skill-groups');
  expect(layout).toHaveClass('scroll-reveal');
  expect(layout.style.getPropertyValue('--reveal-delay')).toBe('240ms');
  expect(layout.querySelectorAll('.scroll-reveal')).toHaveLength(0);
  const softSkills = container.querySelector('.skills-approach');
  expect(softSkills).toHaveClass('scroll-reveal');
  expect(softSkills.style.getPropertyValue('--reveal-delay')).toBe('600ms');
  expect(softSkills.querySelectorAll('.scroll-reveal')).toHaveLength(0);
  expect(screen.getByRole('heading', { name: 'IoT & Hardware' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Currently Learning' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Soft Skills' })).toBeInTheDocument();
  observers[0].callback([{ target: layout, isIntersecting: true }]);
  expect(layout).toHaveClass('is-revealed');
  expect(softSkills).not.toHaveClass('is-revealed');
  fireEvent.click(screen.getByRole('button', { name: 'Show Frontend skills' }));
  expect(screen.getByRole('button', { name: 'Frontend', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelectorAll('.skill-group')).toHaveLength(1);
  const filtered = container.querySelector('.skill-groups');
  await waitFor(() => expect(filtered).toHaveClass('scroll-reveal'));
  fireEvent.click(screen.getByRole('button', { name: 'All', exact: true }));
  await waitFor(() => expect(container.querySelector('.skill-groups')).toHaveClass('scroll-reveal'));
  expect(container.querySelectorAll('.skill-group')).toHaveLength(5);
});

test.each(['skills-reference', 'projects-reference', 'contact-reference'])('staggers spring reveals on %s', className => {
  const { container } = render(page(<main className={className}>
    <header className="home-reveal">Heading</header>
    <section className="home-reveal">First section</section>
    <section className="home-reveal">Second section</section>
  </main>));
  const items = [...container.querySelectorAll('.scroll-reveal')];
  expect(items.map(item => item.style.getPropertyValue('--reveal-delay'))).toEqual(['0ms', '120ms', '240ms']);
  items.forEach(target => observers[0].callback([{ target, isIntersecting: true }]));
  items.forEach(item => expect(item).toHaveClass('is-revealed'));
});

test('reveals content on intersection and registers new filtered content', async () => {
  const view = render(page(<article className="project-card">First project</article>));
  const first = screen.getByText('First project');
  expect(first).toHaveClass('scroll-reveal');
  expect(first).not.toHaveClass('is-revealed');
  observers[0].callback([{ target: first, isIntersecting: true }]);
  expect(first).toHaveClass('is-revealed');
  expect(observers[0].unobserve).toHaveBeenCalledWith(first);
  view.rerender(page(<><article className="project-card">First project</article><article className="project-card">New project</article></>));
  const added = screen.getByText('New project');
  await waitFor(() => expect(observers[0].observe).toHaveBeenCalledWith(added));
  expect(added).toHaveClass('scroll-reveal');
});

test('reveals keyboard-focused content without hiding modal contents', () => {
  render(page(<><article className="project-card"><button>Open project</button></article><dialog open><article className="project-card">Modal content</article></dialog></>));
  fireEvent.focus(screen.getByRole('button', { name: 'Open project' }));
  expect(screen.getByRole('button', { name: 'Open project' }).closest('article')).toHaveClass('is-revealed');
  expect(screen.getByText('Modal content')).not.toHaveClass('scroll-reveal');
});

test('keeps content visible when reduced motion is enabled', () => {
  window.matchMedia = () => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  render(page(<article className="project-card">Visible project</article>));
  expect(screen.getByText('Visible project')).not.toHaveClass('scroll-reveal');
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
});

test('keeps content visible without IntersectionObserver', () => {
  delete window.IntersectionObserver;
  render(page(<article className="project-card">Visible fallback</article>));
  expect(screen.getByText('Visible fallback')).not.toHaveClass('scroll-reveal');
});

test('reveals About items individually with explicit sequential delays', () => {
  const { container } = render(page(<About />));
  expect(container.querySelector('.about-copy')).not.toHaveClass('scroll-reveal');
  const title = screen.getByRole('heading', { name: 'About Me' });
  const name = screen.getByRole('heading', { name: 'Natthaporn Wangsuk' });
  expect(title.style.getPropertyValue('--reveal-delay')).toBe('0ms');
  expect(name.style.getPropertyValue('--reveal-delay')).toBe('240ms');
  const facts = [...container.querySelectorAll('.about-facts > div')];
  expect(facts).toHaveLength(5);
  facts.forEach((fact, index) => {
    expect(fact).toHaveClass('scroll-reveal');
    expect(fact.style.getPropertyValue('--reveal-delay')).toBe(`${540 + index * 100}ms`);
  });
  const education = container.querySelector('.about-education');
  expect(education).toHaveClass('scroll-reveal');
  expect(container.querySelector('.about-education-history li')).not.toHaveClass('scroll-reveal');
  expect(screen.getByRole('heading', { name: 'Education' })).not.toHaveClass('scroll-reveal');
  expect(education).not.toHaveClass('is-revealed');
  observers[0].callback([{ target: name, isIntersecting: true }]);
  expect(name).toHaveClass('is-revealed');
  expect(education).not.toHaveClass('is-revealed');
});
