from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Asim_Aslah_Public_Resume.pdf"

INK = colors.HexColor("#15181C")
MUTED = colors.HexColor("#58616B")
ACCENT = colors.HexColor("#2452D6")
PALE = colors.HexColor("#EEF2FF")
LINE = colors.HexColor("#CFD4DB")


def find_font(candidates: list[Path]) -> Path | None:
    return next((path for path in candidates if path.exists()), None)


regular_font = find_font([
    Path("C:/Windows/Fonts/aptos.ttf"),
    Path("C:/Windows/Fonts/arial.ttf"),
])
bold_font = find_font([
    Path("C:/Windows/Fonts/aptos-bold.ttf"),
    Path("C:/Windows/Fonts/arialbd.ttf"),
])

if regular_font and bold_font:
    pdfmetrics.registerFont(TTFont("ResumeSans", str(regular_font)))
    pdfmetrics.registerFont(TTFont("ResumeSans-Bold", str(bold_font)))
    FONT = "ResumeSans"
    FONT_BOLD = "ResumeSans-Bold"
else:
    FONT = "Helvetica"
    FONT_BOLD = "Helvetica-Bold"

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    fontName=FONT_BOLD,
    fontSize=24,
    leading=26,
    textColor=INK,
    spaceAfter=2,
)
role_style = ParagraphStyle(
    "Role",
    fontName=FONT,
    fontSize=10.6,
    leading=13,
    textColor=ACCENT,
)
link_style = ParagraphStyle(
    "Links",
    fontName=FONT,
    fontSize=8.2,
    leading=11,
    alignment=TA_RIGHT,
    textColor=MUTED,
)
section_style = ParagraphStyle(
    "Section",
    fontName=FONT_BOLD,
    fontSize=8.2,
    leading=10,
    textColor=ACCENT,
    uppercase=True,
    spaceBefore=5,
    spaceAfter=3,
)
body_style = ParagraphStyle(
    "Body",
    fontName=FONT,
    fontSize=8.4,
    leading=11,
    textColor=INK,
)
muted_style = ParagraphStyle(
    "Muted",
    fontName=FONT,
    fontSize=7.7,
    leading=10,
    textColor=MUTED,
)
item_title_style = ParagraphStyle(
    "ItemTitle",
    fontName=FONT_BOLD,
    fontSize=9,
    leading=11,
    textColor=INK,
)
item_meta_style = ParagraphStyle(
    "ItemMeta",
    fontName=FONT,
    fontSize=7.6,
    leading=9,
    textColor=ACCENT,
    alignment=TA_RIGHT,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=9,
    firstLineIndent=-6,
    bulletIndent=0,
    spaceAfter=1.5,
)
small_style = ParagraphStyle(
    "Small",
    fontName=FONT,
    fontSize=7.3,
    leading=9.2,
    textColor=INK,
)


def section(title: str):
    return [Spacer(1, 2), Paragraph(title.upper(), section_style), HRFlowable(width="100%", thickness=0.6, color=LINE, spaceAfter=4)]


def bullet(text: str):
    return Paragraph(f"<bullet>&bull;</bullet>{text}", bullet_style)


def item_header(title: str, meta: str):
    return Table(
        [[Paragraph(title, item_title_style), Paragraph(meta, item_meta_style)]],
        colWidths=[4.4 * inch, 2.6 * inch],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ]),
    )


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setTitle("Asim Aslah - Machine Learning Engineer Resume")
    canvas.setAuthor("Asim Aslah P M")
    canvas.setSubject("Privacy-safe public resume for Machine Learning Engineer - LLM Applications and Evaluation")
    canvas.setKeywords("Machine Learning, LLM Evaluation, RAG, Privacy, FastAPI, Python, TypeScript")
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, 0.39 * inch, letter[0] - doc.rightMargin, 0.39 * inch)
    canvas.setFont(FONT, 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.24 * inch, "ResumeBeyond | Verified public profile | No private contact details")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.24 * inch, "Updated 2026-11-14")
    canvas.restoreState()


story = []

header = Table(
    [[
        [Paragraph("ASIM ASLAH P M", name_style), Paragraph("Machine Learning Engineer - LLM Applications &amp; Evaluation", role_style)],
        Paragraph(
            '<link href="https://www.linkedin.com/in/asim-aslah-pm-05906a222" color="#2452D6">LinkedIn</link> &nbsp;|&nbsp; '
            '<link href="https://github.com/AsimAslah" color="#2452D6">GitHub</link> &nbsp;|&nbsp; '
            '<link href="https://github.com/AsimAslah/ResumeBeyond" color="#2452D6">ResumeBeyond</link>',
            link_style,
        ),
    ]],
    colWidths=[4.7 * inch, 2.3 * inch],
    style=TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]),
)
story.extend([header, HRFlowable(width="100%", thickness=2, color=ACCENT, spaceAfter=7)])

