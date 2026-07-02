import { ECOSYSTEMS } from "./ecosystems.js";
import { RULE_TYPES } from "./ruleTypes.js";

/**
 * ORM_DEFINITIONS
 *
 * Data-driven ORM/ODM detection definitions.
 *
 * Each definition declares:
 *   - storage: "orms" (all ORMs go to the same store)
 *   - ecosystem: scoped or null
 *   - rules: multi-evidence detection
 *
 * Adding a new ORM:
 *   - Add a new object to this array
 *   - No detector code changes needed
 */
export const ORM_DEFINITIONS = Object.freeze([

  // ─── Node.js ────────────────────────────────────────────────────────────

  {
    name: "Prisma",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@prisma/client", "prisma"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["@prisma/client"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["schema.prisma"],
        weight: 25,
      },
    ],
  },

  {
    name: "TypeORM",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["typeorm"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["typeorm"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["ormconfig.json", "ormconfig.js", "ormconfig.ts"],
        weight: 25,
      },
    ],
  },

  {
    name: "Sequelize",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["sequelize"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["sequelize"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: [".sequelizerc"],
        weight: 25,
      },
    ],
  },

  {
    name: "Mongoose",
    storage: "orms",
    category: "odm",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["mongoose"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["mongoose"],
        weight: 20,
      },
      {
        type: RULE_TYPES.MEMBER_CALL,
        patterns: ["mongoose.connect", "mongoose.model", "mongoose.Schema"],
        weight: 15,
      },
    ],
  },

  {
    name: "Drizzle ORM",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["drizzle-orm"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["drizzle-orm"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["drizzle.config.ts", "drizzle.config.js"],
        weight: 25,
      },
    ],
  },

  {
    name: "Knex.js",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["knex"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["knex"],
        weight: 20,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["knexfile.js", "knexfile.ts"],
        weight: 25,
      },
    ],
  },

  // ─── Java ────────────────────────────────────────────────────────────────

  {
    name: "Hibernate",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "org.hibernate:hibernate-core",
          "org.hibernate.orm:hibernate-core",
          "org.springframework.boot:spring-boot-starter-data-jpa",
        ],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["hibernate.cfg.xml", "persistence.xml"],
        weight: 25,
      },
    ],
  },

  {
    name: "Spring Data JPA",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["org.springframework.boot:spring-boot-starter-data-jpa"],
        weight: 40,
      },
      {
        type: RULE_TYPES.ANNOTATION,
        patterns: ["@Entity", "@Repository"],
        weight: 25,
      },
    ],
  },

  {
    name: "MyBatis",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "org.mybatis:mybatis",
          "org.mybatis.spring.boot:mybatis-spring-boot-starter",
        ],
        weight: 40,
      },
    ],
  },

  // ─── Python ──────────────────────────────────────────────────────────────

  {
    name: "SQLAlchemy",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["sqlalchemy", "SQLAlchemy"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["sqlalchemy"],
        weight: 20,
      },
    ],
  },

  {
    name: "Django ORM",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["django"],
        weight: 30,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["django.db"],
        weight: 25,
      },
    ],
  },

  {
    name: "Tortoise ORM",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["tortoise-orm"],
        weight: 40,
      },
    ],
  },

  // ─── PHP ─────────────────────────────────────────────────────────────────

  {
    name: "Eloquent",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.PHP,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["illuminate/database"],
        weight: 40,
      },
    ],
  },

  {
    name: "Doctrine",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.PHP,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["doctrine/orm", "doctrine/dbal"],
        weight: 40,
      },
    ],
  },

  // ─── Go ──────────────────────────────────────────────────────────────────

  {
    name: "GORM",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["gorm.io/gorm"],
        weight: 40,
      },
    ],
  },

  // ─── Rust ────────────────────────────────────────────────────────────────

  {
    name: "Diesel",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.RUST,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["diesel"],
        weight: 40,
      },
    ],
  },

  {
    name: "SeaORM",
    storage: "orms",
    category: "orm",
    ecosystem: ECOSYSTEMS.RUST,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["sea-orm"],
        weight: 40,
      },
    ],
  },
]);
