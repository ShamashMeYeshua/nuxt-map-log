import type { DrizzleError } from "drizzle-orm";

import db from "~/lib/db";
import { InsertLocation, location } from "~/lib/db/schema";

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        })); // Return error if user is not authenticated
    }

    const result = await readValidatedBody(event, InsertLocation.safeParse);

    if (!result.success) {
        const statusMessage = result
            .error
            .issues
            .map(issue => `${issue.path.join("")}: ${issue.message}`)
            .join("; ");

        const data = result
            .error
            .issues
            .reduce((errors, issue) => {
                errors[issue.path.join("")] = issue.message;
                return errors;
            }, {} as Record<string, string>);

        return sendError(event, createError({
            statusCode: 422,
            statusMessage,
            data,
        })); // Return error response if validation fails
    };

    try {
        const [created] = await db.insert(location).values({
            ...result.data,
            slug: result.data.name.toLowerCase().replace(/\s+/g, "-"),
            userId: event.context.user.id, // Use the authenticated user's ID
        }).returning();
        return created; // Return the created location
    }
    catch (e) {
        const error = e as DrizzleError;
        if (error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug") {
            throw createError({
                statusCode: 409,
                statusMessage: "Slug must be unique (the location name is used to generate the slug).",
            });
        }
        throw error;
    }
/*     const [created] = await db.insert(location).values({
      ...result.data,
      slug: result.data.name.toLowerCase().replace(/\s+/g, '-'),
      userId: event.context.user?.id || "",
    }).returning;

    return created; // Return validated data if successful
 */ });
