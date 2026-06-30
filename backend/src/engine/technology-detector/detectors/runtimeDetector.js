import { RUNTIME_DEFINITIONS } from "../definitions/runtimes.js";
export async function detectRuntime(context) {
  const languages = context.repository.technologies.languages;
  for (const [language, languageDetection] of languages) {
const runtimeDetection = {
  name: runtime,
  confidence,
  evidence: [
    {
      type: "language",
      value: language,
    },
  ],
  metadata: {
    languages: [language],
  },
};  
}

}
