import { ArrowLeft, ArrowRight, Github, Linkedin, Sparkles } from 'lucide-react';
import { capabilities, projects } from '@/data/knowledge-base';
import { Ambassador } from './ambassador';
import { MiniByteMark } from './mini-byte-mark';

export function EvolutionPortfolio() {
  return (
    <div className="evolution-shell">
      <header className="evolution-header">
        <a href="/" className="evolution-back"><ArrowLeft size={16} /> Direction B: recruiter-first</a>
        <span>Direction A · Evolution of the existing portfolio</span>
      </header>
      <main>
        <section className="evolution-hero">
          <div className="evolution-byte"><MiniByteMark /><span className="orbit orbit--one" /><span className="orbit orbit--two" /></div>
          <p className="eyebrow">Hello, I’m Asim.</p>
          <h1>I build AI systems<br />that show their work.</h1>
          <p>Machine Learning Engineer — LLM Applications &amp; Evaluation</p>
          <div className="evolution-actions"><a href="#evolution-work">Explore the work <ArrowRight size={16} /></a><a href="#evolution-work"><Sparkles size={16} /> Ask Mini Byte below</a></div>
        </section>
        <section className="evolution-capabilities">
          {capabilities.map((capability) => <article key={capability.title}><span>{capability.index}</span><h2>{capability.title}</h2><p>{capability.summary}</p></article>)}
        </section>
        <section className="evolution-work" id="evolution-work">
          <div className="evolution-heading"><p className="eyebrow">Selected work</p><h2>Ideas turned into<br />working systems.</h2></div>
          {projects.slice(0, 5).map((project) => (
            <article key={project.slug}><span>{project.rank}</span><div><p>{project.type} · {project.status}</p><h3>{project.title}</h3><p>{project.problem}</p></div><div className="evolution-tags">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div></article>
          ))}
        </section>
        <section className="evolution-contact"><p>Prefer a concise review?</p><a href="/">Open the recruiter-first direction <ArrowRight size={16} /></a><div><a href="https://github.com/AsimAslah"><Github /></a><a href="https://www.linkedin.com/in/asim-aslah-pm-05906a222"><Linkedin /></a></div></section>
      </main>
      <Ambassador />
    </div>
  );
}

