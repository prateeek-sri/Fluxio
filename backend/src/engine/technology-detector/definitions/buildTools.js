import { ECOSYSTEMS } from "./ecosystems.js";
import { RULE_TYPES } from "./ruleTypes.js";

/**
 * BUILD_TOOL_DEFINITIONS
 *
 * Data-driven build tool detection definitions.
 *
 * All definitions use storage: "buildTools".
 *
 * Many build tools are GLOBAL — they exist across ecosystems
 * (e.g. Docker, Webpack) and are detected by file presence.
 */
export const BUILD_TOOL_DEFINITIONS = Object.freeze([

  // ─── Node.js Build Tools ────────────────────────────────────────────────

  {
    name: "Webpack",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["webpack", "webpack-cli"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: [
          "webpack.config.js",
          "webpack.config.ts",
          "webpack.config.mjs",
        ],
        weight: 25,
      },
    ],
  },

  {
    name: "Vite",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["vite"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: [
          "vite.config.js",
          "vite.config.ts",
          "vite.config.mjs",
        ],
        weight: 25,
      },
    ],
  },

  {
    name: "esbuild",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["esbuild"],
        weight: 40,
      },
    ],
  },

  {
    name: "Rollup",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["rollup"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["rollup.config.js", "rollup.config.mjs", "rollup.config.ts"],
        weight: 25,
      },
    ],
  },

  {
    name: "Parcel",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["parcel"],
        weight: 40,
      },
    ],
  },

  {
    name: "SWC",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@swc/core", "@swc/cli"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: [".swcrc"],
        weight: 25,
      },
    ],
  },

  {
    name: "Babel",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@babel/core", "@babel/cli"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["babel.config.js", "babel.config.json", ".babelrc"],
        weight: 25,
      },
    ],
  },

  {
    name: "Turbopack",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["turbo"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["turbo.json"],
        weight: 25,
      },
    ],
  },

  // ─── Java Build Tools ───────────────────────────────────────────────────

  {
    name: "Maven",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["pom.xml"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["mvnw", "mvnw.cmd"],
        weight: 15,
      },
    ],
  },

  {
    name: "Gradle",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["build.gradle", "build.gradle.kts"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["gradlew", "gradlew.bat", "settings.gradle", "settings.gradle.kts"],
        weight: 15,
      },
    ],
  },

  // ─── General / Cross-Ecosystem ──────────────────────────────────────────

  {
    name: "Docker",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["Dockerfile"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: [".dockerignore"],
        weight: 15,
      },
    ],
  },

  {
    name: "Docker Compose",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"],
        weight: 40,
      },
    ],
  },

  {
    name: "Make",
    storage: "buildTools",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["Makefile"],
        weight: 40,
      },
    ],
  },

  // ─── Python Build Tools ─────────────────────────────────────────────────

  {
    name: "Poetry",
    storage: "buildTools",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["poetry.lock"],
        weight: 40,
      },
    ],
  },

  // ─── Rust Build ─────────────────────────────────────────────────────────

  {
    name: "Cargo",
    storage: "buildTools",
    ecosystem: ECOSYSTEMS.RUST,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["Cargo.toml"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["Cargo.lock"],
        weight: 15,
      },
    ],
  },
]);
