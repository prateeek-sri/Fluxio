/**
 * RELATIONSHIP_TYPES
 *
 * The possible relationship types between technology detections.
 *
 * "requires"   — A requires B to be present.
 *                If A is detected but B is not, add a warning.
 *
 * "conflicts"  — A and B cannot coexist in the same project.
 *                If both are detected, flag a conflict and keep
 *                the one with higher confidence.
 *
 * "extends"    — A is built on top of B (e.g. NestJS extends Express).
 *                Used to build the Technology Graph.
 *
 * "suggests"   — A often comes with B. Not an error if B is missing,
 *                just metadata for the graph.
 */
export const RELATIONSHIP_TYPES = Object.freeze({
  REQUIRES:  "requires",
  CONFLICTS: "conflicts",
  EXTENDS:   "extends",
  SUGGESTS:  "suggests",
});
