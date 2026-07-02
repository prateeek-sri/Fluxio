/**
 * testTechnologyDetector.js
 *
 * Comprehensive test script for the full Technology Detector pipeline.
 *
 * Tests:
 *   1. Phase One  — Languages, Runtimes, Package Managers, Ecosystems
 *   2. Phase Two  — Frameworks, ORMs, Databases
 *   3. Phase Three — Conflict Resolution, Technology Graph, Final Report
 *   4. Full Pipeline integration test
 *
 * Uses a SYNTHETIC repository (no real disk scan needed) so the tests
 * are fast, reproducible, and self-contained.
 *
 * Run:  node test/testTechnologyDetector.js
 */

import { createProjectIndex } from "../src/engine/scanner/projectIndex.js";
import { runTechnologyDetector } from "../src/engine/technology-detector/technologyDetector.js";

// ─────────────────────────────────────────────────────────────────────────────
// Synthetic Repository Builder
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds a minimal synthetic ProjectIndex that simulates a real scan.
 *
 * Synthetic repo contains:
 *   - A Node.js project using Express and Prisma with PostgreSQL
 *   - JavaScript and TypeScript source files with imports and function calls
 *   - A package.json listing all dependencies
 */
function buildSyntheticProjectIndex() {
  const rootPath = "/synthetic/repo";
  const projectIndex = createProjectIndex(rootPath);

  // ── Files ──────────────────────────────────────────────────────────────

  const files = [
    // package.json
    {
      id: "file-1",
      name: "package.json",
      path: "/synthetic/repo/package.json",
      relativePath: "package.json",
      extension: ".json",
      content: JSON.stringify({
        name: "synthetic-app",
        dependencies: {
          express: "^4.18.0",
          "@prisma/client": "^5.0.0",
          pg: "^8.0.0",
        },
        devDependencies: {
          prisma: "^5.0.0",
          nodemon: "^3.0.0",
        },
      }),
    },

    // app.js — Express usage
    {
      id: "file-2",
      name: "app.js",
      path: "/synthetic/repo/src/app.js",
      relativePath: "src/app.js",
      extension: ".js",
      content: `
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default app;
`.trim(),
    },

    // routes.js — more Express patterns
    {
      id: "file-3",
      name: "routes.js",
      path: "/synthetic/repo/src/routes.js",
      relativePath: "src/routes.js",
      extension: ".js",
      content: `
import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => res.send('OK'));
router.post('/data', (req, res) => res.json({ ok: true }));
router.use('/static', express.static('public'));

export default router;
`.trim(),
    },

    // schema.prisma — Prisma schema file
    {
      id: "file-4",
      name: "schema.prisma",
      path: "/synthetic/repo/prisma/schema.prisma",
      relativePath: "prisma/schema.prisma",
      extension: ".prisma",
      content: `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
`.trim(),
    },

    // index.ts — TypeScript file
    {
      id: "file-5",
      name: "index.ts",
      path: "/synthetic/repo/src/index.ts",
      relativePath: "src/index.ts",
      extension: ".ts",
      content: `
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.listen(4000);
`.trim(),
    },
  ];

  // ── Populate ProjectIndex ──────────────────────────────────────────────

  for (const file of files) {
    projectIndex.files.set(file.relativePath, file);
    projectIndex.idIndex.set(file.id, file);
  }

  // Important files index (used by dependencyIndexProvider)
  projectIndex.importantFiles.set("package.json", [files[0]]);
  projectIndex.importantFiles.set("schema.prisma", [files[3]]);

  projectIndex.metadata.totalFiles = files.length;
  projectIndex.metadata.scanStartedAt = new Date();
  projectIndex.metadata.scanCompletedAt = new Date();
  projectIndex.metadata.scanDurationMs = 1;

  return projectIndex;
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Runner
// ─────────────────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL: ${message}`);
    failed++;
    failures.push(message);
  }
}

function assertExists(value, message) {
  assert(value !== null && value !== undefined, message);
}

function assertEqual(actual, expected, message) {
  assert(
    actual === expected,
    `${message} (expected: ${expected}, got: ${actual})`,
  );
}

function assertGTE(actual, min, message) {
  assert(actual >= min, `${message} (expected >= ${min}, got: ${actual})`);
}

