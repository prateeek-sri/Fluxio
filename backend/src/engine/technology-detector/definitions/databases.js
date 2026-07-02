import { ECOSYSTEMS } from "./ecosystems.js";
import { RULE_TYPES } from "./ruleTypes.js";

/**
 * DATABASE_DEFINITIONS
 *
 * Data-driven database client/driver detection definitions.
 *
 * Note: These detect that a project *uses* a particular database
 * (via its driver/client), not that a database server is running.
 *
 * All definitions use storage: "databases".
 */
export const DATABASE_DEFINITIONS = Object.freeze([

  // ─── Node.js ────────────────────────────────────────────────────────────

  {
    name: "PostgreSQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["pg", "pg-native", "@types/pg"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["pg"],
        weight: 20,
      },
    ],
  },

  {
    name: "MySQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["mysql", "mysql2", "@types/mysql"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["mysql", "mysql2"],
        weight: 20,
      },
    ],
  },

  {
    name: "MongoDB",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["mongodb"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["mongodb"],
        weight: 20,
      },
    ],
  },

  {
    name: "Redis",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["redis", "ioredis"],
        weight: 40,
      },
      {
        type: RULE_TYPES.IMPORT,
        patterns: ["redis", "ioredis"],
        weight: 20,
      },
    ],
  },

  {
    name: "SQLite",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["better-sqlite3", "sqlite3", "sqlite"],
        weight: 40,
      },
    ],
  },

  {
    name: "Elasticsearch",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.NODE,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "@elastic/elasticsearch",
          "elasticsearch",
        ],
        weight: 40,
      },
    ],
  },

  // ─── Python ──────────────────────────────────────────────────────────────

  {
    name: "PostgreSQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["psycopg2", "psycopg2-binary", "asyncpg"],
        weight: 40,
      },
    ],
  },

  {
    name: "MongoDB",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["pymongo", "motor"],
        weight: 40,
      },
    ],
  },

  {
    name: "Redis",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["redis", "aioredis"],
        weight: 40,
      },
    ],
  },

  {
    name: "MySQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.PYTHON,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["mysqlclient", "mysql-connector-python", "PyMySQL"],
        weight: 40,
      },
    ],
  },

  // ─── Java ────────────────────────────────────────────────────────────────

  {
    name: "PostgreSQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["org.postgresql:postgresql"],
        weight: 40,
      },
    ],
  },

  {
    name: "MySQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "com.mysql:mysql-connector-j",
          "mysql:mysql-connector-java",
        ],
        weight: 40,
      },
    ],
  },

  {
    name: "MongoDB",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "org.mongodb:mongodb-driver-sync",
          "org.springframework.boot:spring-boot-starter-data-mongodb",
        ],
        weight: 40,
      },
    ],
  },

  {
    name: "H2 Database",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["com.h2database:h2"],
        weight: 40,
      },
    ],
  },

  {
    name: "Redis",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.JAVA,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: [
          "org.springframework.boot:spring-boot-starter-data-redis",
          "redis.clients:jedis",
          "io.lettuce:lettuce-core",
        ],
        weight: 40,
      },
    ],
  },

  // ─── Go ──────────────────────────────────────────────────────────────────

  {
    name: "PostgreSQL",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["github.com/lib/pq", "github.com/jackc/pgx"],
        weight: 40,
      },
    ],
  },

  {
    name: "MongoDB",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["go.mongodb.org/mongo-driver"],
        weight: 40,
      },
    ],
  },

  {
    name: "Redis",
    storage: "databases",
    category: "database",
    ecosystem: ECOSYSTEMS.GO,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["github.com/go-redis/redis", "github.com/redis/go-redis"],
        weight: 40,
      },
    ],
  },
]);
