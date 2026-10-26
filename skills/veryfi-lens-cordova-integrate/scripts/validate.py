#!/usr/bin/env python3
"""Validate that this skill folder is internally linked and standalone."""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "install.md",
    "syntax.md",
    "platforms.md",
    "implementation.md",
    "recipes.md",
    "settings-groups.md",
    "settings-catalog.md",
    "conflicts.md",
    "clarifications.md",
    "troubleshooting.md",
    "parity.md",
    "unbridged.md",
    "sources.md",
    "templates/full.md",
    "templates/receipts.md",
    "templates/long-receipts.md",
    "templates/checks.md",
    "templates/credit-cards.md",
    "templates/business-cards.md",
    "templates/barcodes.md",
    "templates/ocr-code-strips.md",
    "templates/ocr-code-caps.md",
    "templates/w2.md",
    "templates/w9.md",
    "templates/any-documents.md",
]

LINK = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
errors = []

for name in REQUIRED:
    if not (ROOT / name).is_file():
        errors.append(f"missing {name}")

skill = (ROOT / "SKILL.md").read_text()
if not skill.startswith("---\n"):
    errors.append("SKILL.md missing frontmatter")
if "name: veryfi-lens-cordova-integrate" not in skill.split("---", 2)[1]:
    errors.append("unexpected skill name")
body_lines = skill.split("---", 2)[2].count("\n")
if body_lines > 500:
    errors.append(f"SKILL.md body has {body_lines} lines")

for path in ROOT.rglob("*.md"):
    text = path.read_text()
    for match in LINK.finditer(text):
        target = match.group(1).strip()
        if target.startswith("http://") or target.startswith("https://") or target.startswith("mailto:"):
            continue
        if "#" in target:
            target = target.split("#", 1)[0]
        if not target:
            continue
        if target.startswith("/"):
            errors.append(f"{path.relative_to(ROOT)}: absolute link {target}")
            continue
        resolved = (path.parent / target).resolve()
        root = ROOT.resolve()
        if resolved != root and root not in resolved.parents:
            errors.append(f"{path.relative_to(ROOT)}: link leaves folder {target}")
        elif not resolved.exists():
            errors.append(f"{path.relative_to(ROOT)}: broken link {target}")

markers = {
    "Headless": "unsupported",
    "Lite": "unsupported",
    "Remote Models": "planned",
    "imageSource": None,
}
# Cordova-specific facts that must appear somewhere in the folder.
needles = [
    "launchCallbackID",
    "veryfi_lens_success",
    "getFileBase64",
    "credit_card",
    "backupDocsToGallery",
    "VeryfiInfoView",
    "clearLensStorage",
    "5d197c585c50389bbf830b48352825c31f776919",
    "sdk_binary_sizes",
]
blob = "\n".join(p.read_text() for p in ROOT.rglob("*.md"))
for needle in needles:
    if needle not in blob:
        errors.append(f"missing required text: {needle}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"OK {ROOT.name}: {len(list(ROOT.rglob('*.md')))} markdown files")
