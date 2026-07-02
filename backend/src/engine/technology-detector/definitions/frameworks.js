import { ECOSYSTEMS } from "./ecosystems.js";
import { RULE_TYPES } from "./ruleTypes.js";

/**
 * FRAMEWORK_DEFINITIONS
 *
 * Data-driven framework detection definitions.
 *
 * Every entry follows the shape:
 * {
 *   name,               — display name
 *   storage,            — dot-path into technologies (e.g. "frameworks.backend")
 *   ecosystem,          — ECOSYSTEMS constant, or null for global definitions
 *   minimumConfidence,  — minimum score (0-100) required to report a detection
 *   rules: [            — ordered list of evidence rules
 *     { type, patterns, weight }
 *   ]
 * }
 *
 * Adding a new framework requires ONLY a new entry here.
 * No detector code changes are needed.
 *
 * Weight guidelines:
 *   dependency:     40  (strongest signal)
 *   file:           25  (config file presence)
 *   import:         20  (import/require statement)
 *   functionCall:   15  (standalone function call)
 *   memberCall:     15  (method call like app.get)
 *   annotation:     25  (Java/@decorator)
 *   configuration:  30  (config key/value)
 */
export const FRAMEWORK_DEFINITIONS = Object.freeze([

  // ─── Node.js — Backend ────────────────────────────────────────────────

  {
    name: "Express",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["express"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["express"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FUNCTION_CALL,
        patterns: ["express"],
        weight: 15,
      },
      {
        type: RULE_TYPES.MEMBER_CALL,
        patterns: [
          "app.get",
          "app.post",
          "app.put",
          "app.delete",
          "app.use",
          "app.listen",
          "router.get",
          "router.post",
          "router.use",
        ],
        weight: 15,
      },
    ],
  },

  {
    name: "NestJS",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@nestjs/core", "@nestjs/common", "@nestjs/*"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["@nestjs/common", "@nestjs/core"],
        weight: 20,
      },
    ],
  },

  {
    name: "Fastify",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["fastify"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["fastify"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FUNCTION_CALL,
        patterns: ["Fastify", "fastify"],
        weight: 15,
      },
    ],
  },

  {
    name: "Koa",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["koa"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["koa"],
        weight: 20,
      },
    ],
  },

  {
    name: "Hapi",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@hapi/hapi"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["@hapi/hapi"],
        weight: 20,
      },
    ],
  },

  {
    name: "AdonisJS",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@adonisjs/core"],
        weight: 40,
      },
    ],
  },

  // ─── Java — Backend ───────────────────────────────────────────────────

  {
    name: "Spring Boot",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "org.springframework.boot:spring-boot-starter-web",
          "org.springframework.boot:spring-boot-starter",
          "org.springframework.boot:spring-boot-starter-",
        ],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["application.properties", "application.yml", "application.yaml"],
        weight: 25,
      },
      {
        type: RULE_TYPES.ANNOTATION,
        patterns: ["@SpringBootApplication", "@RestController", "@Controller"],
        weight: 25,
      },
    ],
  },

  {
    name: "Quarkus",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "io.quarkus:quarkus-resteasy",
          "io.quarkus:quarkus-core",
          "io.quarkus:quarkus-",
        ],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["application.properties", "application.yml"],
        weight: 25,
      },
    ],
  },

  {
    name: "Micronaut",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "io.micronaut:micronaut-http-server",
          "io.micronaut:micronaut-",
        ],
        weight: 40,
      },
    ],
  },

  // ─── Python — Backend ─────────────────────────────────────────────────

  {
    name: "Django",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["django"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["django"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["manage.py", "settings.py", "urls.py"],
        weight: 25,
      },
    ],
  },

  {
    name: "Flask",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["flask"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["flask"],
        weight: 20,
      },
    ],
  },

  {
    name: "FastAPI",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["fastapi"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["fastapi"],
        weight: 20,
      },
    ],
  },

  // ─── PHP — Backend ────────────────────────────────────────────────────

  {
    name: "Laravel",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.PHP,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["laravel/framework"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["artisan"],
        weight: 25,
      },
    ],
  },

  {
    name: "Symfony",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.PHP,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["symfony/symfony", "symfony/framework-bundle"],
        weight: 40,
      },
    ],
  },

  // ─── .NET — Backend ───────────────────────────────────────────────────

  {
    name: "ASP.NET Core",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.DOTNET,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "Microsoft.AspNetCore.App",
          "Microsoft.AspNetCore.Mvc",
        ],
        weight: 40,
      },
    ],
  },

  // ─── Go — Backend ─────────────────────────────────────────────────────

  {
    name: "Gin",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["github.com/gin-gonic/gin"],
        weight: 40,
      },
    ],
  },

  {
    name: "Echo",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["github.com/labstack/echo"],
        weight: 40,
      },
    ],
  },

  {
    name: "Fiber",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["github.com/gofiber/fiber"],
        weight: 40,
      },
    ],
  },

  // ─── Ruby — Backend ───────────────────────────────────────────────────

  {
    name: "Ruby on Rails",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.RUBY,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["rails"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["Gemfile", "Rakefile"],
        weight: 15,
      },
    ],
  },

  {
    name: "Sinatra",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.RUBY,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["sinatra"],
        weight: 40,
      },
    ],
  },

  // ─── Rust — Backend ───────────────────────────────────────────────────

  {
    name: "Actix Web",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.RUST,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["actix-web"],
        weight: 40,
      },
    ],
  },

  {
    name: "Rocket",
    storage: "frameworks.backend",
    ecosystem: ECOSYSTEMS.RUST,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["rocket"],
        weight: 40,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  FRONTEND FRAMEWORKS
  //
  //  These are GLOBAL — no ecosystem restriction.
  //  Detected by dependency in package.json regardless of ecosystem.
  // ═══════════════════════════════════════════════════════════════════════

  {
    name: "React",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["react", "react-dom"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["react", "react-dom"],
        weight: 20,
      },
    ],
  },

  {
    name: "Next.js",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["next"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: [
          "next.config.js",
          "next.config.mjs",
          "next.config.ts",
        ],
        weight: 25,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["next", "next/router", "next/link", "next/image"],
        weight: 15,
      },
    ],
  },

  {
    name: "Vue.js",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["vue"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["vue"],
        weight: 20,
      },
    ],
  },

  {
    name: "Nuxt.js",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["nuxt"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["nuxt.config.js", "nuxt.config.ts"],
        weight: 25,
      },
    ],
  },

  {
    name: "Angular",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@angular/core", "@angular/common"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["angular.json"],
        weight: 25,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["@angular/core", "@angular/common"],
        weight: 15,
      },
    ],
  },

  {
    name: "Svelte",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["svelte"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["svelte.config.js"],
        weight: 25,
      },
    ],
  },

  {
    name: "SvelteKit",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@sveltejs/kit"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["svelte.config.js"],
        weight: 20,
      },
    ],
  },

  {
    name: "Solid.js",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["solid-js"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["solid-js"],
        weight: 20,
      },
    ],
  },

  {
    name: "Remix",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@remix-run/react", "@remix-run/node"],
        weight: 40,
      },
    ],
  },

  {
    name: "Gatsby",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["gatsby"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["gatsby-config.js", "gatsby-config.ts"],
        weight: 25,
      },
    ],
  },

  {
    name: "Astro",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["astro"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["astro.config.mjs", "astro.config.ts"],
        weight: 25,
      },
    ],
  },

  {
    name: "Ember.js",
    storage: "frameworks.frontend",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["ember-cli", "ember-source"],
        weight: 40,
      },
    ],
  },
]);
