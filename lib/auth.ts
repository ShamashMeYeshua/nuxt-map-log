import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db/index"; 
import env from "./env";

export const auth = betterAuth({
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/get-session") {
                if (!ctx.context.session) {
                    return ctx.json({
                        session: null,
                        user: null,
                    });
                }
                return ctx.json(ctx.context.session);
            }
        }),
    },
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
    }),
    advanced: {
        database: {
            generateId: false, // Disable automatic ID generation
        },
        //generateId: false,
    },
    socialProviders: {
        github: { 
            clientId: env.AUTH_GITHUB_CLIENT_ID, 
            clientSecret: env.AUTH_GITHUB_CLIENT_SECRET, 
        }, 
    },
});
