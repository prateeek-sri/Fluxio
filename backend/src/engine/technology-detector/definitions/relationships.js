import { RELATIONSHIP_TYPES } from "./relationshipTypes.js";

/**
 * RELATIONSHIP_DEFINITIONS
 *
 * Data-driven technology relationship definitions.
 *
 * Phase 3 reads this list to build the Technology Graph and
 * to validate / resolve conflicts between detected technologies.
 *
 * Shape of each entry:
 * {
 *   source:  string  — technology name (the one that depends / conflicts)
 *   target:  string  — technology name (the dependency / conflicting one)
 *   type:    RELATIONSHIP_TYPES constant
 *   note?:   string  — optional human-readable explanation
 * }
 *
 * Adding a new relationship:
 *   - Add a new object to this array
 *   - No Phase 3 code changes are needed
 */
export const RELATIONSHIP_DEFINITIONS = Object.freeze([

  // ─── Backend Framework → Runtime Requirements ──────────────────────────

  {
    source: "Express",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "NestJS",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Fastify",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Koa",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Hapi",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "AdonisJS",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Spring Boot",
    target: "Java",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Quarkus",
    target: "Java",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Micronaut",
    target: "Java",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Django",
    target: "Python",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Flask",
    target: "Python",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "FastAPI",
    target: "Python",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Laravel",
    target: "PHP",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Gin",
    target: "Go",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Echo",
    target: "Go",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Fiber",
    target: "Go",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },

  // ─── Frontend Framework Extends ────────────────────────────────────────

  {
    source: "Next.js",
    target: "React",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "Next.js is a React framework",
  },
  {
    source: "Gatsby",
    target: "React",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "Gatsby is built on React",
  },
  {
    source: "Remix",
    target: "React",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "Remix is a React framework",
  },
  {
    source: "Nuxt.js",
    target: "Vue.js",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "Nuxt.js is a Vue.js framework",
  },
  {
    source: "SvelteKit",
    target: "Svelte",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "SvelteKit is a Svelte framework",
  },

  // ─── ORM Requirements ─────────────────────────────────────────────────

  {
    source: "Prisma",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "TypeORM",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Sequelize",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Mongoose",
    target: "MongoDB",
    type: RELATIONSHIP_TYPES.REQUIRES,
    note: "Mongoose is a MongoDB ODM — requires MongoDB",
  },
  {
    source: "Hibernate",
    target: "Java",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Spring Data JPA",
    target: "Hibernate",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "Spring Data JPA uses Hibernate as the default JPA provider",
  },
  {
    source: "Django ORM",
    target: "Django",
    type: RELATIONSHIP_TYPES.EXTENDS,
  },
  {
    source: "SQLAlchemy",
    target: "Python",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "GORM",
    target: "Go",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },

  // ─── Framework Extends ────────────────────────────────────────────────

  {
    source: "NestJS",
    target: "Express",
    type: RELATIONSHIP_TYPES.EXTENDS,
    note: "NestJS uses Express (or Fastify) under the hood by default",
  },

  // ─── Build Tool Requirements ──────────────────────────────────────────

  {
    source: "Webpack",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Vite",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "esbuild",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },
  {
    source: "Rollup",
    target: "Node.js",
    type: RELATIONSHIP_TYPES.REQUIRES,
  },

  // ─── Conflicts ────────────────────────────────────────────────────────

  {
    source: "Express",
    target: "Fastify",
    type: RELATIONSHIP_TYPES.CONFLICTS,
    note: "A project typically uses one HTTP framework, not two",
  },
  {
    source: "Express",
    target: "Koa",
    type: RELATIONSHIP_TYPES.CONFLICTS,
  },
  {
    source: "Fastify",
    target: "Koa",
    type: RELATIONSHIP_TYPES.CONFLICTS,
  },
  {
    source: "Django",
    target: "Flask",
    type: RELATIONSHIP_TYPES.CONFLICTS,
  },
  {
    source: "Django",
    target: "FastAPI",
    type: RELATIONSHIP_TYPES.CONFLICTS,
  },
  {
    source: "Flask",
    target: "FastAPI",
    type: RELATIONSHIP_TYPES.CONFLICTS,
  },
  {
    source: "Prisma",
    target: "Sequelize",
    type: RELATIONSHIP_TYPES.CONFLICTS,
    note: "A project typically uses one ORM at a time",
  },
  {
    source: "TypeORM",
    target: "Sequelize",
    type: RELATIONSHIP_TYPES.CONFLICTS,
  },

  // ─── Suggestions ──────────────────────────────────────────────────────

  {
    source: "Express",
    target: "PostgreSQL",
    type: RELATIONSHIP_TYPES.SUGGESTS,
  },
  {
    source: "NestJS",
    target: "TypeORM",
    type: RELATIONSHIP_TYPES.SUGGESTS,
  },
  {
    source: "NestJS",
    target: "Prisma",
    type: RELATIONSHIP_TYPES.SUGGESTS,
  },
  {
    source: "Spring Boot",
    target: "Hibernate",
    type: RELATIONSHIP_TYPES.SUGGESTS,
  },
  {
    source: "Django",
    target: "PostgreSQL",
    type: RELATIONSHIP_TYPES.SUGGESTS,
  },
  {
    source: "Next.js",
    target: "Vercel",
    type: RELATIONSHIP_TYPES.SUGGESTS,
  },
]);
