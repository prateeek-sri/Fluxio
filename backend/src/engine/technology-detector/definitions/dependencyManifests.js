import { ECOSYSTEMS } from "./ecosystems.js";

export const DEPENDENCY_MANIFESTS = [

  {
    ecosystem: ECOSYSTEMS.NODE,

    fileName: "package.json",

    packageManager: "npm",

    reader: "npm",
  },

  {
    ecosystem: ECOSYSTEMS.JAVA,

    fileName: "pom.xml",

    packageManager: "maven",

    reader: "maven",
  },

  {
    ecosystem: ECOSYSTEMS.JAVA,

    fileName: "build.gradle",

    packageManager: "gradle",

    reader: "gradle",
  },

  {
    ecosystem: ECOSYSTEMS.JAVA,

    fileName: "build.gradle.kts",

    packageManager: "gradle",

    reader: "gradle",
  },

  {
    ecosystem: ECOSYSTEMS.PYTHON,

    fileName: "requirements.txt",

    packageManager: "pip",

    reader: "pip",
  },

  {
    ecosystem: ECOSYSTEMS.PYTHON,

    fileName: "pyproject.toml",

    packageManager: "pip",

    reader: "pip",
  },

  {
    ecosystem: ECOSYSTEMS.PHP,

    fileName: "composer.json",

    packageManager: "composer",

    reader: "composer",
  },

  {
    ecosystem: ECOSYSTEMS.GO,

    fileName: "go.mod",

    packageManager: "go",

    reader: "go",
  },

  {
    ecosystem: ECOSYSTEMS.RUST,

    fileName: "Cargo.toml",

    packageManager: "cargo",

    reader: "cargo",
  },

];