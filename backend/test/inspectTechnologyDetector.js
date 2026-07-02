/**
 * ─────────────────────────────────────────────────────────────────────────────
 * testRealProject.js
 *
 * Full Pipeline Deep-Dump Tester against a REAL project on disk.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  HOW TO USE                                                 │
 * │                                                             │
 * │  1. Set ROOT_PATH below to any project folder on your disk  │
 * │  2. Run:  node test/testRealProject.js                      │
 * └─────────────────────────────────────────────────────────────┘
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { indexRepository } from "../src/engine/scanner/repositoryIndexer.js";
import { runTechnologyDetector } from "../src/engine/technology-detector/technologyDetector.js";

// ─────────────────────────────────────────────────────────────────────────────
//  ★  SET YOUR PROJECT PATH HERE
// ─────────────────────────────────────────────────────────────────────────────
const ROOT_PATH = "X:\\Web Development\\MERN\\Projects\\Jobify";

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

/**
 * Deeply converts Maps, Sets, and nested objects into raw JSON-serializable
 * structures so console.dir handles them without displaying [Map] or [Set].
 */
function convertMapAndSet(value) {
  if (value instanceof Map) {
    return Object.fromEntries(
      [...value.entries()].map(([k, v]) => [k, convertMapAndSet(v)])
    );
  }

  if (value instanceof Set) {
    return [...value].map(convertMapAndSet);
  }

  if (Array.isArray(value)) {
    return value.map(convertMapAndSet);
  }

  if (value && typeof value === "object") {
    const result = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = convertMapAndSet(v);
    }
    return result;
  }

  return value;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main Execution
// ─────────────────────────────────────────────────────────────────────────────

console.clear();

console.log(header("PIPELINE DETECTION ENGINE", "═"));
console.log(header("Full Result Deep-Dump", " "));
console.log(line("═"));
console.log();
console.log(`  Scanning & Detecting: ${ROOT_PATH}...`);
console.log();

try {
  // 1. Index the project directory
  const projectIndex = await indexRepository(ROOT_PATH);

  // 2. Run detector pipeline on the index
  const result = await runTechnologyDetector(projectIndex);
  console.log(result.technologies)
  console.dir(convertMapAndSet(projectIndex.technologies), {
    depth: null,
    colors: true,
    maxArrayLength: null,
  });

  if (projectIndex.metadata.errors.length > 0) {
    console.log();
    console.log(header("ERRORS ENCOUNTERED", "═"));
    console.dir(projectIndex.metadata.errors, { depth: null, colors: true });
  }

} catch (error) {
  console.error("❌ Pipeline Failed:", error);
}