story.append(Paragraph(
    "Building intelligent, reliable, and privacy-aware AI systems. I design inspectable evaluation workflows, privacy-conscious AI applications, Python services, and accessible React interfaces. My claims are grounded in public repositories, release evidence, and clearly labelled ongoing research.",
    body_style,
))

story.extend(section("Core capabilities"))
capability_data = [
    [Paragraph("01  END-TO-END AI ENGINEERING", section_style), Paragraph("02  AI EVALUATION &amp; RELIABILITY", section_style), Paragraph("03  PRIVACY-AWARE AI", section_style)],
    [
        Paragraph("Model integration, FastAPI services, React/TypeScript interfaces, tests, and deployment runbooks.", small_style),
        Paragraph("Pairwise comparison, weighted rubrics, evidence-backed preference, observable execution, and failure fallback.", small_style),
        Paragraph("Local-first masking, privacy-gated model access, data minimization, and PII distribution-shift research.", small_style),
    ],
]
story.append(Table(capability_data, colWidths=[2.33 * inch] * 3, style=TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PALE),
    ("BOX", (0, 0), (-1, -1), 0.5, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
])))

story.extend(section("Selected engineering work"))

story.append(KeepTogether([
    item_header("EvalLens - AI Response Evaluation Platform", "Released v1.0.0 | Independent product"),
    bullet("Designed and implemented pairwise AI-response evaluation with custom weighted rubrics, independent scoring, evidence fields, explicit A/B/tie preference, and reproducible rubric snapshots."),
    bullet("Built the full-stack TypeScript application, protected APIs, D1 persistence, analytics, exports, unit/browser tests, CI, release documentation, and public deployment."),
    Paragraph("Evidence: github.com/AsimAslah/evallens | Live: evallens.asimaslu7.workers.dev", muted_style),
]))
story.append(Spacer(1, 4))

story.append(KeepTogether([
    item_header("DataVeil - Local-First Privacy Middleware", "Working prototype | Privacy application"),
    bullet("Combined document and image protection in one FastAPI application using local Presidio/spaCy detection, image-region masking, bounded in-memory processing, and user-held recovery material."),
    bullet("Repository states that the workflow uses no cloud API, database, analytics service, or server-side upload history."),
    Paragraph("Evidence: github.com/AsimAslah/Dataveil", muted_style),
]))
story.append(Spacer(1, 4))

story.append(KeepTogether([
    item_header("AI Quality Lab - Explainable Evaluation Workspace", "Implementation complete | Deployment pending"),
    bullet("Built a FastAPI and React evaluation pipeline with eight persisted stages, SSE recovery, privacy-gated optional model calls, deterministic fallback, replay, exports, and tests."),
    bullet("Methods are explicitly labelled deterministic, heuristic, or model-assisted; no live Replit deployment is claimed."),
    Paragraph("Evidence: github.com/AsimAslah/AI-Quality-Lab", muted_style),
]))

story.extend(section("Experience & research"))
story.append(KeepTogether([
    item_header("Software Development Intern - Realviz LLP (Brickrat)", "Jun 2026 - Jul 2026"),
    bullet("Contributed to the application workflow around pretrained TripoSR: image upload, preprocessing, inference integration, interactive preview, and OBJ/GLB export. Upstream model ownership is explicitly attributed."),
]))
story.append(Spacer(1, 3))
story.append(KeepTogether([
    item_header("PIIShift-RAG", "Ongoing M.Tech research"),
    bullet("Researching privacy-risk routing for retrieval-augmented generation under PII distribution shift, with a framing around detection, risk estimation, conformal calibration, and policy-aware routing. Implementation and empirical results are not claimed as complete."),
]))

story.extend(section("Education"))
education = Table([
    [Paragraph("M.Tech, Artificial Intelligence &amp; Data Science", item_title_style), Paragraph("Government Engineering College Palakkad | 2025 - 2027", muted_style)],
    [Paragraph("B.Tech, Computer Science &amp; Engineering", item_title_style), Paragraph("MES College of Engineering | 2020 - 2024", muted_style)],
], colWidths=[3.2 * inch, 3.8 * inch], style=TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 1),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
])); story.append(education)

story.extend(section("Technical toolkit"))
story.append(Paragraph(
    "<b>AI and backend:</b> Python, FastAPI, PyTorch integration, RAG, REST APIs, SSE, SQL &nbsp;&nbsp; "
    "<b>Evaluation:</b> rubric design, pairwise review, evidence-based preference, groundedness, failure analysis<br/>"
    "<b>Privacy:</b> PII detection, local masking, privacy gates, data minimization, output filtering &nbsp;&nbsp; "
    "<b>Product and quality:</b> React, TypeScript, Vite, Next.js, pytest, Vitest, Playwright, CI, accessibility",
    small_style,
))

doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=letter,
    rightMargin=0.55 * inch,
    leftMargin=0.55 * inch,
    topMargin=0.43 * inch,
    bottomMargin=0.5 * inch,
    title="Asim Aslah - Machine Learning Engineer Resume",
    author="Asim Aslah P M",
    subject="Privacy-safe public resume",
)
doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
print(f"Created {OUTPUT}")

