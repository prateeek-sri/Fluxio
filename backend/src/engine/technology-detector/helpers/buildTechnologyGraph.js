import { RELATIONSHIP_DEFINITIONS } from "../definitions/relationships.js";
import { RELATIONSHIP_TYPES } from "../definitions/relationshipTypes.js";

/**
 * buildTechnologyGraph
 *
 * Takes all technology detections from the context and builds
 * a Technology Graph — a structured representation of how
 * detected technologies relate to each other.
 *
 * Graph shape:
 * {
 *   nodes: Map<name, TechnologyNode>
 *   edges: TechnologyEdge[]
 *   roots: string[]    — technologies with no "requires" parent
 * }
 *
 * TechnologyNode:
 * {
 *   name, category, confidence, evidence,
 *   children: string[],   — technologies that extend/require this one
 *   parents:  string[],   — technologies that this one requires
 * }
 *
 * TechnologyEdge:
 * {
 *   source, target, type, note?
 * }
 */
export function buildTechnologyGraph(context) {
  const allDetections = getAllDetections(context);

  const nodes = new Map();
  const edges = [];

  // Seed nodes from detections
  for (const detection of allDetections) {
    nodes.set(detection.name, {
      name: detection.name,
      category: detection.category ?? "unknown",
      confidence: detection.confidence,
      evidence: detection.evidence,
      metadata: detection.metadata,
      children: [],
      parents: [],
    });
  }

  // Walk relationship definitions and wire up existing nodes
  for (const rel of RELATIONSHIP_DEFINITIONS) {
    const sourceNode = nodes.get(rel.source);
    const targetNode = nodes.get(rel.target);

    // Only add edge if at least the source is detected
    if (!sourceNode) {
      continue;
    }

    const edge = {
      source: rel.source,
      target: rel.target,
      type: rel.type,
      note: rel.note ?? null,
    };

    edges.push(edge);

    // Wire parent/child links for REQUIRES and EXTENDS
    if (
      rel.type === RELATIONSHIP_TYPES.REQUIRES ||
      rel.type === RELATIONSHIP_TYPES.EXTENDS
    ) {
      sourceNode.parents.push(rel.target);

      if (targetNode) {
        targetNode.children.push(rel.source);
      }
    }
  }

  // Roots = detected nodes that have no detected parent
  const detectedNames = new Set(nodes.keys());

  const roots = [];
  for (const [name, node] of nodes) {
    const hasDetectedParent = node.parents.some((p) =>
      detectedNames.has(p),
    );

    if (!hasDetectedParent) {
      roots.push(name);
    }
  }

  return { nodes, edges, roots };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Collects every detected technology from all detection maps
 * in the context's technologies object.
 */
function getAllDetections(context) {
  const techs = context.repository.technologies;
  const detections = [];

  // Languages
  for (const d of techs.languages.values()) {
    detections.push({ ...d, category: "language" });
  }

  // Runtimes
  for (const d of techs.runtimes.values()) {
    detections.push({ ...d, category: "runtime" });
  }

  // Frameworks (backend + frontend)
  for (const d of techs.frameworks.backend.values()) {
    detections.push({ ...d, category: d.category ?? "backend-framework" });
  }
  for (const d of techs.frameworks.frontend.values()) {
    detections.push({ ...d, category: d.category ?? "frontend-framework" });
  }

  // ORMs
  for (const d of techs.orms.values()) {
    detections.push({ ...d, category: d.category ?? "orm" });
  }

  // Databases
  for (const d of techs.databases.values()) {
    detections.push({ ...d, category: d.category ?? "database" });
  }

  // Build tools
  for (const d of techs.buildTools.values()) {
    detections.push({ ...d, category: "build-tool" });
  }

  // Deployment platforms
  for (const d of techs.deployment.values()) {
    detections.push({ ...d, category: "deployment" });
  }

  // Package managers
  for (const d of techs.packageManagers.values()) {
    detections.push({ ...d, category: "package-manager" });
  }

  return detections;
}
