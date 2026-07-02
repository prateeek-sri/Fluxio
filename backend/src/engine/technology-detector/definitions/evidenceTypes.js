/**
 * EVIDENCE_TYPES
 *
 * Every evidence item in the system has one of these types.
 * Type-safety for evidence: use these constants, never raw strings.
 */
export const EVIDENCE_TYPES = Object.freeze({
  EXTENSION:     "extension",
  FILE:          "file",
  LANGUAGE:      "language",
  DEPENDENCY:    "dependency",
  IMPORT:        "import",
  FUNCTION_CALL: "functionCall",
  MEMBER_CALL:   "memberCall",
  ANNOTATION:    "annotation",
  CONFIGURATION: "configuration",
});