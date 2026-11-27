export type SourceId =
  | 'SRC-EVALLENS'
  | 'SRC-EVALLENS-RELEASE'
  | 'SRC-DATAVEIL'
  | 'SRC-IMAGE-3D'
  | 'SRC-QUALITY-LAB'
  | 'SRC-PORTFOLIO'
  | 'SRC-PIISHIFT'
  | 'SRC-GITHUB';

export type Source = {
  id: SourceId;
  title: string;
  url: string;
  verifiedOn: string;
  kind: 'repository' | 'release' | 'portfolio' | 'profile';
};

export type EvidenceRecord = {
  id: string;
  title: string;
  statement: string;
  excerpt: string;
  sourceIds: SourceId[];
  project?: string;
  section: string;
  keywords: string[];
};

export const sources: Record<SourceId, Source> = {
  'SRC-EVALLENS': {
    id: 'SRC-EVALLENS',
    title: 'EvalLens repository',
    url: 'https://github.com/AsimAslah/evallens',
    verifiedOn: '2026-11-15',
    kind: 'repository',
  },
  'SRC-EVALLENS-RELEASE': {
    id: 'SRC-EVALLENS-RELEASE',
    title: 'EvalLens v1.0.0 release',
    url: 'https://github.com/AsimAslah/evallens/releases/tag/v1.0.0',
    verifiedOn: '2026-11-15',
    kind: 'release',
  },
  'SRC-DATAVEIL': {
    id: 'SRC-DATAVEIL',
    title: 'DataVeil repository',
    url: 'https://github.com/AsimAslah/Dataveil',
    verifiedOn: '2026-11-15',
    kind: 'repository',
  },
  'SRC-IMAGE-3D': {
    id: 'SRC-IMAGE-3D',
    title: 'Image-to-3D repository',
    url: 'https://github.com/AsimAslah/Image-to-3D',
    verifiedOn: '2026-11-15',
    kind: 'repository',
  },
  'SRC-QUALITY-LAB': {
    id: 'SRC-QUALITY-LAB',
    title: 'AI Quality Lab repository',
    url: 'https://github.com/AsimAslah/AI-Quality-Lab',
    verifiedOn: '2026-11-15',
    kind: 'repository',
  },
  'SRC-PORTFOLIO': {
    id: 'SRC-PORTFOLIO',
    title: 'Original portfolio repository',
    url: 'https://github.com/AsimAslah/asim-portfolio',
    verifiedOn: '2026-11-15',
    kind: 'portfolio',
  },
  'SRC-PIISHIFT': {
    id: 'SRC-PIISHIFT',
    title: 'PIIShift-RAG public research case study',
    url: 'https://asim-portfolio.asimaslu7.workers.dev/projects/piishift-rag',
    verifiedOn: '2026-11-15',
    kind: 'portfolio',
  },
  'SRC-GITHUB': {
    id: 'SRC-GITHUB',
    title: 'Asim Aslah on GitHub',
    url: 'https://github.com/AsimAslah',
    verifiedOn: '2026-11-15',
    kind: 'profile',
  },
};

