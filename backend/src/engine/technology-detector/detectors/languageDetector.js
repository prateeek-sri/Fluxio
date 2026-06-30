import { LANGUAGE_DEFINITIONS } from "../definitions/languages.js";
import { getExtensionIndex } from "../providers/extensionIndexProvider.js";

export async function detectLanguage(context) {
  const extensionIndex = getExtensionIndex(context);

  for (const [extension, files] of extensionIndex) {
    const language = LANGUAGE_DEFINITIONS.get(extension);

    if (!language) {
      continue;
    }

    const fileIds = files.map((file) => file.id);
    const confidence = 100;

    const languageDetection = {
      name: language,
      confidence,
      evidence: [
        {
          type: "extension",
          value: extension,
          fileIds,
        },
      ],
      metadata: {},
    };

    context.repository.technologies.languages.set(
      language,
      languageDetection,
    );
  }
}