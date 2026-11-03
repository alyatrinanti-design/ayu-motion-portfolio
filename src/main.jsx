import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Menu, X, MoveUpRight, Sparkles, Asterisk } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { no: '01', type: 'BRAND STRATEGY · SPATIAL EXPERIENCE', title: 'Mahalu Spa', desc: 'Building a sensory-led brand experience through storytelling, campaign direction and content systems.', tag: 'Brand & Content', tone: 'clay', visual: 'MAHALU', sub: 'A pause, beautifully.' },
  { no: '02', type: 'CREATIVE DIRECTION · DIGITAL CONTENT', title: 'Langit-langit Artisan Studio', desc: 'Repositioning a design and renovation brand into a studio for distinctive commercial spaces.', tag: 'Creative Strategy', tone: 'olive', visual: 'SPACE\nTO FEEL', sub: 'Designing beyond the expected.' },
  { no: '03', type: 'VISUAL COMMUNICATION · CAMPAIGN', title: 'Selected Visual Stories', desc: 'A collection of visual concepts, social campaigns and design explorations across different industries.', tag: 'Visual Design', tone: 'ink', visual: 'IDEAS\nIN FORM', sub: 'From thought to visual language.' },
];

const skills = [
  ['01', 'AI & DATA', 'AI training · Data annotation · Computer vision · Response evaluation · Prompt design'],
  ['02', 'CREATIVE', 'Visual design · Art direction · Brand identity · Presentation design'],
  ['03', 'STRATEGY', 'Content strategy · Social media · Campaign planning · Brand storytelling'],
  ['04', 'MOTION & VIDEO', 'Short-form video · Video editing · Motion-led content · Creative production'],
];

