import { detectBuildTool, detectDeployment } from "../detectors/index.js";
import { executeDetector } from "../utils/executeDetector.js";
import { buildTechnologyGraph } from "../helpers/buildTechnologyGraph.js";
import { resolveConflicts } from "../helpers/resolveConflicts.js";
import { generateDetectionReport } from "../helpers/generateDetectionReport.js";

/**
 * runPhaseThree
 *
 * Phase Three Pipeline:
 *
 *   Step 1: Build Tool Detector
 *   Step 2: Deployment Detector
 *         │
 *         ▼
 *   Step 3: Conflict Resolution  (resolveConflicts)
 *         │
 *         ▼
 *   Step 4: Technology Graph     (buildTechnologyGraph)
 *         │
 *         ▼
 *   Step 5: Final Report         (generateDetectionReport)
 *         │
 *         ▼
 *   context.detectionReport
 *
 * Build Tool and Deployment detectors run first because they
 * need to be present before conflict resolution and graph building.
 *
 * Confidence is NEVER recalculated here for Phase 2 detections.
 * Each detector already computed and stored confidence in Phase 2.
 *
 * Phase Three reasons about *relationships* between already-detected
 * technologies — not about the technologies themselves.
 */
export async function runPhaseThree(context) {
  const startTime = Date.now();
  let durationMs = 0;

  const steps = [];

  try {
    // ── Step 1 & 2: Build Tool + Deployment Detection ──────────────────
    // These are Phase 3 detectors — they use the same generic engine
    // but run after frameworks/ORMs/databases are known.

    const detectors = [
      {
        detector: detectBuildTool,
        detectorName: "buildToolDetector",
      },
      {
        detector: detectDeployment,
        detectorName: "deploymentDetector",
      },
    ];

    const detectorResults = await Promise.all(
      detectors.map((detectorConfig) =>
        executeDetector({ ...detectorConfig, context }),
      ),
    );

    for (const result of detectorResults) {
      steps.push({
        step: result.detector,
        durationMs: result.durationMs,
        success: result.success,
        error: result.error,
      });
    }

    // ── Step 3: Conflict Resolution ────────────────────────────────────
    // Resolve conflicts defined in relationships.js.
    // Removes lower-confidence conflicting detections.

    const conflictStartTime = Date.now();
    let conflicts = [];
    let conflictError = null;

    try {
      conflicts = resolveConflicts(context);
    } catch (error) {
      conflictError = {
        stage: "conflictResolver",
        name: error.name,
        message: error.message,
        timestamp: new Date(),
      };
      context.repository.metadata.errors.push(conflictError);
    }

    steps.push({
      step: "conflictResolver",
      durationMs: Date.now() - conflictStartTime,
      conflictsFound: conflicts.length,
      success: conflictError === null,
      error: conflictError,
    });

    // ── Step 4: Technology Graph ───────────────────────────────────────
    // Build the graph from surviving detections + relationship defs.

    const graphStartTime = Date.now();
    let graph = { nodes: new Map(), edges: [], roots: [] };
    let graphError = null;

    try {
      graph = buildTechnologyGraph(context);
    } catch (error) {
      graphError = {
        stage: "technologyGraphBuilder",
        name: error.name,
        message: error.message,
        timestamp: new Date(),
      };
      context.repository.metadata.errors.push(graphError);
    }

    steps.push({
      step: "technologyGraphBuilder",
      durationMs: Date.now() - graphStartTime,
      nodesBuilt: graph.nodes.size,
      edgesBuilt: graph.edges.length,
      success: graphError === null,
      error: graphError,
    });

    // Store the graph on the context for external consumers
    context.technologyGraph = graph;

    // ── Step 5: Final Report ──────────────────────────────────────────
    // Generate a serialisable detection report.

    const reportStartTime = Date.now();
    let reportError = null;

    try {
      const report = generateDetectionReport({
        context,
        graph,
        conflicts,
      });

      context.detectionReport = report;
    } catch (error) {
      reportError = {
        stage: "reportGenerator",
        name: error.name,
        message: error.message,
        timestamp: new Date(),
      };
      context.repository.metadata.errors.push(reportError);
    }

    steps.push({
      step: "reportGenerator",
      durationMs: Date.now() - reportStartTime,
      success: reportError === null,
      error: reportError,
    });

  } finally {
    durationMs = Date.now() - startTime;
  }

  return {
    phase: "phaseThree",
    durationMs,
    steps,
  };
}