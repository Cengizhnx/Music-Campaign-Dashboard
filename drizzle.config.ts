import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "aws-0-us-east-2.pooler.supabase.com",
    port: 6543,
    user: "postgres.ippmhkimbihxqrbysovi",
    password: "music.123456",
    database: "postgres",
    ssl: {
      rejectUnauthorized: false, // ✅ SSL sertifikasını zorunlu kılma
    },
  },
} satisfies Config;
