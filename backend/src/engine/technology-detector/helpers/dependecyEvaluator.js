import { getDependencyIndex } from "../providers/dependencyIndexProvider.js";
import { runIndexEvaluator } from "../helpers/runIndexEvaluator.js";
import { createDependencyEvidence } from "../helpers/createDependencyEvidence.js";

export async function evaluateDependency({
  context,
  rule,
}) {
  const dependencyIndex =
    await getDependencyIndex(context);

  return runIndexEvaluator({
    index: dependencyIndex,

    rule,

    createEvidence:
      createDependencyEvidence,
  });
}