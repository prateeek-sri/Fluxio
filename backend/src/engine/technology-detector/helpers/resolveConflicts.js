import { RELATIONSHIP_DEFINITIONS } from "../definitions/relationships.js";
import { RELATIONSHIP_TYPES } from "../definitions/relationshipTypes.js";

/**
 * resolveConflicts
 *
 * Reads CONFLICT relationship definitions and checks whether both
 * conflicting technologies are actually detected.
 *
 * For each conflict pair:
 *   - Records the conflict in context.repository.metadata.warnings
 *   - Removes the lower-confidence detection from the repository
 *   - The winner (higher confidence) is left untouched
 *
 * Returns: ConflictReport[]
 *
 * ConflictReport:
 * {
 *   source, target,
 *   winner,  loser,
 *   winnerConfidence, loserConfidence,
 *   resolution: "kept-higher-confidence" | "tie-kept-source"
 * }
 */
export function resolveConflicts(context) {
  const conflicts = RELATIONSHIP_DEFINITIONS.filter(
    (r) => r.type === RELATIONSHIP_TYPES.CONFLICTS,
  );

  const reports = [];

  for (const conflict of conflicts) {
    const { source, target } = conflict;

    const sourceDetection = findDetection(context, source);
    const targetDetection = findDetection(context, target);

    if (!sourceDetection || !targetDetection) {
      // At least one is not detected — no conflict
      continue;
    }

    // Both detected — resolve
    const sourceConf = sourceDetection.detection.confidence;
    const targetConf = targetDetection.detection.confidence;

    let winner, loser, winnerStore, loserStore;
    let resolution;

    if (sourceConf >= targetConf) {
      winner = source;
      loser = target;
      winnerStore = sourceDetection;
      loserStore = targetDetection;
      resolution =
        sourceConf === targetConf
          ? "tie-kept-source"
          : "kept-higher-confidence";
    } else {
      winner = target;
      loser = source;
      winnerStore = targetDetection;
      loserStore = sourceDetection;
      resolution = "kept-higher-confidence";
    }

    // Remove the loser from its store
    loserStore.store.delete(loserStore.key);

    const report = {
      source,
      target,
      winner,
      loser,
      winnerConfidence: winnerStore.detection.confidence,
      loserConfidence: loserStore.detection.confidence,
      resolution,
      note: conflict.note ?? null,
    };

    reports.push(report);

    // Record in metadata warnings for visibility
    context.repository.metadata.warnings.push({
      stage: "conflictResolver",
      message: `Conflict detected: ${source} vs ${target}. Kept ${winner} (confidence ${winnerStore.detection.confidence}).`,
      timestamp: new Date(),
    });
  }

  return reports;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Finds a detection by name across all technology stores.
 * Returns { detection, store, key } or null.
 */
function findDetection(context, name) {
  const techs = context.repository.technologies;

  const stores = [
    techs.frameworks.backend,
    techs.frameworks.frontend,
    techs.orms,
    techs.databases,
    techs.buildTools,
    techs.deployment,
    techs.runtimes,
    techs.languages,
    techs.packageManagers,
  ];

  for (const store of stores) {
    if (store.has(name)) {
      return {
        detection: store.get(name),
        store,
        key: name,
      };
    }
  }

  return null;
}
