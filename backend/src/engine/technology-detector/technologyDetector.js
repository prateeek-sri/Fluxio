import { runPhaseOne } from "./phases/phaseOne.js";
import { runPhaseTwo } from "./phases/phaseTwo.js";
import { runPhaseThree } from "./phases/phaseThree.js";
import { createDetectionContext } from "./detectionContext.js";
export async function runTechnologyDetector(projectIndex) {
  const startTime = Date.now();
  let durationMs = 0;
  let context = null;
  let phaseOne = null;
  let phaseTwo = null;
  let phaseThree = null;
  try {
    context = createDetectionContext(projectIndex);

    phaseOne = await runPhaseOne(context);
    phaseTwo = await runPhaseTwo(context);
    phaseThree = await runPhaseThree(context);
  } finally {
    durationMs = Date.now() - startTime;
  }
  const phases = [phaseOne, phaseTwo, phaseThree];

  return {
    repository: context.repository,
    execution: {
      durationMs,
      phases,
    },
  };
}
