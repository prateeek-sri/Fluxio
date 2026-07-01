import { EVIDENCE_TYPES } from "../definitions/evidenceTypes.js";
import { RUNTIME_DEFINITIONS } from "../definitions/runtimes.js";

export async function detectRuntime(context) {
  const languages = context.repository.technologies.languages;
  const runtimes = context.repository.technologies.runtimes;

  for (const [language, languageDetection] of languages) {
    const runtime = RUNTIME_DEFINITIONS.get(language);

    if (!runtime) {
      continue;
    }

    if (!runtimes.has(runtime)) {
      const confidence = 100;

      const runtimeDetection = {
        name: runtime,
        confidence,
        evidence: [
          {
            type: EVIDENCE_TYPES.LANGUAGE,
            value: language,
          },
        ],
        metadata: {
          languages: [language],
        },
      };

      runtimes.set(runtime, runtimeDetection);
      continue;
    }

    const runtimeDetection = runtimes.get(runtime);

    runtimeDetection.metadata.languages.push(language);

    runtimeDetection.evidence.push({
      type: EVIDENCE_TYPES.LANGUAGE,
      value: language,
    });
  }
}