import { evaluateDependency } from "./dependencyEvaluator.js";
import { evaluateImport } from "./importEvaluator.js";
import { evaluateFunctionCall } from "./functionCallEvaluator.js";
import { evaluateMemberCall } from "./memberCallEvaluator.js";
import { evaluateAnnotation } from "./annotationEvaluator.js";
import { evaluateConfiguration } from "./configurationEvaluator.js";
import { evaluateFile } from "./fileEvaluator.js";

import { RULE_TYPES } from "../definitions/ruleTypes.js";

/**
 * EVALUATORS  (Evaluator Engine)
 *
 * Maps every rule type to its evaluator function.
 *
 * Convention:
 *   Every evaluator receives { context, rule, definition }
 *   Every evaluator returns  an EvaluationResult
 *
 * Adding a new evaluator:
 *   1. Create the evaluator in ./evaluators/
 *   2. Import it here
 *   3. Add it to this map
 *   No other files need to change.
 */
export const EVALUATORS = Object.freeze({
  [RULE_TYPES.DEPENDENCY]:    evaluateDependency,
  [RULE_TYPES.IMPORT]:        evaluateImport,
  [RULE_TYPES.FUNCTION_CALL]: evaluateFunctionCall,
  [RULE_TYPES.MEMBER_CALL]:   evaluateMemberCall,
  [RULE_TYPES.ANNOTATION]:    evaluateAnnotation,
  [RULE_TYPES.CONFIG]:        evaluateConfiguration,
  [RULE_TYPES.FILE]:          evaluateFile,
  // Legacy alias (some definitions may use "file" or FILE_EXISTS)
  ["file_exists"]:            evaluateFile,
});