export const evidence: EvidenceRecord[] = [
  {
    id: 'EV-ROLE',
    title: 'Professional direction',
    statement: 'Asim is positioning for Machine Learning Engineer roles focused on LLM applications and evaluation.',
    excerpt: 'Public work centers on AI response evaluation, privacy-aware AI, retrieval research, Python services, and full-stack delivery.',
    sourceIds: ['SRC-EVALLENS', 'SRC-PORTFOLIO'],
    section: '#home',
    keywords: ['role', 'fit', 'machine learning engineer', 'llm', 'evaluation', 'candidate', 'hire'],
  },
  {
    id: 'EV-EVALLENS',
    title: 'EvalLens: human-centered AI evaluation',
    statement: 'EvalLens v1.0.0 is a full-stack platform for pairwise AI-response comparison, weighted rubric scoring, evidence-backed preference, reproducible rubric snapshots, and cautious analytics.',
    excerpt: 'The project keeps explicit human preference separate from calculated scores and preserves rubric context when an evaluation is saved.',
    sourceIds: ['SRC-EVALLENS', 'SRC-EVALLENS-RELEASE'],
    project: 'EvalLens',
    section: '#projects',
    keywords: ['evallens', 'evaluation', 'reliability', 'rubric', 'pairwise', 'analytics', 'human preference', 'llm quality'],
  },
  {
    id: 'EV-QUALITY-LAB',
    title: 'AI Quality Lab: observable evaluation',
    statement: 'AI Quality Lab is an implementation-complete FastAPI and React evaluation workspace that records an eight-stage server pipeline, streams persisted events with SSE, and visibly falls back when optional model calls fail.',
    excerpt: 'Its checks are labelled deterministic, heuristic, or model-assisted; the repository does not claim a public deployment.',
    sourceIds: ['SRC-QUALITY-LAB'],
    project: 'AI Quality Lab',
    section: '#projects',
    keywords: ['quality lab', 'evaluation', 'reliability', 'fastapi', 'sse', 'observability', 'failure', 'replay'],
  },
  {
    id: 'EV-DATAVEIL',
    title: 'DataVeil: local-first privacy protection',
    statement: 'DataVeil is a local FastAPI application that detects and masks sensitive text, documents, and image regions before external AI use, with user-held recovery data for restoration.',
    excerpt: 'The repository states that no cloud API, database, analytics service, or server-side upload history is used.',
    sourceIds: ['SRC-DATAVEIL'],
    project: 'DataVeil',
    section: '#projects',
    keywords: ['dataveil', 'privacy', 'pii', 'masking', 'presidio', 'opencv', 'local', 'sensitive'],
  },
  {
    id: 'EV-PIISHIFT',
    title: 'PIIShift-RAG: ongoing M.Tech research',
    statement: 'PIIShift-RAG is ongoing academic research on privacy-risk routing for retrieval-augmented generation when PII patterns shift between development and deployment.',
    excerpt: 'The public case study describes the research framing as ongoing; implementation choices and empirical results are not presented as complete.',
    sourceIds: ['SRC-PIISHIFT', 'SRC-PORTFOLIO'],
    project: 'PIIShift-RAG',
    section: '#projects',
    keywords: ['piishift', 'rag', 'privacy', 'research', 'distribution shift', 'conformal', 'retrieval'],
  },
  {
    id: 'EV-IMAGE-3D',
    title: 'Image-to-3D application integration',
    statement: 'The Image-to-3D project integrates the pretrained TripoSR model into Gradio and FastAPI application workflows with upload, preprocessing, interactive preview, and OBJ/GLB export.',
    excerpt: 'The repository clearly attributes the original TripoSR model and limits Asim’s claim to application-level integration and customization.',
    sourceIds: ['SRC-IMAGE-3D'],
    project: 'Image-to-3D',
    section: '#projects',
    keywords: ['image to 3d', 'triposr', 'pytorch', 'fastapi', 'gradio', 'mesh', 'inference', 'obj', 'glb'],
  },
  {
    id: 'EV-PORTFOLIO',
    title: 'Original full-stack portfolio',
    statement: 'The original portfolio is a deployed Next.js and React application with case studies, accessible controls, a scripted evidence guide, theme support, and Cloudflare infrastructure.',
    excerpt: 'ResumeBeyond reuses visual ideas while intentionally isolating Cloudflare D1 feedback, analytics, and private contact data.',
    sourceIds: ['SRC-PORTFOLIO'],
    project: 'Original portfolio',
    section: '#projects',
    keywords: ['portfolio', 'nextjs', 'react', 'cloudflare', 'accessibility', 'frontend', 'full stack'],
  },
  {
    id: 'EV-EXPERIENCE',
    title: 'Software development internship',
    statement: 'Asim completed a software development internship at Realviz LLP (Brickrat) from June to July 2026, contributing to the application workflow around a pretrained Image-to-3D model.',
    excerpt: 'The public portfolio distinguishes application integration from ownership of the underlying TripoSR model.',
    sourceIds: ['SRC-PORTFOLIO', 'SRC-IMAGE-3D'],
    section: '#experience',
    keywords: ['experience', 'internship', 'realviz', 'brickrat', 'professional', 'work'],
  },
  {
    id: 'EV-EDUCATION',
    title: 'Education',
    statement: 'Asim is pursuing an M.Tech in Artificial Intelligence and Data Science and previously completed a B.Tech in Computer Science and Engineering.',
    excerpt: 'The public portfolio lists the M.Tech period as 2025–2027 and the B.Tech period as 2020–2024.',
    sourceIds: ['SRC-PORTFOLIO'],
    section: '#experience',
    keywords: ['education', 'mtech', 'btech', 'degree', 'study', 'college'],
  },
  {
    id: 'EV-SKILLS',
    title: 'Verified engineering toolkit',
    statement: 'Verified repository evidence covers Python, FastAPI, PyTorch integration, React, TypeScript, Next.js, evaluation design, privacy controls, testing, and deployment documentation.',
    excerpt: 'Skill claims are limited to technologies visible in approved repositories and their documentation.',
    sourceIds: ['SRC-EVALLENS', 'SRC-DATAVEIL', 'SRC-IMAGE-3D', 'SRC-QUALITY-LAB'],
    section: '#skills',
    keywords: ['skills', 'python', 'typescript', 'react', 'nextjs', 'fastapi', 'pytorch', 'testing', 'stack'],
  },
];

