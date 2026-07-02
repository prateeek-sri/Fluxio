import { ECOSYSTEM_MAPPINGS } from "../definitions/ecosystemMapping.js";

export function inferEcosystems(context) {
  const runtimeDetections =
    context.repository.technologies.runtimes;

  const ecosystemDetections =
    context.repository.technologies.ecosystems;

  for (const runtime of runtimeDetections.values()) {
    const ecosystem =
      ECOSYSTEM_MAPPINGS.get(runtime.name);

    if (!ecosystem) {
      continue;
    }

    if (!ecosystemDetections.has(ecosystem)) {
      ecosystemDetections.set(ecosystem, {
        name: ecosystem,

        runtime: runtime.name,
      });
    }
  }
}