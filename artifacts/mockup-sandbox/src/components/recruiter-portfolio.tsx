import { ArrowDown, ArrowUpRight, CheckCircle2, ExternalLink, FileDown, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { capabilities, evidence, projects, sources } from '@/data/knowledge-base';
import { Ambassador } from './ambassador';
import { MiniByteMark } from './mini-byte-mark';
import { ThemeToggle } from './theme-toggle';

function SourceLinks({ ids }: { ids: readonly string[] }) {
  return (
    <span className="source-links" aria-label="Supporting sources">
      {ids.map((id) => {
        const source = sources[id as keyof typeof sources];
        return <a href={source.url} target="_blank" rel="noreferrer" key={id}>{id}<ExternalLink size={10} aria-hidden="true" /></a>;
      })}
    </span>
  );
}

export function RecruiterPortfolio() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="ResumeBeyond home"><MiniByteMark compact /><span>Resume<strong>Beyond</strong></span></a>
        <nav aria-label="Primary navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#projects">Work</a>
          <a href="#experience">Background</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="direction-link" href="/directions/evolution">Direction A</a>
          <ThemeToggle />
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="availability"><span /> Open to ML engineering opportunities</div>
            <p className="hero-kicker">Asim Aslah P M</p>
            <h1>Machine Learning Engineer <span>— LLM Applications &amp; Evaluation</span></h1>
            <p className="hero-position">Building intelligent, reliable, and privacy-aware AI systems.</p>
            <p className="hero-intro">I turn AI capabilities into inspectable products: evidence-backed evaluation platforms, privacy-aware workflows, Python services, and accessible interfaces.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">View selected work <ArrowDown size={17} /></a>
              <a className="button button--secondary" href="/Asim_Aslah_Public_Resume.pdf" download>Download résumé <FileDown size={17} /></a>
              <a className="text-link" href="#contact">Contact <ArrowUpRight size={15} /></a>
            </div>
            <div className="hero-proof">
              <span><strong>3</strong> focused capabilities</span>
              <span><strong>6</strong> evidence-rich projects</span>
              <span><strong>0</strong> unsupported metrics</span>
            </div>
          </div>
          <aside className="hero-brief" aria-label="Candidate brief">
            <div className="brief-top"><span>60-second brief</span><span className="brief-id">RB / 001</span></div>
            <div className="brief-avatar"><img src="/__mockup/images/asim-about.webp" alt="Asim Aslah" fetchPriority="high" /></div>
            <div className="brief-role"><span>Focus</span><strong>Evaluation systems · RAG privacy · AI applications</strong></div>
            <div className="brief-grid">
              <span>Primary stack</span><strong>Python + TypeScript</strong>
              <span>Evidence standard</span><strong>Repository-backed</strong>
              <span>Current study</span><strong>M.Tech AI &amp; DS</strong>
            </div>
            <a href="#capabilities">Review capability evidence <ArrowDown size={15} /></a>
          </aside>
        </section>

        <section className="ticker" aria-label="Verified focus areas">
          <span>LLM evaluation</span><i /> <span>Retrieval systems</span><i /> <span>Privacy engineering</span><i /> <span>FastAPI</span><i /> <span>React &amp; TypeScript</span><i /> <span>Evidence first</span>
        </section>

        <section className="section" id="capabilities">
          <div className="section-heading">
            <div><p className="eyebrow">Role match</p><h2>Three capabilities,<br />each with receipts.</h2></div>
            <p>The fastest path through the portfolio: what Asim can do, where it appears in shipped work, and what the evidence does—and does not—prove.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.title}>
                <span className="capability-index">{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.summary}</p>
                <div className="capability-evidence">
                  {capability.evidenceIds.map((id) => {
                    const item = evidence.find((record) => record.id === id)!;
                    return <a href={`#evidence-${id}`} key={id}><CheckCircle2 size={14} />{item.project ?? item.title}</a>;
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading section-heading--projects">
            <div><p className="eyebrow">Selected work</p><h2>Built, tested,<br />and clearly scoped.</h2></div>
            <p>Ordered for the target role. Each entry separates the problem, personal contribution, technical approach, documented outcome, and current status.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => {
              const record = evidence.find((item) => item.id === project.evidenceId)!;
              return (
                <article className="project-card" id={`evidence-${project.evidenceId}`} key={project.slug}>
                  <div className="project-number">{project.rank}</div>
                  <div className="project-content">
                    <div className="project-title-row">
                      <div><span className="project-type">{project.type}</span><h3>{project.title}</h3></div>
                      <span className="status-pill">{project.status}</span>
                    </div>
                    <div className="project-details">
                      <div><span>Problem</span><p>{project.problem}</p></div>
                      <div><span>Personal contribution</span><p>{project.contribution}</p></div>
                      <div><span>Technical approach</span><p>{project.approach}</p></div>
                      <div><span>Documented outcome</span><p>{project.outcome}</p></div>
                    </div>
                    <div className="tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                    <div className="project-links">
                      {project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><Github size={15} /> Repository <ArrowUpRight size={13} /></a>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">{project.slug === 'piishift-rag' ? 'Research case study' : 'Live / evidence'} <ArrowUpRight size={13} /></a>}
                      <SourceLinks ids={record.sourceIds} />
                    </div>
                  </div>
                  <div className={`project-visual${project.image ? '' : ' project-visual--research'}`}>
                    {project.image ? <img src={project.image.replace('/images/', '/__mockup/images/')} alt={`${project.title} project evidence`} loading="lazy" /> : <div className="research-orbit"><span>PII</span><span>RAG</span><span>RISK</span></div>}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="source-gap"><ShieldCheck size={17} /> Local RAG is intentionally omitted: no exact public repository could be verified on 2026-11-14. AI Quality Lab is shown instead because its implementation evidence is public.</p>
        </section>

        <section className="section background-section" id="experience">
          <div className="section-heading">
            <div><p className="eyebrow">Background</p><h2>Engineering practice<br />meets research rigor.</h2></div>
            <p>Professional experience and academic research are labelled separately. Project work is not presented as employment.</p>
          </div>
          <div className="background-grid">
            <article className="timeline-card">
              <span className="timeline-year">2026</span>
              <p className="eyebrow">Professional experience</p>
              <h3>Software Development Intern</h3>
              <p className="timeline-org">Realviz LLP (Brickrat) · Jun–Jul 2026</p>
              <p>Contributed to the application workflow around a pretrained image-to-3D model: upload, preprocessing, inference, preview, export, and product integration.</p>
              <SourceLinks ids={['SRC-PORTFOLIO', 'SRC-IMAGE-3D']} />
            </article>
            <article className="timeline-card">
              <span className="timeline-year">2025–27</span>
              <p className="eyebrow">Education &amp; research</p>
              <h3>M.Tech · AI &amp; Data Science</h3>
              <p className="timeline-org">Government Engineering College Palakkad</p>
              <p>Current research examines privacy-risk routing for RAG under PII distribution shift. B.Tech in Computer Science &amp; Engineering completed in 2024.</p>
              <SourceLinks ids={['SRC-PORTFOLIO', 'SRC-PIISHIFT']} />
            </article>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="skills-intro"><p className="eyebrow">Technical toolkit</p><h2>Selected for the work,<br />not for keyword density.</h2></div>
          <div className="skills-grid">
            <div><span>AI engineering</span><p>Python · FastAPI · PyTorch integration · RAG · model APIs · computer vision</p></div>
            <div><span>Evaluation</span><p>Rubric design · pairwise review · groundedness · preference evidence · failure analysis</p></div>
            <div><span>Privacy</span><p>PII detection · local masking · privacy gates · data minimization · output filtering</p></div>
            <div><span>Product</span><p>React · TypeScript · Next.js · REST · SSE · SQL · accessible interfaces</p></div>
            <div><span>Quality</span><p>pytest · Vitest · Playwright · CI · security checks · deployment runbooks</p></div>
            <div><span>Research interests</span><p>Reliable LLM applications · evaluation methodology · privacy-aware retrieval · distribution shift</p></div>
          </div>
        </section>

        <section className="section evidence-section" id="evidence">
          <div className="section-heading">
            <div><p className="eyebrow">Approved evidence</p><h2>Every substantive claim<br />has a source ID.</h2></div>
            <p>Mini Byte can cite only this registry. Retrieved text is treated as untrusted data, and missing evidence produces an explicit refusal.</p>
          </div>
          <div className="evidence-table" role="table" aria-label="Approved source registry">
            {Object.values(sources).map((source) => (
              <a role="row" href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                <span role="cell">{source.id}</span><strong role="cell">{source.title}</strong><span role="cell">Verified {source.verifiedOn}</span><ExternalLink role="cell" size={14} />
              </a>
            ))}
          </div>
          <a className="text-link evidence-doc-link" href="https://github.com/AsimAslah/ResumeBeyond/blob/main/docs/SOURCES.md" target="_blank" rel="noreferrer">Open the full claim-to-source table <ArrowUpRight size={15} /></a>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">Next step</p>
          <h2>Let’s discuss reliable AI systems.</h2>
          <p>For a public, privacy-safe contact route, connect with Asim on LinkedIn or review the engineering work on GitHub.</p>
          <div className="contact-actions">
            <a className="button button--light" href="https://www.linkedin.com/in/asim-aslah-pm-05906a222" target="_blank" rel="noreferrer"><Linkedin size={18} /> Connect on LinkedIn</a>
            <a className="button button--outline-light" href="https://github.com/AsimAslah" target="_blank" rel="noreferrer"><Github size={18} /> View GitHub</a>
          </div>
          <div className="contact-foot"><span>ResumeBeyond · Beyond the Static Resume</span><span>Privacy-first · Evidence-grounded · No chat storage</span></div>
        </section>
      </main>

      <Ambassador />
    </div>
  );
}