function assertMapHas(map, key, message) {
  assert(map instanceof Map && map.has(key), `${message} (key: ${key})`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Run Tests
// ─────────────────────────────────────────────────────────────────────────────

console.clear();

console.log("═══════════════════════════════════════════════════════════════");
console.log("      TECHNOLOGY DETECTOR — FULL PIPELINE TEST");
console.log("═══════════════════════════════════════════════════════════════\n");

// ── Build Synthetic Repository ──────────────────────────────────────────────

console.log("⟳  Building synthetic repository...");
const projectIndex = buildSyntheticProjectIndex();

console.log(`   Files      : ${projectIndex.files.size}`);
console.log(`   ID Index   : ${projectIndex.idIndex.size}`);
console.log(`   Imp. Files : ${projectIndex.importantFiles.size}\n`);

// ── Run Detector ─────────────────────────────────────────────────────────────

console.log("⟳  Running technology detector...\n");
const result = await runTechnologyDetector(projectIndex);

const { repository, technologyGraph, detectionReport, execution } = result;
const techs = repository.technologies;

// ─────────────────────────────────────────────────────────────────────────────
// Phase One Tests
// ─────────────────────────────────────────────────────────────────────────────

console.log("───────────────────────────────────────────────────────────────");
console.log("  PHASE ONE — Languages, Runtimes, Package Managers, Ecosystems");
console.log("───────────────────────────────────────────────────────────────\n");

// Languages
assertMapHas(
  techs.languages,
  "JavaScript",
  "JavaScript detected from .js files",
);

assertMapHas(
  techs.languages,
  "TypeScript",
  "TypeScript detected from .ts files",
);

// Ecosystems (inferred from runtimes)
// Note: language/runtime detection depends on scanner constants being
// populated. The synthetic test validates that Phase One completes and
// the ecosystem inference pipeline runs without error.
const phaseOneResult = execution.phases[0];
assert(phaseOneResult.phase === "phaseOne", "Phase One completed");
assertGTE(
  phaseOneResult.detectors.length,
  3,
  "Phase One ran at least 3 detectors",
);

const allPhaseOneSuccess = phaseOneResult.detectors.every(
  (d) => d.success,
);
assert(allPhaseOneSuccess, "All Phase One detectors succeeded");

// ─────────────────────────────────────────────────────────────────────────────
// Phase Two Tests
// ─────────────────────────────────────────────────────────────────────────────

console.log("\n───────────────────────────────────────────────────────────────");
console.log("  PHASE TWO — Frameworks, ORMs, Databases");
console.log("───────────────────────────────────────────────────────────────\n");

const phaseTwoResult = execution.phases[1];
assert(phaseTwoResult.phase === "phaseTwo", "Phase Two completed");

const allPhaseTwoSuccess = phaseTwoResult.detectors.every(
  (d) => d.success,
);
assert(allPhaseTwoSuccess, "All Phase Two detectors succeeded");

// Frameworks — Express must be detected
assertMapHas(
  techs.frameworks.backend,
  "Express",
  "Express framework detected",
);

if (techs.frameworks.backend.has("Express")) {
  const express = techs.frameworks.backend.get("Express");
  assertGTE(
    express.confidence,
    60,
    "Express confidence >= 60",
  );
  assertExists(
    express.evidence,
    "Express has evidence",
  );
  assertGTE(
    express.evidence.length,
    1,
    "Express has at least 1 evidence item",
  );

  // Check evidence types — at minimum dependency evidence expected
  const hasDepEvidence = express.evidence.some(
    (e) => e.type === "dependency",
  );
  assert(hasDepEvidence, "Express has dependency evidence");
}

// ORMs — Prisma must be detected via dependency
assertMapHas(
  techs.orms,
  "Prisma",
  "Prisma ORM detected",
);

if (techs.orms.has("Prisma")) {
  const prisma = techs.orms.get("Prisma");
  assertGTE(prisma.confidence, 60, "Prisma confidence >= 60");
}

// Databases — PostgreSQL must be detected via pg dependency
assertMapHas(
  techs.databases,
  "PostgreSQL",
  "PostgreSQL database detected via pg dependency",
);

// ─────────────────────────────────────────────────────────────────────────────
// Phase Three Tests
// ─────────────────────────────────────────────────────────────────────────────

console.log("\n───────────────────────────────────────────────────────────────");
console.log("  PHASE THREE — Conflicts, Technology Graph, Final Report");
console.log("───────────────────────────────────────────────────────────────\n");

const phaseThreeResult = execution.phases[2];
assert(phaseThreeResult.phase === "phaseThree", "Phase Three completed");

// Steps
assert(
  Array.isArray(phaseThreeResult.steps),
  "Phase Three has steps array",
);
assertGTE(
  phaseThreeResult.steps.length,
  3,
  "Phase Three ran at least 3 steps",
);

const allPhaseThreeSuccess = phaseThreeResult.steps.every(
  (s) => s.success,
);
assert(allPhaseThreeSuccess, "All Phase Three steps succeeded");

// Technology Graph
assertExists(technologyGraph, "Technology Graph exists");
assertExists(technologyGraph.nodes, "Graph has nodes");
assertExists(technologyGraph.edges, "Graph has edges");
assertExists(technologyGraph.roots, "Graph has roots");
assertGTE(
  technologyGraph.nodes.size,
  1,
  "Graph has at least 1 node",
);

if (technologyGraph.nodes.has("Express")) {
  const expressNode = technologyGraph.nodes.get("Express");
  assert(
    Array.isArray(expressNode.parents),
    "Express node has parents array",
  );
  assert(
    Array.isArray(expressNode.children),
    "Express node has children array",
  );
}

// Detection Report
assertExists(detectionReport, "Detection Report exists");
assertExists(detectionReport.summary, "Report has summary");
assertExists(detectionReport.graph, "Report has graph");
assertExists(detectionReport.ecosystems, "Report has ecosystems");
assertExists(detectionReport.conflicts, "Report has conflicts array");
assertGTE(
  detectionReport.summary.totalDetections,
  1,
  "Report summary shows >= 1 detection",
);

// Graph report
assert(
  Array.isArray(detectionReport.graph.nodes),
  "Graph report nodes is array",
);
assert(
  Array.isArray(detectionReport.graph.edges),
  "Graph report edges is array",
);

// ─────────────────────────────────────────────────────────────────────────────
// Conflict Resolution Tests
// ─────────────────────────────────────────────────────────────────────────────

console.log("\n───────────────────────────────────────────────────────────────");
console.log("  CONFLICT RESOLUTION — Express vs Fastify Conflict Test");
console.log("───────────────────────────────────────────────────────────────\n");

// Inject a fake Fastify detection with LOWER confidence than Express
// to test that the conflict resolver removes the lower-confidence one
const expressDetection = techs.frameworks.backend.get("Express");

if (expressDetection) {
  // Inject conflicting Fastify at lower confidence
  const fakeExpressConf = expressDetection.confidence;
  const fakeFastifyConf = Math.max(0, fakeExpressConf - 20);

  techs.frameworks.backend.set("Fastify", {
    name: "Fastify",
    confidence: fakeFastifyConf,
    evidence: [],
    metadata: {},
    warnings: [],
    statistics: { matchedRules: 1, totalRules: 1 },
  });

  assert(
    techs.frameworks.backend.has("Fastify"),
    "Injected Fastify at lower confidence for conflict test",
  );

  // Re-run Phase Three (only the conflict resolver is relevant)
  const { resolveConflicts } = await import(
    "../src/engine/technology-detector/helpers/resolveConflicts.js"
  );

  const context = {
    repository: {
      technologies: techs,
      metadata: projectIndex.metadata,
    },
  };

  const conflicts = resolveConflicts(context);

  // Express (higher confidence) should win
  assert(
    techs.frameworks.backend.has("Express"),
    "Express survived conflict resolution (higher confidence)",
  );

  assert(
    !techs.frameworks.backend.has("Fastify"),
    "Fastify removed by conflict resolver (lower confidence)",
  );

  assert(
    conflicts.length >= 1,
    "Conflict report contains at least 1 conflict",
  );

  if (conflicts.length >= 1) {
    assert(
      conflicts[0].winner === "Express",
      `Conflict winner is Express (got: ${conflicts[0].winner})`,
    );
    assert(
      conflicts[0].loser === "Fastify",
      `Conflict loser is Fastify (got: ${conflicts[0].loser})`,
    );
  }
} else {
  console.log(
    "  ⚠️  Skipping conflict test: Express not detected (ecosystem may not have matched).",
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Execution Summary
// ─────────────────────────────────────────────────────────────────────────────

console.log("\n───────────────────────────────────────────────────────────────");
console.log("  EXECUTION SUMMARY");
console.log("───────────────────────────────────────────────────────────────\n");

console.log(`Total Duration : ${execution.durationMs} ms\n`);

for (const phase of execution.phases) {
  console.log(`${phase.phase}`);

  if (phase.detectors) {
    for (const d of phase.detectors) {
      const status = d.success ? "SUCCESS" : "FAILED ";
      console.log(
        `  ${d.detector.padEnd(28)} ${status}  ${d.durationMs} ms`,
      );
      if (d.error) {
        console.log(`    ⚠️  ${d.error.message}`);
      }
    }
  }

  if (phase.steps) {
    for (const s of phase.steps) {
      const status = s.success ? "SUCCESS" : "FAILED ";
      console.log(
        `  ${s.step.padEnd(28)} ${status}  ${s.durationMs} ms`,
      );
      if (s.error) {
        console.log(`    ⚠️  ${s.error.message}`);
      }
    }
  }

  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
// Detected Technologies
// ─────────────────────────────────────────────────────────────────────────────

console.log("───────────────────────────────────────────────────────────────");
console.log("  DETECTED TECHNOLOGIES");
console.log("───────────────────────────────────────────────────────────────\n");

printDetections("Languages",       techs.languages);
printDetections("Runtimes",        techs.runtimes);
printDetections("Package Managers", techs.packageManagers);
printDetections("Ecosystems",      techs.ecosystems);
printDetections("Frameworks (BE)", techs.frameworks.backend);
printDetections("ORMs",            techs.orms);
printDetections("Databases",       techs.databases);

function printDetections(label, map) {
  if (!map || map.size === 0) {
    console.log(`${label}: (none)\n`);
    return;
  }
  console.log(`${label}:`);
  for (const [name, d] of map) {
    const conf = d.confidence !== undefined ? ` [${d.confidence}%]` : "";
    const evidCount = d.evidence?.length ?? "—";
    console.log(`  • ${name}${conf}  (${evidCount} evidence)`);
  }
  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
// Technology Graph
// ─────────────────────────────────────────────────────────────────────────────

if (technologyGraph && technologyGraph.nodes.size > 0) {
  console.log("───────────────────────────────────────────────────────────────");
  console.log("  TECHNOLOGY GRAPH");
  console.log("───────────────────────────────────────────────────────────────\n");

  console.log(`Roots: ${technologyGraph.roots.join(", ") || "(none)"}\n`);

  for (const [name, node] of technologyGraph.nodes) {
    const parents = node.parents.length > 0
      ? `requires: [${node.parents.join(", ")}]`
      : "";
    const children = node.children.length > 0
      ? `extended-by: [${node.children.join(", ")}]`
      : "";
    const links = [parents, children].filter(Boolean).join("  ");
    console.log(`  ${name.padEnd(20)} ${links}`);
  }
  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
// Errors / Warnings
// ─────────────────────────────────────────────────────────────────────────────

if (projectIndex.metadata.errors.length > 0) {
  console.log("───────────────────────────────────────────────────────────────");
  console.log("  ERRORS");
  console.log("───────────────────────────────────────────────────────────────\n");
  console.dir(projectIndex.metadata.errors, { depth: null });
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Results
// ─────────────────────────────────────────────────────────────────────────────

console.log("═══════════════════════════════════════════════════════════════");
console.log("  TEST RESULTS");
console.log("═══════════════════════════════════════════════════════════════\n");

console.log(`  Passed : ${passed}`);
console.log(`  Failed : ${failed}`);
console.log();

if (failures.length > 0) {
  console.log("Failed assertions:");
  for (const f of failures) {
    console.log(`  ❌ ${f}`);
  }
  console.log();
}

if (failed === 0) {
  console.log("  ✅ ALL TESTS PASSED\n");
} else {
  console.log("  ❌ SOME TESTS FAILED\n");
  process.exit(1);
}
