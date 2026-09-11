'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, BrainCircuit, ChevronRight, Command, Copy, ExternalLink, Mail, Menu, Moon, Search, Sparkles, Sun, X, Zap } from 'lucide-react';
import data from '../src/data/portfolio.json';
import SkillSphere from '../src/components/SkillSphere';

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  featured: boolean;
  order: number;
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  imageAlt?: string;
  metrics?: string[];
  date?: string;
};

const projectsData = data.projects as Project[];

function GithubIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .7Z" /></svg>;
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM2.75 9.75h4.5V21h-4.5V9.75ZM10 9.75h4.31v1.54h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V21h-4.49v-4.57c0-1.09-.02-2.5-1.52-2.5-1.52 0-1.75 1.19-1.75 2.42V21H10V9.75Z" /></svg>;
}


function Neural() {
  return <div className="neural" aria-hidden="true">{Array.from({ length: 22 }).map((_, i) => <span key={i} className={`node n${i}`} />)}</div>;
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="section"><div className="section-head"><span>{kicker}</span><h2>{title}</h2></div>{children}</section>;
}

export default function Home() {
  const [dark, setDark] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('theme') !== 'light' : true);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [cmd, setCmd] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const hero = data.hero;
  const contact = data.contact;

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmd(true); } if (e.key === 'Escape') { setCmd(false); setSelected(null); } };
    addEventListener('keydown', fn); return () => removeEventListener('keydown', fn);
  }, []);

  const cats = useMemo(() => ['All', ...Array.from(new Set(projectsData.map(p => p.category)))], []);
  const projects = useMemo(() => projectsData.filter(p => (cat === 'All' || p.category === cat) && `${p.title} ${p.description} ${p.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.order - b.order), [cat, query]);
  const featured = projectsData.filter(p => p.featured).sort((a, b) => a.order - b.order);
  const copy = () => { navigator.clipboard?.writeText(data.personal.email); setCopied(true); setTimeout(() => setCopied(false), 1600); };
  const go = (id: string) => { setCmd(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false); };

  return <main>
    <nav className="nav">
      <button className="brand" onClick={() => go('home')}><span>SR</span><b>{data.personal.name.split(' ')[0]}</b></button>
      <div className={`navlinks ${menu ? 'open' : ''}`}>{data.navigation.map(n => <button key={n} onClick={() => go(n.toLowerCase())}>{n}</button>)}{data.personal.linkedin && <a href={data.personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}</div>
      <div className="navtools"><button aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button><button aria-label="Command palette" onClick={() => setCmd(true)}><Command size={17} /></button><button className="menubtn" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
    </nav>

    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse" /> {hero.eyebrow} <span className="dot">·</span> {hero.location}</div>
        <h1>{hero.headlineBefore}<em>{hero.headlineAccent}</em>{hero.headlineAfter}</h1>
        <p>{data.personal.summary}</p>
        <div className="actions"><button className="primary" onClick={() => go('projects')}>View projects <ArrowUpRight size={17} /></button><button className="ghost" onClick={() => go('experience')}>Explore experience <ChevronRight size={17} /></button></div>
        <div className="quick">{hero.quickSkills.map((skill: string) => <span key={skill}>{skill}</span>)}</div>
      </div>
      <div className="hero-visual">
        <div className="hero-3d">
          <div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-ring ring-three" />
          <div className="orb"><div className="orb-core"><BrainCircuit size={54} /></div><div className="orbit o1" /><div className="orbit o2" /><Neural /></div>
          <div className="hero-chip chip-a">{hero.chips[0]}</div><div className="hero-chip chip-b">{hero.chips[1]}</div><div className="hero-chip chip-c">{hero.chips[2]}</div>
        </div>
        <div className="pipeline">{hero.pipeline.map((step: string, i: number) => <span key={step}>{step}{i < hero.pipeline.length - 1 && <i />}</span>)}</div>
      </div>
      <button className="scroll" onClick={() => go('about')}>Scroll to explore <ArrowDown size={15} /></button>
    </section>

    <Section id="about" kicker={data.about.eyebrow} title={data.about.title}><div className="about-grid"><div className="about-lead">{(data.about.image || data.personal.image || hero.image) && <div className="about-image" style={{ backgroundImage: `url(${data.about.image || data.personal.image || hero.image})` }} role="img" aria-label={data.about.imageAlt || hero.imageAlt || data.personal.name} />}<p>{data.about.summary}</p><div className="signal"><Sparkles size={17} /><span>{data.about.signal}</span></div></div><div className="focus-grid">{data.about.focus.map((f, i) => <motion.div whileHover={{ y: -5 }} key={f} className="focus"><small>0{i + 1}</small><b>{f}</b></motion.div>)}</div></div></Section>

    <Section id="skills" kicker="02 / SKILLS" title="An ecosystem, not a checklist."><SkillSphere skills={data.skills} /></Section>

    <Section id="experience" kicker="03 / EXPERIENCE" title="A path across engineering and AI."><div className="timeline">{data.experience.map((e, i) => <motion.article initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="timeline-item" key={`${e.company}-${e.role}`}><div className="timeline-dot">{String(i + 1).padStart(2, '0')}</div><div className="timeline-main"><div className="timeline-top"><span>{e.dates}</span><span>{e.location}</span></div><h3>{e.role}</h3><h4>{e.url ? <a href={e.url} target="_blank" rel="noreferrer">{e.company}</a> : e.company}</h4>{e.image && <div className="company-image" style={{ backgroundImage: `url(${e.image})` }} role="img" aria-label={e.imageAlt} />}<ul>{e.details.map(d => <li key={d}>{d}</li>)}</ul></div></motion.article>)}</div></Section>

    <Section id="projects" kicker="04 / PROJECT LAB" title="Systems I’ve been building."><div className="project-controls"><div className="search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, tools, domains…" /></div><div className="filters">{cats.map(c => <button className={cat === c ? 'active' : ''} onClick={() => setCat(c)} key={c}>{c}</button>)}</div></div><div className="featured-grid">{featured.map((p, i) => <motion.article layout whileHover={{ y: -6 }} key={p.id} className={`project-feature f${i}`} onClick={() => setSelected(p)}><div className="project-art" style={p.image ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.82)), url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}><div className="art-grid" /><div className="art-label">{p.category}</div><div className="art-title">{p.title}</div><div className="art-flow">{p.technologies.slice(0, 4).map((t, j) => <span key={t} style={{ transform: `translate(${j * 18}px,${j % 2 ? 10 : -8}px)` }}>{t}</span>)}</div></div><div className="project-meta"><div><small>FEATURED PROJECT</small><h3>{p.title}</h3><p>{p.description}</p></div><ArrowUpRight /></div></motion.article>)}</div><div className="project-list">{projects.map(p => <motion.article layout key={p.id} className="project-row" onClick={() => setSelected(p)}><div><span className="tag">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p></div><div className="techline">{p.technologies.slice(0, 5).map(t => <span key={t}>{t}</span>)}</div><ArrowUpRight /></motion.article>)}</div></Section>

    <Section id="architecture" kicker="05 / SYSTEM THINKING" title="How the pieces connect."><div className="arch"><div className="arch-line" />{['Data', 'Preprocessing', 'Embeddings / ML', 'Vector DB', 'Retrieval', 'LLM', 'API', 'Application'].map((x, i) => <div className="arch-node" key={x}><small>{String(i + 1).padStart(2, '0')}</small><b>{x}</b><span>{['Python / sources', 'Pandas / NLP', 'Hugging Face', 'FAISS', 'LangChain', 'Groq / LLMs', 'FastAPI', 'Streamlit / UI'][i]}</span></div>)}</div></Section>
    <Section id="education" kicker="06 / EDUCATION" title="Foundation in engineering."><div className="edu-card"><div className="edu-mark">{data.education[0].degree}</div><div><h3>{data.education[0].field}</h3><p>{data.education[0].url ? <a href={data.education[0].url} target="_blank" rel="noreferrer">{data.education[0].institution}</a> : data.education[0].institution}</p><span>{data.education[0].university} · {data.education[0].dates}</span>{data.education[0].image && <div className="education-image" style={{ backgroundImage: `url(${data.education[0].image})` }} role="img" aria-label={data.education[0].imageAlt} />}</div></div></Section>
    <Section id="certifications" kicker="07 / CERTIFICATIONS" title="Learning, documented."><div className="cert-grid">{data.certifications.map(c => <div className="cert" key={c.name}><div className="cert-icon"><Zap size={16} /></div><div><h3>{c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.name}</a> : c.name}</h3><p>{c.issuer}</p>{c.image && <div className="cert-image" style={{ backgroundImage: `url(${c.image})` }} role="img" aria-label={c.imageAlt} />}{c.date && <small>{c.date}{c.credentialId && ` · ${c.credentialId}`}</small>}</div></div>)}</div></Section>

    <section id="contact" className="contact"><div><span className="eyebrow">{contact.eyebrow}</span><h2>{contact.headline}</h2><p>{contact.description}</p></div><div className="contact-card"><a href={`mailto:${data.personal.email}`} className="contact-line"><Mail /> <span>{data.personal.email}</span><ArrowUpRight /></a>{data.personal.phone && <a href={`tel:${data.personal.phone.replace(/[^+\d]/g, '')}`} className="contact-line"><span>Phone</span><span>{data.personal.phone}</span><ArrowUpRight /></a>}<button className="contact-line" onClick={copy}><Copy /> <span>{copied ? 'Copied to clipboard' : 'Copy email'}</span></button>{data.personal.linkedin && <a href={data.personal.linkedin} target="_blank" rel="noreferrer" className="contact-line"><LinkedinIcon /> <span>LinkedIn profile</span><ExternalLink /></a>}{data.social.github && <a href={data.social.github} target="_blank" rel="noreferrer" className="contact-line"><GithubIcon /> <span>GitHub profile</span><ExternalLink /></a>}{data.social.upwork && <a href={data.social.upwork} target="_blank" rel="noreferrer" className="contact-line"><ExternalLink /> <span>Upwork profile</span><ExternalLink /></a>}</div></section>
    <footer><div className="brand"><span>SR</span><b>{data.personal.name}</b></div><p>{data.personal.title} · {data.personal.location}</p><div>© {new Date().getFullYear()} · Built for the work, not the template.</div></footer>
    <button className="backtop" onClick={() => go('home')}><ArrowDown size={17} /></button>

    <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal" onClick={() => setSelected(null)}><motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="modal-card" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}><X /></button><span className="tag">{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p><h4>Technology stack</h4><div className="chips">{selected.technologies.map(t => <span key={t}>{t}</span>)}</div><h4>Key features</h4><ul>{selected.features?.map(f => <li key={f}>{f}</li>)}</ul>{selected.metrics && <><h4>Verified signals</h4><div className="metrics">{selected.metrics.map(m => <b key={m}>{m}</b>)}</div></>}{(selected.demoUrl || selected.githubUrl) && <div className="modal-actions">{selected.demoUrl && <a href={selected.demoUrl} target="_blank" rel="noreferrer" className="primary">Live demo <ExternalLink size={15} /></a>}{selected.githubUrl && <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="ghost"><GithubIcon size={15} /> GitHub</a>}</div>}</motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{cmd && <motion.div className="cmd-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCmd(false)}><motion.div className="cmd" initial={{ scale: .96, y: 10 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()}><div className="cmd-search"><Search /><input autoFocus placeholder="Type a command…" /><kbd>ESC</kbd></div>{['home', ...data.navigation.map(n => n.toLowerCase())].filter((id, i, arr) => arr.indexOf(id) === i).map(id => <button key={id} onClick={() => go(id)}>{id[0].toUpperCase() + id.slice(1)}<ChevronRight /></button>)}{data.personal.linkedin && <a href={data.personal.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn</a>}{data.personal.github && <a href={data.personal.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>}{data.resume.url && <a href={data.resume.url} target="_blank" rel="noreferrer">{data.resume.label}</a>}</motion.div></motion.div>}</AnimatePresence>
  </main>;
}
