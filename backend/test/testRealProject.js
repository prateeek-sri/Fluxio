/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  testRealProject.js
 *
 *  Full Technology Detector test against a REAL project on disk.
 *
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │  HOW TO USE                                                 │
 *  │                                                             │
 *  │  1. Set ROOT_PATH below to any project folder on your disk  │
 *  │  2. Run:  node test/testRealProject.js                      │
 *  └─────────────────────────────────────────────────────────────┘
 *
 *  What this prints:
 *    • Scanner report   — files, folders, scan time
 *    • Phase One        — languages, runtimes, package managers, ecosystems
 *    • Phase Two        — frameworks, ORMs, databases
 *                         with confidence score + every piece of evidence
 *                         including the exact file where it was found
 *    • Phase Three      — technology graph, conflicts, final report
 *    • Execution timing — per-detector duration
 *    • Errors/Warnings  — every problem that occurred
 *
 *  Run:  node test/testRealProject.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { indexRepository } from "../src/engine/scanner/repositoryIndexer.js";
import { runTechnologyDetector } from "../src/engine/technology-detector/technologyDetector.js";

// ─────────────────────────────────────────────────────────────────────────────
//  ★  SET YOUR PROJECT PATH HERE
//
//  Change this to any project on your machine.
//  Examples:
//    "C:\\Users\\panka\\OneDrive\\Desktop\\New folder"
//    "X:\\Web Development\\MERN\\Backend\\Post Project"
//    "C:\\Users\\panka\\projects\\my-django-app"
// ─────────────────────────────────────────────────────────────────────────────

const ROOT_PATH = "X:\\Web Development\\Spring Boot\\AnujJPA";

const W = 72; // total line width

function line(char = "─") {
  return char.repeat(W);
}

function header(title, char = "═") {
  const pad = Math.max(0, W - title.length - 4);
  const left = Math.floor(pad / 2);
  const right = pad - left;
  return `${char.repeat(left)}  ${title}  ${char.repeat(right)}`;
}

function subheader(title) {
  return `  ┌─  ${title}`;
}

function row(label, value, indent = "  ") {
  const labelStr = `${indent}${label}`.padEnd(28);
  return `${labelStr}${value}`;
}

function confidenceBar(score, width = 20) {
  const filled = Math.round((score / 100) * width);
  const bar = "█".repeat(filled) + "░".repeat(width - filled);
  return `[${bar}] ${String(score).padStart(3)}%`;
}

function evidenceTypeIcon(type) {
  const icons = {
    dependency:   "📦",
    import:       "📥",
    functionCall: "🔧",
    memberCall:   "🔗",
    file:         "📄",
    extension:    "🔤",
    language:     "🌐",
    annotation:   "🏷️",
    configuration:"⚙️",
  };
  return icons[type] ?? "•";
}

function printEvidence(evidenceList, idIndex, maxItems = 999) {
  if (!evidenceList || evidenceList.length === 0) {
    console.log("    (no evidence)");
    return;
  }

  const shown = evidenceList.slice(0, maxItems);

  for (const ev of shown) {
    const icon = evidenceTypeIcon(ev.type);
    console.log(`    ${icon} [${ev.type}]  ${ev.value ?? ""}`);

    // Metadata
    if (ev.metadata && Object.keys(ev.metadata).length > 0) {
      for (const [k, v] of Object.entries(ev.metadata)) {
        if (v === null || v === undefined || v === "") continue;
        console.log(`       ${k}: ${v}`);
      }
    }

    // Files where this evidence was found
    if (ev.fileIds && ev.fileIds.length > 0) {
      console.log("       Found in:");
      for (const fid of ev.fileIds) {
        const file = idIndex?.get(fid);
        if (file) {
          console.log(`         • ${file.relativePath}`);
        }
      }
    }
  }

  if (evidenceList.length > maxItems) {
    console.log(
      `    … and ${evidenceList.length - maxItems} more evidence items`,
    );
  }
}

