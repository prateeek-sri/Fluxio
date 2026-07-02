import { createEvaluationResult } from "../helpers/createEvaluationResult.js";

/**
 * evaluateAnnotation
 *
 * Evaluates annotation-based rules (e.g. @SpringBootApplication,
 * @RestController in Java, or @Injectable() in TypeScript).
 *
 * Current implementation: stub — returns no match.
 * Full implementation requires an Annotation Index which will be
 * built by the Java / Python language adapters (AST layer).
 *
 * Receives: { context, rule, definition }
 */
export async function evaluateAnnotation({ context, rule }) {
  // Annotation index is not yet built — skip without error.
  // When the annotation index provider is available, this will
  // follow the same runIndexEvaluator pattern as other evaluators.
  return createEvaluationResult({
    matched: false,
    score: 0,
    occurrences: [],
    evidence: [],
    metadata: { reason: "annotationIndexNotYetBuilt" },
    warnings: [],
  });
}