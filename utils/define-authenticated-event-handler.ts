import type { H3Event, H3EventContext } from "h3";

import type { UserWithId } from "~/lib/auth";

type AuthenticatedEvent = H3Event & {
    context: H3EventContext & {
        user: UserWithId;
    };
};

export default function defineAuthenticatedEventHandler<T>(
    handler: (event: AuthenticatedEvent) => T,
) {
    return defineEventHandler(async (event) => {
        if (!event.context.user) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            })); // Return error if user is not authenticated
        }
        return handler(event as AuthenticatedEvent);
    });
};
/* export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        })); // Return error if user is not authenticated
    }
});
 */
