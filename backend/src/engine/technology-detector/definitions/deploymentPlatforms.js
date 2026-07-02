import { RULE_TYPES } from "./ruleTypes.js";

/**
 * DEPLOYMENT_DEFINITIONS
 *
 * Data-driven deployment platform detection definitions.
 *
 * All definitions use storage: "deployment".
 * All are GLOBAL — no ecosystem restriction.
 * Detected primarily by file presence.
 *
 * Note: Some technologies span categories.
 * Docker appears in both buildTools and deployment —
 * the same technology can be stored in multiple stores
 * via separate definitions. The graph builder handles
 * deduplication by name.
 */
export const DEPLOYMENT_DEFINITIONS = Object.freeze([

  {
    name: "Docker",
    storage: "deployment",
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
        patterns: ["docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"],
        weight: 25,
      },
    ],
  },

  {
    name: "Vercel",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["vercel.json", ".vercel"],
        weight: 40,
      },
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["vercel"],
        weight: 25,
      },
    ],
  },

  {
    name: "Netlify",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["netlify.toml", "_redirects", "_headers"],
        weight: 40,
      },
    ],
  },

  {
    name: "Heroku",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["Procfile"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["app.json"],
        weight: 15,
      },
    ],
  },

  {
    name: "GitHub Actions",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: [".github"],
        weight: 40,
      },
    ],
  },

  {
    name: "AWS",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["serverless.yml", "serverless.yaml", "serverless.ts"],
        weight: 40,
      },
      {
        type: RULE_TYPES.FILE,
        patterns: ["samconfig.toml", "template.yaml"],
        weight: 25,
      },
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["aws-sdk", "@aws-sdk/*"],
        weight: 20,
      },
    ],
  },

  {
    name: "Fly.io",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["fly.toml"],
        weight: 40,
      },
    ],
  },

  {
    name: "Render",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["render.yaml"],
        weight: 40,
      },
    ],
  },

  {
    name: "Railway",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["railway.json", "railway.toml"],
        weight: 40,
      },
    ],
  },

  {
    name: "Kubernetes",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["k8s.yml", "k8s.yaml", "kubernetes.yml", "kubernetes.yaml"],
        weight: 40,
      },
      {
        type: RULE_TYPES.DEPENDENCY,
        patterns: ["@kubernetes/client-node"],
        weight: 25,
      },
    ],
  },

  {
    name: "Terraform",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["main.tf", "terraform.tfvars"],
        weight: 40,
      },
    ],
  },

  {
    name: "Nginx",
    storage: "deployment",
    ecosystem: null,
    minimumConfidence: 30,
    rules: [
      {
        type: RULE_TYPES.FILE,
        patterns: ["nginx.conf"],
        weight: 40,
      },
    ],
  },
]);
