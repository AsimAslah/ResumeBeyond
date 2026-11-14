import './_group.css';
import './recruiter-first-visual-resume.css';
import { ArrowDown, ArrowUpRight, CheckCircle2, ExternalLink, FileDown, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { capabilities, evidence, projects, sources } from '@/data/knowledge-base';
import { Ambassador } from '@/components/ambassador';
import { MiniByteMark } from '@/components/mini-byte-mark';
import { ThemeToggle } from '@/components/theme-toggle';

function EvidenceLinks({ ids }: { ids: readonly string[] }) {
  return (
    <span className="rfv__sources" aria-label="Supporting sources">
      {ids.map((id) => {
        const source = sources[id as keyof typeof sources];
        return (
          <a href={source.url} target="_blank" rel="noreferrer" key={id} aria-label={`${id}: ${source.title}, opens in a new tab`}>
            {id}<ExternalLink size={10} aria-hidden="true" />
          </a>
        );
      })}
    </span>
  );
}

export function RecruiterFirstVisualResume() {
  return (
    <div className="rfv">
      <a className="skip-link" href="#rfv-main">Skip to content</a>
      <header className="rfv__topline">
        <a className="rfv__brand" href="#rfv-home" aria-label="ResumeBeyond home">
          <MiniByteMark compact /><span>Resume<strong>Beyond</strong></span>
        </a>
        <nav className="rfv__nav" aria-label="Primary navigation">
          <a href="#rfv-fit">Role fit</a><a href="#rfv-work">Work</a><a href="#rfv-background">Background</a><a href="#rfv-evidence">Sources</a>
        </nav>
        <div className="rfv__actions">
          <a className="rfv__direction" href="/__mockup/preview/resumebeyond/CurrentPremiumPortfolio">Direction A</a>
          <ThemeToggle />
        </div>
      </header>

      <main className="rfv__main" id="rfv-main">
        <section className="rfv__hero" id="rfv-home">
          <div>
            <p className="rfv__eyebrow">Recruiter-first · evidence-led</p>
            <p className="rfv__name">Asim Aslah P M</p>
            <h1>Machine Learning Engineer <span>— LLM Applications &amp; Evaluation</span></h1>
            <p className="rfv__intro">Building intelligent, reliable, and privacy-aware AI systems. I turn AI capabilities into inspectable products: evidence-backed evaluation platforms, privacy-aware workflows, Python services, and accessible interfaces.</p>
            <div className="rfv__hero-actions">
              <a className="rfv__button rfv__button--primary" href="#rfv-work">Review selected work <ArrowDown size={15} /></a>
              <a className="rfv__button" href="/__mockup/Asim_Aslah_Public_Resume.pdf" download><FileDown size={15} /> Public résumé</a>
              <a className="rfv__button" href="#rfv-contact">Contact <ArrowUpRight size={14} /></a>
            </div>
            <aside className="rfv__mini-byte" aria-label="Mini Byte evidence guide">
              <MiniByteMark compact />
              <p><strong>Mini Byte can cite approved evidence only.</strong> Ask about role fit, evaluation, projects, or privacy work. Conversations stay in this page’s memory and are not stored.</p>
            </aside>
          </div>
          <aside className="rfv__rolecard" aria-label="Role fit summary">
            <div className="rfv__rolecard-head"><strong>60-second role brief</strong><span>RB / 001</span></div>
            <div className="rfv__rolecard-core">
              <img className="rfv__portrait" src="/__mockup/images/asim-about.webp" alt="Asim Aslah, portfolio portrait" fetchPriority="high" />
              <div><small>Target role</small><strong>ML Engineer<br />LLM applications &amp; evaluation</strong><p>Open to ML engineering opportunities</p></div>
            </div>
            <div className="rfv__rolecard-row">
              <div><small>Primary stack</small><strong>Python + TypeScript</strong></div>
              <div><small>Proof standard</small><strong>Repository-backed</strong></div>
            </div>
            <div className="rfv__rolecard-row">
              <div><small>Core focus</small><strong>Evaluation systems</strong></div>
              <div><small>Also focused on</small><strong>RAG privacy · AI apps</strong></div>
            </div>
            <div className="rfv__rolecard-foot"><span>M.Tech AI &amp; Data Science</span><a href="#rfv-background">Background <ArrowDown size={12} /></a></div>
          </aside>
        </section>

        <nav className="rfv__indexbar" aria-label="Portfolio at a glance">
          <a href="#rfv-fit"><span>Capabilities</span><strong>01—03</strong></a>
          <a href="#rfv-work"><span>Evidence-rich projects</span><strong>01—06</strong></a>
          <a href="#rfv-evidence"><span>Approved sources</span><strong>OPEN REGISTRY</strong></a>
        </nav>

        <section className="rfv__section" id="rfv-fit">
          <div className="rfv__section-heading">
            <div><p className="rfv__eyebrow">Role match</p><h2>Three capabilities.<br />Clear proof trail.</h2></div>
            <p>The fastest way to assess the fit: each capability links directly to the work and evidence behind it.</p>
          </div>
          <div className="rfv__capabilities">
            {capabilities.map((capability) => (
              <article className="rfv__capability" key={capability.title}>
                <div className="rfv__capability-top"><span>{capability.index} / 03</span><CheckCircle2 size={17} aria-hidden="true" /></div>
                <h3>{capability.title}</h3>
                <p>{capability.summary}</p>
                <div className="rfv__capability-links">
                  {capability.evidenceIds.map((id) => {
                    const item = evidence.find((record) => record.id === id)!;
                    return <a href={`#project-${id}`} key={id}>{item.project ?? item.title}</a>;
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rfv__section rfv__projects" id="rfv-work">
          <div className="rfv__section-heading">
            <div><p className="rfv__eyebrow">Selected work · six projects</p><h2>Proof before polish.</h2></div>
            <p>Each project separates problem, contribution, approach, documented outcome, status, technologies, and source IDs. Ongoing work is labelled as such.</p>
          </div>
          <div className="rfv__project-list">
            {projects.map((project) => {
              const record = evidence.find((item) => item.id === project.evidenceId)!;
              const imagePath = project.image?.replace('/images/', '/__mockup/images/');
              return (
                <article className="rfv__project" id={`project-${project.evidenceId}`} key={project.slug}>
                  <header className="rfv__project-head">
                    <div><div className="rfv__project-label"><b>{project.rank}</b><span>{project.type}</span></div><h3>{project.title}</h3></div>
                    <span className="rfv__status">{project.status}</span>
                  </header>
                  <div className={`rfv__project-visual${imagePath ? '' : ' rfv__project-visual--diagram'}`}>
                    {imagePath ? <img src={imagePath} alt={`${project.title} project interface or published evidence`} loading="lazy" /> : <div className="rfv__diagram" aria-label="PII risk routing research concept"><span>PII</span><ArrowUpRight size={14} /><span>RAG</span><ArrowUpRight size={14} /><span>RISK</span></div>}
                  </div>
                  <div className="rfv__project-body">
                    <div className="rfv__project-detail"><strong>Problem</strong><p>{project.problem}</p></div>
                    <div className="rfv__project-detail"><strong>Contribution</strong><p>{project.contribution}</p></div>
                    <div className="rfv__project-detail"><strong>Approach</strong><p>{project.approach}</p></div>
                    <div className="rfv__project-detail"><strong>Outcome</strong><p>{project.outcome}</p></div>
                    <div className="rfv__tech" aria-label="Technologies">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                    <div className="rfv__project-links">
                      {project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><Github size={13} /> Repository <ArrowUpRight size={11} /></a>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">{project.slug === 'piishift-rag' ? 'Research case study' : 'Live / evidence'} <ArrowUpRight size={11} /></a>}
                      <EvidenceLinks ids={record.sourceIds} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="rfv__source-note"><ShieldCheck size={15} aria-hidden="true" /> Local RAG is intentionally omitted: no exact public repository could be verified on 2026-11-14. AI Quality Lab is shown instead because its implementation evidence is public.</p>
        </section>

        <section className="rfv__section" id="rfv-background">
          <div className="rfv__section-heading">
            <div><p className="rfv__eyebrow">Background</p><h2>Work and study,<br />clearly separated.</h2></div>
            <p>Professional experience and academic research are labelled separately. Project work is not presented as employment.</p>
          </div>
          <div className="rfv__background">
            <article>
              <span className="rfv__year">2026</span><p className="rfv__eyebrow">Professional experience</p>
              <h3>Software Development Intern</h3><p className="rfv__org">Realviz LLP (Brickrat) · Jun–Jul 2026</p>
              <p>Contributed to the application workflow around a pretrained image-to-3D model: upload, preprocessing, inference, preview, export, and product integration.</p>
              <EvidenceLinks ids={['SRC-PORTFOLIO', 'SRC-IMAGE-3D']} />
            </article>
            <article>
              <span className="rfv__year">2025–27</span><p className="rfv__eyebrow">Education &amp; research</p>
              <h3>M.Tech · AI &amp; Data Science</h3><p className="rfv__org">Government Engineering College Palakkad</p>
              <p>Current research examines privacy-risk routing for RAG under PII distribution shift. B.Tech in Computer Science &amp; Engineering completed in 2024.</p>
              <EvidenceLinks ids={['SRC-PORTFOLIO', 'SRC-PIISHIFT']} />
            </article>
          </div>
        </section>

        <section className="rfv__section" id="rfv-skills">
          <div className="rfv__section-heading">
            <div><p className="rfv__eyebrow">Technical toolkit</p><h2>Selected for the work.</h2></div>
            <p>Technologies and practices grounded in the approved project evidence.</p>
          </div>
          <div className="rfv__skills">
            <div className="rfv__skill"><span>AI engineering</span><p>Python · FastAPI · PyTorch integration · RAG · model APIs · computer vision</p></div>
            <div className="rfv__skill"><span>Evaluation</span><p>Rubric design · pairwise review · groundedness · preference evidence · failure analysis</p></div>
            <div className="rfv__skill"><span>Privacy</span><p>PII detection · local masking · privacy gates · data minimization · output filtering</p></div>
            <div className="rfv__skill"><span>Product</span><p>React · TypeScript · Next.js · REST · SSE · SQL · accessible interfaces</p></div>
            <div className="rfv__skill"><span>Quality</span><p>pytest · Vitest · Playwright · CI · security checks · deployment runbooks</p></div>
            <div className="rfv__skill"><span>Research interests</span><p>Reliable LLM applications · evaluation methodology · privacy-aware retrieval · distribution shift</p></div>
          </div>
        </section>

        <section className="rfv__section" id="rfv-evidence">
          <div className="rfv__section-heading">
            <div><p className="rfv__eyebrow">Approved evidence</p><h2>Trace every claim.</h2></div>
            <p>Mini Byte can cite only this registry. Retrieved text is treated as untrusted data, and missing evidence produces an explicit refusal.</p>
          </div>
          <div className="rfv__evidence" role="table" aria-label="Approved source registry">
            {Object.values(sources).map((source) => (
              <a role="row" href={source.url} target="_blank" rel="noreferrer" key={source.id} aria-label={`${source.id}, ${source.title}, verified ${source.verifiedOn}, opens in a new tab`}>
                <span role="cell">{source.id}</span><strong role="cell">{source.title}</strong><span role="cell">Verified {source.verifiedOn}</span><ExternalLink role="cell" size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="rfv__button" style={{ marginTop: 16 }} href="https://github.com/AsimAslah/ResumeBeyond/blob/main/docs/SOURCES.md" target="_blank" rel="noreferrer">Open the full claim-to-source table <ArrowUpRight size={14} /></a>
        </section>

        <section className="rfv__contact" id="rfv-contact">
          <p className="rfv__eyebrow">Next step</p>
          <h2>Let’s discuss reliable AI systems.</h2>
          <p>For a public, privacy-safe contact route, connect with Asim on LinkedIn or review the engineering work on GitHub.</p>
          <div className="rfv__contact-actions">
            <a className="rfv__button" href="https://www.linkedin.com/in/asim-aslah-pm-05906a222" target="_blank" rel="noreferrer"><Linkedin size={16} /> Connect on LinkedIn</a>
            <a className="rfv__button" href="https://github.com/AsimAslah" target="_blank" rel="noreferrer"><Github size={16} /> View GitHub</a>
          </div>
          <div className="rfv__footer"><span>ResumeBeyond · Beyond the Static Resume</span><span>Privacy-first · Evidence-grounded · No chat storage</span></div>
        </section>
      </main>
      <Ambassador />
    </div>
  );
}