function App() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.to('.hero-orbit', { rotate: 360, duration: 38, repeat: -1, ease: 'none' });
      gsap.to('.marquee-track', { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.marquee', scrub: 1 } });
      gsap.from('.skill-row', { x: -30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '.skills-list', start: 'top 80%', once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <div ref={root}>
      <header className="site-header">
        <nav className="nav-inner wrap">
          <a className="brand" href="#top" onClick={closeMenu}>AF<span>.</span></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#expertise" onClick={closeMenu}>Expertise</a><a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
          <a className="nav-availability" href="mailto:hello@ayufidyaningrum.com">LET'S TALK <ArrowUpRight size={13}/></a>
          <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <div className="hero-topline"><span className="hero-kicker"><i className="status-dot"/> INDEPENDENT CREATIVE PROFESSIONAL</span><span className="hero-location">BASED IN INDONESIA · WORKING WORLDWIDE</span></div>
          <div className="hero-main">
            <div className="hero-copy-col">
              <h1 className="hero-title"><span className="hero-title-line">Ideas into</span><span className="hero-title-line italic-line">meaningful</span><span className="hero-title-line">experiences<span className="period">.</span></span></h1>
              <div className="hero-bottom">
                <p className="hero-copy">I’m Ayu — a creative strategist and AI specialist working across visual communication, digital content and emerging technology.</p>
                <div className="hero-actions"><a className="button button-dark" href="#work">EXPLORE MY WORK <ArrowDownRight size={16}/></a><a className="text-link" href="#about">MORE ABOUT ME <span>↗</span></a></div>
              </div>
            </div>
            <div className="hero-art" aria-label="Abstract editorial graphic">
              <div className="hero-art-bg"></div><div className="hero-orbit"><span></span><span></span><span></span></div>
              <div className="hero-monogram">A<span>F</span></div><div className="hero-stamp"><span>CREATIVE</span><b>THINKER</b><span>× MAKER</span></div>
              <div className="art-caption">A STUDY IN<br/>CREATIVE THINKING</div>
            </div>
          </div>
          <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="scroll-line"></span><span>01 / 05</span></div>
        </section>

        <section className="marquee" aria-label="Areas of practice"><div className="marquee-track">CREATIVE STRATEGY <b>✳</b> ART DIRECTION <b>✳</b> AI & TECHNOLOGY <b>✳</b> VISUAL STORYTELLING <b>✳</b> CREATIVE STRATEGY <b>✳</b> ART DIRECTION <b>✳</b></div></section>

        <section className="work-section section-pad wrap" id="work">
          <div className="section-heading reveal"><div><span className="eyebrow">01 — SELECTED WORK</span><h2>A few things<br/><em>I've brought to life.</em></h2></div><p className="section-intro">A selection of creative work, strategic thinking and visual explorations. Each project begins with a question and grows into an experience.</p></div>
          <div className="projects-grid">{projects.map((p) => <article className="project-card" key={p.no}><a href="#contact" className={`project-visual ${p.tone}`} aria-label={`Discuss a project like ${p.title}`}><div className="project-visual-top"><span>{p.no} / SELECTED PROJECT</span><span><MoveUpRight size={18}/></span></div><div className="project-wordmark">{p.visual.split('\n').map((line,i)=><span key={i}>{line}</span>)}</div><div className="project-visual-bottom"><span>{p.sub}</span><span>AYU F. — PORTFOLIO</span></div></a><div className="project-meta"><div><span className="eyebrow">{p.type}</span><h3>{p.title}</h3><p>{p.desc}</p></div><span className="project-tag">{p.tag}</span></div></article>)}</div>
          <div className="work-note reveal"><span>MORE WORK IN PROGRESS</span><span>GOOD IDEAS ARE NEVER FINISHED.</span></div>
        </section>

        <section className="about-section section-pad" id="about"><div className="wrap about-grid"><div className="about-aside reveal"><span className="eyebrow">02 — A LITTLE ABOUT ME</span><div className="about-index">A<span>—</span>F</div><span className="aside-note">CURIOUS BY NATURE.<br/>CREATIVE BY PRACTICE.</span></div><div className="about-content reveal"><h2>Curiosity is my<br/>favourite <em>tool.</em></h2><p className="about-lead">I work at the intersection of creativity, communication and technology — turning complex ideas into clear, thoughtful and engaging experiences.</p><p>My experience spans content creation, creative strategy, visual design and AI training. I enjoy moving between big-picture thinking and the details that make an idea work: the story, the system, the visual and the final execution.</p><p>Whether I’m shaping a brand narrative, designing a presentation or helping improve AI systems through structured evaluation, I bring the same mindset: stay curious, think critically and make it meaningful.</p><a href="#contact" className="underlined-link">LET'S CREATE SOMETHING GOOD <ArrowUpRight size={15}/></a></div></div></section>

        <section className="expertise-section section-pad wrap" id="expertise"><div className="section-heading reveal"><div><span className="eyebrow">03 — WHAT I BRING</span><h2>Different skills.<br/><em>One perspective.</em></h2></div><p className="section-intro">A multidisciplinary toolkit shaped by hands-on creative work, structured problem-solving and a willingness to learn what's next.</p></div><div className="skills-list">{skills.map(([n,title,desc])=><div className="skill-row" key={n}><span className="skill-no">{n}</span><h3>{title}</h3><p>{desc}</p><Asterisk className="skill-star" size={21}/></div>)}</div><div className="tools-block reveal"><span className="eyebrow">TOOLS & WORKFLOW</span><div className="tool-tags">{['ChatGPT & AI tools','Canva','Adobe / Affinity','CorelDRAW','CapCut','DaVinci Resolve','Final Cut Pro','SketchUp','AutoCAD','Google Workspace','Notion'].map(t=><span key={t}>{t}</span>)}</div></div></section>

        <section className="experience-section section-pad"><div className="wrap experience-grid"><div className="reveal"><span className="eyebrow">04 — THE JOURNEY</span><h2>Built through<br/><em>doing.</em></h2></div><div className="experience-list reveal"><div className="experience-item"><span className="experience-date">2024 — PRESENT</span><div><h3>Creative Strategist & Content Creator</h3><p>Brand communication, creative direction, social media strategy and campaign production across design and lifestyle businesses.</p></div></div><div className="experience-item"><span className="experience-date">AI PROJECTS</span><div><h3>AI Training & Data Annotation</h3><p>Supporting AI development through data labeling, annotation, language tasks and response evaluation, with attention to accuracy and guideline compliance.</p></div></div><div className="experience-item"><span className="experience-date">2019 — ONGOING</span><div><h3>Visual & Digital Creative Practice</h3><p>Developing visual communication, digital content and storytelling skills across multiple formats and platforms.</p></div></div></div></div></section>

        <section className="contact-section section-pad" id="contact"><div className="wrap contact-inner"><span className="eyebrow">05 — YOUR TURN</span><h2>Have a good<br/><em>thing in mind?</em></h2><p>I'm open to remote opportunities, creative collaborations and interesting projects around the world.</p><a className="contact-email" href="mailto:hello@ayufidyaningrum.com">Let's talk <ArrowUpRight size={26}/></a><div className="contact-bottom"><span>AVAILABLE FOR SELECT PROJECTS</span><span>INDONESIA · UTC+7</span></div></div></section>
      </main>
      <footer className="footer wrap"><a className="brand" href="#top">AF<span>.</span></a><span>© {year} AYU FIDYANINGRUM. ALL RIGHTS RESERVED.</span><div><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={12}/></a><a href="mailto:hello@ayufidyaningrum.com">EMAIL <ArrowUpRight size={12}/></a></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
