import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Menu, X, MoveUpRight, Sparkles, Asterisk } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from './data/projects.js';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  ['01', 'CREATIVE & DESIGN', 'Graphic design · Content creation · UGC · Video editing · Visual communication'],
  ['02', 'AI & TECHNOLOGY', 'AI-assisted content · Prompt development · AI research & R&D · Workflow optimization'],
  ['03', 'SOCIAL & STRATEGY', 'Social media · Creative strategy · Campaign concepts · Promotional content'],
  ['04', 'HR & PEOPLE', 'HR administration · Recruitment support · Employee coordination · Documentation'],
];

function App() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from('.nav-inner', { y: -24, opacity: 0, duration: 0.8 })
        .from('.hero-kicker, .hero-title-line, .hero-copy, .hero-actions', { y: 35, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.35')
        .from('.hero-stamp', { scale: 0.75, opacity: 0, duration: 0.8 }, '-=0.55');

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.project-card').forEach((el, i) => {
        gsap.fromTo(el, { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.hero-orbit', { rotate: 360, duration: 38, repeat: -1, ease: 'none' });
      }
      gsap.to('.marquee-track', { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.marquee', scrub: 1 } });
      gsap.from('.skill-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.skills-list', start: 'top 80%', once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const previousFocus = document.activeElement;
    const closeButton = document.querySelector('.case-study-close');
    closeButton?.focus();
    const keepFocusInDialog = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = document.querySelector('.case-study-dialog');
      const focusable = dialog?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', keepFocusInDialog);
    document.body.classList.add('dialog-open');
    return () => {
      document.removeEventListener('keydown', keepFocusInDialog);
      document.body.classList.remove('dialog-open');
      previousFocus?.focus?.();
    };
  }, [selectedProject]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <div ref={root}>
      <header className="site-header">
        <nav className="nav-inner wrap">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Ayu Fidyaningrum, home">AF<span>.</span></a>
          <div id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#expertise" onClick={closeMenu}>Expertise</a><a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
          <a className="nav-availability" href="mailto:ayfidy@gmail.com">LET'S TALK <ArrowUpRight size={13}/></a>
          <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-topline"><span className="hero-kicker"><i className="status-dot"/> AYU FIDYANINGRUM · CREATIVE & AI</span><span className="hero-location">BASED IN INDONESIA · WORKING WORLDWIDE</span></div>
          <div className="hero-main">
            <div className="hero-copy-col">
              <h1 className="hero-title"><span className="hero-title-line">Make good</span><span className="hero-title-line italic-line">ideas move</span><span className="hero-title-line">people<span className="period">.</span></span></h1>
              <div className="hero-bottom">
                <p className="hero-copy">I’m Ayu — a multidisciplinary creative working across content, graphic design, social media, AI-assisted workflows and people operations.</p>
                <div className="hero-actions"><a className="button button-dark" href="#work">EXPLORE MY WORK <ArrowDownRight size={16}/></a><a className="text-link" href="#about">MORE ABOUT ME <span>↗</span></a></div>
              </div>
            </div>
            <div className="hero-art" role="img" aria-label="Ayu Fidyaningrum monogram framed by a kinetic orange orbit">
              <div className="hero-art-bg"></div><div className="hero-orbit"><span></span><span></span><span></span></div>
              <div className="hero-monogram">A<span>F</span></div><div className="hero-stamp"><span>THINK</span><b>MAKE</b><span>REPEAT</span></div>
              <div className="art-caption">A STUDY IN<br/>CREATIVE THINKING</div>
            </div>
          </div>
          <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="scroll-line"></span><span>01 / 05</span></div>
        </section>

        <section className="marquee" aria-label="Areas of practice"><div className="marquee-track">CREATIVE STRATEGY <b>✳</b> ART DIRECTION <b>✳</b> AI & TECHNOLOGY <b>✳</b> VISUAL STORYTELLING <b>✳</b> CREATIVE STRATEGY <b>✳</b> ART DIRECTION <b>✳</b></div></section>

        <section className="work-section section-pad wrap" id="work">
          <div className="section-heading reveal"><div><span className="eyebrow">01 — SELECTED WORK</span><h2>Creative work<br/><em>with range.</em></h2></div><p className="section-intro">A selection across design and build, beauty and wellness, AI creative research, and people operations.</p></div>
          <div className="projects-grid">{projects.map((p, index) => <article className="project-card" key={p.id}>
            <button type="button" className="project-visual project-image-button" onClick={() => setSelectedProject(p)} aria-label={`Open case study: ${p.title}`}>
              {p.images?.[0]?.src ? <img className="project-image" src={p.images[0].src} alt={p.images[0].alt || `${p.title} project image`} /> : <span className={`project-placeholder poster-${index % 7}`} aria-hidden="true"><span className="poster-grain"/><span className="poster-shape poster-shape-a"/><span className="poster-shape poster-shape-b"/><b className="poster-wordmark">{p.cover || p.title}</b><span className="poster-caption">{p.category}</span></span>}
              <span className="project-visual-top"><span>{String(index + 1).padStart(2, '0')} / CASE STUDY</span><MoveUpRight size={18}/></span>
              <span className="project-visual-bottom"><span>{p.year || 'YEAR'}</span><span>VIEW CASE STUDY</span></span>
            </button>
            <div className="project-meta"><div><span className="eyebrow">{p.category || 'CATEGORY'}</span><h3>{p.title}</h3><p>{p.description}</p></div><span className="project-tag">{p.role || 'ROLE'}</span></div>
          </article>)}</div>
          <div className="work-note reveal"><span>SELECTED COLLABORATIONS & PRACTICE</span><span>CASE STUDIES IN PROGRESS · DETAILS KEPT QUALITATIVE</span></div>
        </section>

        {selectedProject && <div className="case-study-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
          <section className="case-study-dialog" role="dialog" aria-modal="true" aria-labelledby="case-study-title" aria-describedby="case-study-description" tabIndex="-1">
            <button type="button" className="case-study-close" onClick={() => setSelectedProject(null)} aria-label="Close case study"><X size={20}/></button>
            <span className="eyebrow">{selectedProject.category || 'CATEGORY'} · {selectedProject.year || 'YEAR'}</span>
            <h2 id="case-study-title">{selectedProject.title}</h2>
            <p className="case-study-role">ROLE — {selectedProject.role || 'Add your role'}</p>
            <p id="case-study-description" className="case-study-description">{selectedProject.description}</p>
            {selectedProject.tools?.length > 0 && <div className="case-study-tools"><span className="eyebrow">TOOLS</span><div className="tool-tags">{selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>}
            {selectedProject.images?.length > 0 && <div className="case-study-images">{selectedProject.images.map((image, index) => <img key={`${image.src}-${index}`} src={image.src} alt={image.alt || `${selectedProject.title} image ${index + 1}`} loading="lazy" />)}</div>}
            {selectedProject.link && <a className="underlined-link" href={selectedProject.link} target="_blank" rel="noreferrer">VISIT PROJECT <ArrowUpRight size={15}/></a>}
          </section>
        </div>}

        <section className="about-section section-pad" id="about"><div className="wrap about-grid"><div className="about-aside reveal"><span className="eyebrow">02 — A LITTLE ABOUT ME</span><div className="about-index">A<span>—</span>F</div><span className="aside-note">CREATIVE THINKING.<br/>PRACTICAL FOLLOW-THROUGH.</span></div><div className="about-content reveal"><h2>Curiosity is my<br/>favourite <em>tool.</em></h2><p className="about-lead">I’m Ayu Fidyaningrum, a multidisciplinary creative professional with experience in content creation, graphic design, social media, AI-assisted workflows and HR-related functions.</p><p>My background brings together creative execution, visual communication, technology and organizational skills. I enjoy turning ideas into engaging visual content, developing practical AI workflows and supporting structured business processes.</p><p>Across industries, I adapt to different brand identities, audiences and project needs. I’m interested in the space where creativity, design, technology and people meet.</p><a href="#contact" className="underlined-link">LET'S CREATE SOMETHING GOOD <ArrowUpRight size={15}/></a></div></div></section>

        <section className="expertise-section section-pad wrap" id="expertise"><div className="section-heading reveal"><div><span className="eyebrow">03 — WHAT I BRING</span><h2>Different skills.<br/><em>One perspective.</em></h2></div><p className="section-intro">A multidisciplinary toolkit shaped by hands-on creative work, structured problem-solving and a willingness to learn what's next.</p></div><div className="skills-list">{skills.map(([n,title,desc])=><div className="skill-row" key={n}><span className="skill-no">{n}</span><h3>{title}</h3><p>{desc}</p><Asterisk className="skill-star" size={21}/></div>)}</div><div className="tools-block reveal"><span className="eyebrow">WAYS I CONTRIBUTE</span><div className="tool-tags">{['Graphic design','Content creation','UGC','Video editing','AI-assisted workflows','Prompt development','Social media','Recruitment support','Coordination','Documentation'].map(t=><span key={t}>{t}</span>)}</div></div></section>

        <section className="experience-section section-pad"><div className="wrap experience-grid"><div className="reveal"><span className="eyebrow">04 — HOW I WORK</span><h2>Creative range.<br/><em>Clear purpose.</em></h2></div><div className="experience-list reveal"><div className="experience-item"><span className="experience-date">IDEA → CONTENT</span><div><h3>Creative & Design</h3><p>Developing content, graphic design, UGC and visual communication shaped for each brand and audience.</p></div></div><div className="experience-item"><span className="experience-date">EXPLORE → REFINE</span><div><h3>AI & Technology</h3><p>Researching AI applications, developing prompts and exploring workflows that support creative work.</p></div></div><div className="experience-item"><span className="experience-date">PEOPLE → PROCESS</span><div><h3>HR & People Operations</h3><p>Supporting recruitment, HR administration, employee communication, coordination and documentation.</p></div></div></div></div></section>

        <section className="contact-section section-pad" id="contact"><div className="wrap contact-inner"><span className="eyebrow">05 — YOUR TURN</span><h2>Have a good<br/><em>thing in mind?</em></h2><p>Open to creative projects, collaborations and opportunities across content, design, AI and people operations.</p><a className="contact-email" href="mailto:ayfidy@gmail.com">Let's talk <ArrowUpRight size={26}/></a><div className="contact-bottom"><span>AYFIDY@GMAIL.COM</span><span>INDONESIA · UTC+7</span></div></div></section>
      </main>
      <footer className="footer wrap"><a className="brand" href="#top" aria-label="Back to top">AF<span>.</span></a><span>© {year} AYU FIDYANINGRUM. ALL RIGHTS RESERVED.</span><div><a href="https://www.instagram.com/ayside__/" target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={12}/></a><a href="mailto:ayfidy@gmail.com">EMAIL <ArrowUpRight size={12}/></a></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
