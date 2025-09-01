/* eslint-disable node/no-process-env */
import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const envSchema = z.object({
    NODE_ENV: z.string(),
    TURSO_DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
    AUTH_GITHUB_CLIENT_ID: z.string(),
    AUTH_GITHUB_CLIENT_SECRET: z.string(),
    S3_REGION: z.string(),
    S3_ENDPOINT: z.string(),
    S3_ACCESS_KEY: z.string(),
    S3_ACCESS_SECRET: z.string(),
    S3_BUCKET: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

tryParseEnv(envSchema);
/* eslint-disable node/prefer-global/process */
export default envSchema.parse(process.env);
/* eslint-enable node/prefer-global/process */
