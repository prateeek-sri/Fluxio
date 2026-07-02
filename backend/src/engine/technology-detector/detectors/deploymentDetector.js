import { DEPLOYMENT_DEFINITIONS } from "../definitions/deploymentPlatforms.js";
import { getApplicableDefinitions } from "../helpers/getApplicableDefinitions.js";
import { runDefinitionDetector } from "../helpers/runDefinitionDetector.js";

/**
 * detectDeployment
 *
 * Detects deployment platforms and infrastructure used in the repository.
 *
 * Uses the same generic detection engine as every other detector.
 * Adding new platforms requires only a new entry in definitions/deploymentPlatforms.js.
 */
export async function detectDeployment(context) {
  const definitions = getApplicableDefinitions(
    DEPLOYMENT_DEFINITIONS,
    context,
  );

  await runDefinitionDetector({ context, definitions });
}