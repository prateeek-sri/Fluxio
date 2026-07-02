/**
 * generateDetectionReport
 *
 * Formats the final Detection Report from the context and
 * the Technology Graph produced by Phase 3.
 *
 * The report is a plain JSON-serialisable object — it contains
 * no Maps, only plain arrays and objects.
 *
 * Shape:
 * {
 *   summary: {
 *     totalDetections,
 *     ecosystems: string[],
 *     scanDurationMs,
 *   },
 *   ecosystems: { [ecosystemName]: EcosystemReport },
 *   graph: {
 *     roots: string[],
 *     nodes: NodeReport[],
 *     edges: EdgeReport[],
 *   },
 *   conflicts: ConflictReport[],
 *   warnings: Warning[],
 *   errors: Error[],
 * }
 */
export function generateDetectionReport({
  context,
  graph,
  conflicts,
}) {
  const techs = context.repository.technologies;

  // ── Ecosystems ──────────────────────────────────────────────────────────

  const ecosystemNames = [...techs.ecosystems.keys()];

  const ecosystemReports = {};

  for (const [ecosystemName] of techs.ecosystems) {
    ecosystemReports[ecosystemName] = buildEcosystemReport(
      ecosystemName,
      techs,
    );
  }

  // ── Graph ───────────────────────────────────────────────────────────────

  const graphReport = {
    roots: graph.roots,

    nodes: [...graph.nodes.values()].map((node) => ({
      name: node.name,
      category: node.category,
      confidence: node.confidence,
      evidenceCount: node.evidence?.length ?? 0,
      parents: node.parents,
      children: node.children,
    })),

    edges: graph.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      type: edge.type,
      note: edge.note,
    })),
  };

  // ── Summary ─────────────────────────────────────────────────────────────

  const totalDetections = graph.nodes.size;

  const summary = {
    totalDetections,
    ecosystems: ecosystemNames,
    scanDurationMs: context.repository.metadata.scanDurationMs ?? 0,
  };

  return {
    summary,
    ecosystems: ecosystemReports,
    graph: graphReport,
    conflicts,
    warnings: context.repository.metadata.warnings,
    errors: context.repository.metadata.errors,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildEcosystemReport(ecosystemName, techs) {
  const report = {
    frameworks: [],
    orms: [],
    databases: [],
    buildTools: [],
    deployment: [],
    packageManagers: [],
    languages: [],
    runtimes: [],
  };

  // Frameworks
  for (const d of techs.frameworks.backend.values()) {
    if (belongsToEcosystem(d, ecosystemName)) {
      report.frameworks.push(summariseDetection(d));
    }
  }
  for (const d of techs.frameworks.frontend.values()) {
    if (belongsToEcosystem(d, ecosystemName)) {
      report.frameworks.push(summariseDetection(d));
    }
  }

  // ORMs
  for (const d of techs.orms.values()) {
    if (belongsToEcosystem(d, ecosystemName)) {
      report.orms.push(summariseDetection(d));
    }
  }

  // Databases
  for (const d of techs.databases.values()) {
    report.databases.push(summariseDetection(d));
  }

  // Build tools
  for (const d of techs.buildTools.values()) {
    report.buildTools.push(summariseDetection(d));
  }

  // Deployment platforms
  for (const d of techs.deployment.values()) {
    report.deployment.push(summariseDetection(d));
  }

  // Package managers
  for (const d of techs.packageManagers.values()) {
    report.packageManagers.push(summariseDetection(d));
  }

  // Languages
  for (const d of techs.languages.values()) {
    report.languages.push(summariseDetection(d));
  }

  // Runtimes
  for (const d of techs.runtimes.values()) {
    if (belongsToEcosystem(d, ecosystemName)) {
      report.runtimes.push(summariseDetection(d));
    }
  }

  return report;
}

function belongsToEcosystem(detection, ecosystemName) {
  // Detections may carry an ecosystem field (from definition)
  // or we fall back to "include everything"
  if (!detection.metadata?.ecosystem) {
    return true;
  }
  return detection.metadata.ecosystem === ecosystemName;
}

function summariseDetection(detection) {
  return {
    name: detection.name,
    confidence: detection.confidence,
    evidenceCount: detection.evidence?.length ?? 0,
    evidence: detection.evidence ?? [],
  };
}