export const capabilities = [
  {
    index: '01',
    title: 'End-to-End AI Engineering',
    summary: 'From model integration and Python APIs to accessible React interfaces, tests, and deployment runbooks.',
    evidenceIds: ['EV-IMAGE-3D', 'EV-QUALITY-LAB', 'EV-PORTFOLIO'],
  },
  {
    index: '02',
    title: 'AI Evaluation & Reliability',
    summary: 'Human-centered comparison, explicit rubrics, observable execution, bounded failure handling, and honest limitations.',
    evidenceIds: ['EV-EVALLENS', 'EV-QUALITY-LAB'],
  },
  {
    index: '03',
    title: 'Privacy-Aware AI Systems',
    summary: 'Local-first masking, privacy-gated model access, and ongoing research into PII risk under distribution shift.',
    evidenceIds: ['EV-DATAVEIL', 'EV-PIISHIFT'],
  },
] as const;

export const projects = [
  {
    slug: 'evallens',
    rank: '01',
    title: 'EvalLens',
    status: 'Released · v1.0.0',
    type: 'Independent product',
    problem: 'AI-response reviews often lose the rubric, evidence, and reasoning behind a preference.',
    contribution: 'Designed and implemented the evaluation methodology, full-stack application, validation, persistence, analytics, exports, tests, CI, and release documentation.',
    approach: 'Pairwise comparison with independent weighted scoring, evidence fields, immutable rubric snapshots, and explicit human preference.',
    outcome: 'A verified public v1.0.0 release and live demonstration; scores are presented as rubric summaries, not proof of general model superiority.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Cloudflare D1', 'Zod', 'Vitest', 'Playwright'],
    image: '/images/projects/evallens-response-comparison.png',
    evidenceId: 'EV-EVALLENS',
    repo: 'https://github.com/AsimAslah/evallens',
    demo: 'https://evallens.asimaslu7.workers.dev',
  },
  {
    slug: 'piishift-rag',
    rank: '02',
    title: 'PIIShift-RAG',
    status: 'Ongoing research',
    type: 'M.Tech research',
    problem: 'PII patterns can change between development and deployment, weakening fixed privacy thresholds in RAG systems.',
    contribution: 'Defined the research framing around privacy-risk estimation, conformal calibration, distribution shift, and policy-aware routing.',
    approach: 'A proposed evidence-gated RAG architecture that treats privacy risk as a routing decision rather than a single static filter.',
    outcome: 'Research framing is public; implementation and empirical results are intentionally not claimed as complete.',
    technologies: ['RAG', 'PII detection', 'Conformal risk control', 'Distribution shift'],
    image: null,
    evidenceId: 'EV-PIISHIFT',
    repo: null,
    demo: 'https://asim-portfolio.asimaslu7.workers.dev/projects/piishift-rag',
  },
  {
    slug: 'dataveil',
    rank: '03',
    title: 'DataVeil',
    status: 'Working prototype',
    type: 'Privacy application',
    problem: 'Sensitive text, documents, and images may expose personal information when sent to external AI tools.',
    contribution: 'Combined document and image protection workflows in one local FastAPI application with reversible, user-held recovery material.',
    approach: 'Local Presidio/spaCy detection, image-region masking, bounded in-memory processing, and explicit restoration workflows.',
    outcome: 'A local-first prototype whose repository states that it uses no cloud API, database, analytics, or server-side upload history.',
    technologies: ['Python', 'FastAPI', 'Presidio', 'spaCy', 'YOLO', 'OpenCV'],
    image: '/images/projects/dataveil-home.png',
    evidenceId: 'EV-DATAVEIL',
    repo: 'https://github.com/AsimAslah/Dataveil',
    demo: null,
  },
  {
    slug: 'ai-quality-lab',
    rank: '04',
    title: 'AI Quality Lab',
    status: 'Implementation complete · deployment pending',
    type: 'Challenge project',
    problem: 'Automated evaluation can hide which checks ran, whether a provider failed, and how a score was produced.',
    contribution: 'Built the FastAPI pipeline, persisted execution events, SSE recovery, privacy gate, React Flow visualization, replay, exports, and tests.',
    approach: 'Eight observable stages with labelled deterministic, heuristic, and optional model-assisted methods.',
    outcome: 'Implementation and test evidence are public; no live Replit deployment is claimed.',
    technologies: ['Python', 'FastAPI', 'React', 'SSE', 'PostgreSQL', 'pytest'],
    image: '/images/projects/ai-quality-lab-architecture.png',
    evidenceId: 'EV-QUALITY-LAB',
    repo: 'https://github.com/AsimAslah/AI-Quality-Lab',
    demo: null,
  },
  {
    slug: 'image-to-3d',
    rank: '05',
    title: 'Image-to-3D',
    status: 'Academic application integration',
    type: 'Model-powered application',
    problem: 'A single product image needs an accessible workflow for previewing and exporting a generated 3D asset.',
    contribution: 'Implemented and customized the application workflow around pretrained TripoSR, including inputs, preprocessing, previews, and mesh exports.',
    approach: 'Gradio and FastAPI interfaces around lazy model inference with OBJ and GLB outputs.',
    outcome: 'Verified sample meshes and screenshots are published with explicit upstream model attribution.',
    technologies: ['Python', 'PyTorch', 'TripoSR', 'FastAPI', 'Gradio', '3D export'],
    image: '/images/projects/image-to-3d-poster.webp',
    evidenceId: 'EV-IMAGE-3D',
    repo: 'https://github.com/AsimAslah/Image-to-3D',
    demo: null,
  },
  {
    slug: 'original-portfolio',
    rank: '06',
    title: 'Original Portfolio',
    status: 'Live',
    type: 'Full-stack portfolio',
    problem: 'Project work needed a cohesive, accessible presentation with evidence-rich case studies.',
    contribution: 'Built the responsive Next.js experience, project narratives, theme controls, scripted guide, feedback system, and deployment configuration.',
    approach: 'React and typed content with Cloudflare Workers and D1 in the original, separately operated repository.',
    outcome: 'A live public portfolio that ResumeBeyond evolves without altering its codebase or infrastructure.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Cloudflare Workers', 'D1'],
    image: '/images/asim-about.webp',
    evidenceId: 'EV-PORTFOLIO',
    repo: 'https://github.com/AsimAslah/asim-portfolio',
    demo: 'https://asim-portfolio.asimaslu7.workers.dev',
  },
] as const;

export const starterQuestions = [
  'Why is this candidate a good fit for a Machine Learning Engineer role?',
  'What are the candidate’s strongest AI projects?',
  'How does the candidate evaluate AI model reliability?',
  'What experience does the candidate have with privacy-aware AI?',
] as const;