function printDetectionCard(detection, idIndex, indent = "") {
  const bar = confidenceBar(detection.confidence ?? 0);
  console.log(`${indent}  Name       : ${detection.name}`);
  console.log(`${indent}  Confidence : ${bar}`);

  const evidCount = detection.evidence?.length ?? 0;
  const matchedRules = detection.statistics?.matchedRules ?? "—";
  const totalRules = detection.statistics?.totalRules ?? "—";

  console.log(
    `${indent}  Rules      : ${matchedRules} / ${totalRules} matched`,
  );
  console.log(`${indent}  Evidence   : ${evidCount} item(s)`);

  if (detection.warnings?.length > 0) {
    console.log(
      `${indent}  Warnings   : ${detection.warnings.join("; ")}`,
    );
  }

  if (evidCount > 0) {
    console.log(`${indent}  Evidence Detail:`);
    printEvidence(detection.evidence, idIndex);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────────────────────

console.clear();

console.log(header("REPOSITORY ANALYSIS ENGINE", "═"));
console.log(header("Technology Detector — Real Project Test", " "));
console.log(line("═"));
console.log();
console.log(row("Project Path", ROOT_PATH));
console.log(row("Started At  ", new Date().toLocaleTimeString()));
console.log();

// ─── Step 1: Scan ────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("STEP 1 — SCANNER"));
console.log(line("─"));
console.log();
console.log("  Scanning repository...");
console.log();

const scanStart = Date.now();
const projectIndex = await indexRepository(ROOT_PATH);
const scanMs = Date.now() - scanStart;

console.log(row("  Root Path     ", projectIndex.metadata.rootPath));
console.log(row("  Total Files   ", projectIndex.files.size));
console.log(row("  Total Folders ", projectIndex.folders.size));
console.log(row("  ID Index      ", projectIndex.idIndex.size));
console.log(row("  Important Files", projectIndex.importantFiles.size));
console.log(row("  Scan Duration ", `${projectIndex.metadata.scanDurationMs} ms`));
console.log(row("  Warnings      ", projectIndex.metadata.warnings.length));
console.log(row("  Errors        ", projectIndex.metadata.errors.length));

// List important files found
if (projectIndex.importantFiles.size > 0) {
  console.log();
  console.log("  Important Files Found:");
  for (const [name, files] of projectIndex.importantFiles) {
    for (const f of files) {
      console.log(`    • ${f.relativePath ?? name}`);
    }
  }
}

// ─── Step 2: Detect ──────────────────────────────────────────────────────────

console.log();
console.log(line("─"));
console.log(subheader("STEP 2 — TECHNOLOGY DETECTOR"));
console.log(line("─"));
console.log();
console.log("  Running detector pipeline...");
console.log();

const detectorStart = Date.now();
const result = await runTechnologyDetector(projectIndex);
const detectorMs = Date.now() - detectorStart;

const { repository, technologyGraph, detectionReport, execution } = result;
const techs = repository.technologies;
const idIndex = projectIndex.idIndex;

// ─────────────────────────────────────────────────────────────────────────────
//  PHASE ONE
// ─────────────────────────────────────────────────────────────────────────────

console.log();
console.log(line("═"));
console.log(header("PHASE ONE — Facts", "─"));
console.log(line("═"));
console.log();
console.log("  Phase One answers: 'What can we observe directly?'");
console.log("  These are facts — not guesses.");
console.log();

// ── Languages ─────────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("LANGUAGES"));
console.log(line("─"));
console.log();

if (techs.languages.size === 0) {
  console.log("  No languages detected.");
} else {
  for (const lang of techs.languages.values()) {
    const bar = confidenceBar(lang.confidence ?? 0);
    console.log(`  ${lang.name}`);
    console.log(`    Confidence : ${bar}`);
    printEvidence(lang.evidence, idIndex);
    console.log();
  }
}

// ── Runtimes ──────────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("RUNTIMES"));
console.log(line("─"));
console.log();

if (techs.runtimes.size === 0) {
  console.log("  No runtimes detected.");
} else {
  for (const runtime of techs.runtimes.values()) {
    const bar = confidenceBar(runtime.confidence ?? 0);
    console.log(`  ${runtime.name}`);
    console.log(`    Confidence : ${bar}`);
    if (runtime.metadata?.languages?.length) {
      console.log(`    Languages  : ${runtime.metadata.languages.join(", ")}`);
    }
    printEvidence(runtime.evidence, idIndex);
    console.log();
  }
}

// ── Package Managers ──────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("PACKAGE MANAGERS"));
console.log(line("─"));
console.log();

if (techs.packageManagers.size === 0) {
  console.log("  No package managers detected.");
} else {
  for (const pm of techs.packageManagers.values()) {
    const bar = confidenceBar(pm.confidence ?? 0);
    console.log(`  ${pm.name}`);
    console.log(`    Confidence : ${bar}`);
    printEvidence(pm.evidence, idIndex);
    console.log();
  }
}

// ── Ecosystems ────────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("ECOSYSTEMS  (inferred from runtimes)"));
console.log(line("─"));
console.log();

if (techs.ecosystems.size === 0) {
  console.log("  No ecosystems inferred.");
} else {
  for (const [name, eco] of techs.ecosystems) {
    console.log(`  ✦ ${name}`);
    if (eco.runtime) {
      console.log(`    Runtime : ${eco.runtime}`);
    }
  }
  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
//  PHASE TWO
// ─────────────────────────────────────────────────────────────────────────────

console.log();
console.log(line("═"));
console.log(header("PHASE TWO — Technology Detection", "─"));
console.log(line("═"));
console.log();
console.log("  Phase Two answers: 'Given those facts, what technologies exist?'");
console.log("  Each detection shows confidence, rules matched, and every evidence.");
console.log();

// ── Frameworks ────────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("FRAMEWORKS"));
console.log(line("─"));
console.log();

const allFrameworks = [
  ...techs.frameworks.backend.values(),
  ...techs.frameworks.frontend.values(),
];

if (allFrameworks.length === 0) {
  console.log("  No frameworks detected.");
  console.log();
} else {
  for (const fw of allFrameworks) {
    console.log(`  ┌── ${fw.name} ─${"─".repeat(Math.max(0, 40 - fw.name.length))}`);
    printDetectionCard(fw, idIndex, "  ");
    console.log(`  └${"─".repeat(W - 4)}`);
    console.log();
  }
}

// ── ORMs ──────────────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("ORMs / ODMs"));
console.log(line("─"));
console.log();

if (techs.orms.size === 0) {
  console.log("  No ORMs detected.");
  console.log();
} else {
  for (const orm of techs.orms.values()) {
    console.log(`  ┌── ${orm.name} ─${"─".repeat(Math.max(0, 40 - orm.name.length))}`);
    printDetectionCard(orm, idIndex, "  ");
    console.log(`  └${"─".repeat(W - 4)}`);
    console.log();
  }
}

// ── Databases ─────────────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("DATABASES"));
console.log(line("─"));
console.log();

if (techs.databases.size === 0) {
  console.log("  No databases detected.");
  console.log();
} else {
  for (const db of techs.databases.values()) {
    console.log(`  ┌── ${db.name} ─${"─".repeat(Math.max(0, 40 - db.name.length))}`);
    printDetectionCard(db, idIndex, "  ");
    console.log(`  └${"─".repeat(W - 4)}`);
    console.log();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  PHASE THREE
// ─────────────────────────────────────────────────────────────────────────────

console.log();
console.log(line("═"));
console.log(header("PHASE THREE — Relationships & Graph", "─"));
console.log(line("═"));
console.log();
console.log("  Phase Three answers: 'How do these technologies relate?'");
console.log("  It resolves conflicts, builds the technology graph, and");
console.log("  generates the final serialisable report.");
console.log();

// ── Conflict Resolution ───────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("CONFLICT RESOLUTION"));
console.log(line("─"));
console.log();

const conflicts = detectionReport?.conflicts ?? [];

if (conflicts.length === 0) {
  console.log("  ✅ No conflicts detected.");
} else {
  for (const conflict of conflicts) {
    console.log(`  ⚔  ${conflict.source}  vs  ${conflict.target}`);
    console.log(
      `     Winner  : ${conflict.winner}  (${conflict.winnerConfidence}%)`,
    );
    console.log(
      `     Removed : ${conflict.loser}   (${conflict.loserConfidence}%)`,
    );
    console.log(`     Why     : ${conflict.resolution}`);
    if (conflict.note) {
      console.log(`     Note    : ${conflict.note}`);
    }
  }
}
console.log();

// ── Technology Graph ──────────────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("TECHNOLOGY GRAPH"));
console.log(line("─"));
console.log();

if (!technologyGraph || technologyGraph.nodes.size === 0) {
  console.log("  No technology graph built.");
} else {
  const graphReport = detectionReport?.graph;

  console.log(
    `  Nodes : ${technologyGraph.nodes.size}  |  Edges : ${technologyGraph.edges.length}`,
  );
  console.log(
    `  Roots : ${technologyGraph.roots.join(", ") || "(none)"}`,
  );
  console.log();

  // Print tree starting from roots
  function printTreeNode(name, depth, visited = new Set()) {
    if (visited.has(name)) return;
    visited.add(name);

    const node = technologyGraph.nodes.get(name);
    if (!node) return;

    const indent = "  " + "  ".repeat(depth);
    const conf = node.confidence !== undefined
      ? `  [${node.confidence}%]`
      : "";
    const category = node.category ? `  <${node.category}>` : "";

    console.log(`${indent}${depth === 0 ? "◈" : "└─"} ${name}${conf}${category}`);

    for (const child of node.children ?? []) {
      printTreeNode(child, depth + 1, visited);
    }
  }

  for (const root of technologyGraph.roots) {
    printTreeNode(root, 0);
    console.log();
  }

  // Print all edges
  if (technologyGraph.edges.length > 0) {
    console.log("  Edges:");
    for (const edge of technologyGraph.edges) {
      const note = edge.note ? `  — ${edge.note}` : "";
      console.log(
        `    ${edge.source.padEnd(18)} ─[${edge.type}]→  ${edge.target}${note}`,
      );
    }
  }
}
console.log();

// ── Detection Report Summary ──────────────────────────────────────────────────

console.log(line("─"));
console.log(subheader("DETECTION REPORT SUMMARY"));
console.log(line("─"));
console.log();

if (detectionReport) {
  const s = detectionReport.summary;
  console.log(row("  Total Detections", s.totalDetections));
  console.log(row("  Ecosystems Found", s.ecosystems.join(", ") || "(none)"));

  if (Object.keys(detectionReport.ecosystems).length > 0) {
    console.log();
    console.log("  By Ecosystem:");
    for (const [eco, report] of Object.entries(detectionReport.ecosystems)) {
      console.log(`    ┌─ ${eco}`);

      const sections = [
        ["Frameworks",      report.frameworks],
        ["ORMs",            report.orms],
        ["Databases",       report.databases],
        ["Build Tools",     report.buildTools],
        ["Pkg Managers",    report.packageManagers],
        ["Runtimes",        report.runtimes],
        ["Languages",       report.languages],
      ];

      for (const [label, items] of sections) {
        if (items && items.length > 0) {
          const names = items
            .map((t) => `${t.name} (${t.confidence}%)`)
            .join(", ");
          console.log(`    │  ${label.padEnd(14)}: ${names}`);
        }
      }

      console.log("    └" + "─".repeat(W - 6));
    }
  }
} else {
  console.log("  Detection report not generated.");
}
console.log();

// ─────────────────────────────────────────────────────────────────────────────
//  EXECUTION TIMING
// ─────────────────────────────────────────────────────────────────────────────

console.log();
console.log(line("═"));
console.log(header("EXECUTION TIMING", "─"));
console.log(line("═"));
console.log();

console.log(row("  Scanner Duration  ", `${projectIndex.metadata.scanDurationMs} ms`));
console.log(row("  Detector Duration ", `${execution.durationMs} ms`));
console.log(row("  Total Duration    ", `${scanMs + detectorMs} ms`));
console.log();

for (const phase of execution.phases) {
  const phaseMs = phase.durationMs;
  console.log(`  ${phase.phase}  (${phaseMs} ms)`);

  // Detectors (Phase One, Two)
  if (phase.detectors) {
    for (const d of phase.detectors) {
      const status = d.success ? "✅ SUCCESS" : "❌ FAILED ";
      const timeBar = "▪".repeat(
        Math.min(20, Math.ceil((d.durationMs / (phaseMs || 1)) * 20)),
      );
      console.log(
        `    ${d.detector.padEnd(30)} ${status}   ${String(d.durationMs).padStart(4)} ms  ${timeBar}`,
      );
      if (d.error) {
        console.log(`       ⚠  ${d.error.message}`);
      }
    }
  }

  // Steps (Phase Three)
  if (phase.steps) {
    for (const s of phase.steps) {
      const status = s.success ? "✅ SUCCESS" : "❌ FAILED ";
      console.log(
        `    ${s.step.padEnd(30)} ${status}   ${String(s.durationMs).padStart(4)} ms`,
      );
      if (s.nodesBuilt !== undefined) {
        console.log(
          `       → nodes: ${s.nodesBuilt}   edges: ${s.edgesBuilt ?? 0}`,
        );
      }
      if (s.conflictsFound !== undefined) {
        console.log(`       → conflicts found: ${s.conflictsFound}`);
      }
      if (s.error) {
        console.log(`       ⚠  ${s.error.message}`);
      }
    }
  }

  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
//  ERRORS & WARNINGS
// ─────────────────────────────────────────────────────────────────────────────

const errors   = projectIndex.metadata.errors ?? [];
const warnings = projectIndex.metadata.warnings ?? [];

console.log(line("═"));
console.log(header("ERRORS & WARNINGS", "─"));
console.log(line("═"));
console.log();

if (errors.length === 0 && warnings.length === 0) {
  console.log("  ✅ No errors or warnings.");
} else {
  if (errors.length > 0) {
    console.log(`  ❌ ERRORS (${errors.length}):`);
    for (const err of errors) {
      console.log(`    [${err.stage ?? "?"}] ${err.name}: ${err.message}`);
    }
    console.log();
  }

  if (warnings.length > 0) {
    console.log(`  ⚠️  WARNINGS (${warnings.length}):`);
    for (const w of warnings) {
      const msg = w.message ?? JSON.stringify(w);
      console.log(`    [${w.stage ?? "?"}] ${msg}`);
    }
  }
}
console.log();

// ─────────────────────────────────────────────────────────────────────────────
//  FINAL SUMMARY BOX
// ─────────────────────────────────────────────────────────────────────────────

console.log(line("═"));
console.log(header("DETECTION COMPLETE", "═"));
console.log(line("═"));
console.log();

const totalTechs =
  techs.languages.size +
  techs.runtimes.size +
  techs.packageManagers.size +
  techs.frameworks.backend.size +
  techs.frameworks.frontend.size +
  techs.orms.size +
  techs.databases.size;

console.log(row("  Repository       ", projectIndex.metadata.rootPath));
console.log(row("  Files Scanned    ", projectIndex.files.size));
console.log(row("  Total Detections ", totalTechs));
console.log();
console.log("  Technology Breakdown:");

const breakdown = [
  ["Languages",       techs.languages],
  ["Runtimes",        techs.runtimes],
  ["Package Managers",techs.packageManagers],
  ["Ecosystems",      techs.ecosystems],
  ["Frameworks (BE)", techs.frameworks.backend],
  ["Frameworks (FE)", techs.frameworks.frontend],
  ["ORMs",            techs.orms],
  ["Databases",       techs.databases],
];

for (const [label, map] of breakdown) {
  if (map.size === 0) continue;
  const names = [...map.keys()].join(", ");
  console.log(`    ${label.padEnd(18)}: ${names}`);
}

console.log();
console.log(line("═"));
console.log();
console.log();
console.log(line("═"));
console.log(header("RAW INTERNAL STRUCTURES", "═"));
console.log(line("═"));
console.log();

function convertMap(value) {
  if (value instanceof Map) {
    return Object.fromEntries(
      [...value.entries()].map(([k, v]) => [
        k,
        convertMap(v),
      ]),
    );
  }

  if (Array.isArray(value)) {
    return value.map(convertMap);
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const result = {};

    for (const [k, v] of Object.entries(value)) {
      result[k] = convertMap(v);
    }

    return result;
  }

  return value;
}

console.log("PROJECT INDEX");
console.log();

console.dir(
  {
    files: projectIndex.files.size,
    folders: projectIndex.folders.size,

    importantFiles: convertMap(
      projectIndex.importantFiles,
    ),

    metadata: projectIndex.metadata,
  },
  {
    depth: null,
    colors: true,
  },
);

console.log();
console.log(line("─"));
console.log();

console.log("REPOSITORY");
console.log();

console.dir(
  convertMap(repository),
  {
    depth: null,
    colors: true,
  },
);

console.log();
console.log(line("─"));
console.log();

console.log("TECHNOLOGY GRAPH");
console.log();

console.dir(
  convertMap(technologyGraph),
  {
    depth: null,
    colors: true,
  },
);

console.log();
console.log(line("─"));
console.log();

console.log("DETECTION REPORT");
console.log();

console.dir(
  detectionReport,
  {
    depth: null,
    colors: true,
  },
);

console.log();
console.log(line("─"));
console.log();

console.log("EXECUTION");
console.log();

console.dir(
  execution,
  {
    depth: null,
    colors: true,
  },
);

console.log();
console.log(line("─"));
console.log();

console.log("FULL RESULT");
console.log();

console.dir(
  convertMap(result),
  {
    depth: null,
    colors: true,
  },
);

console.log();
console.log(projectIndex.technologies);