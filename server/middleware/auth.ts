import { createAuthClient } from "better-auth/vue";
import { auth } from "~/lib/auth";
import { useAuthStore } from "~/stores/auth";

export default defineEventHandler(async (event) => {
    if(event.path.startsWith("/dashboard")){
        const session = await auth.api.getSession({
            headers: event.headers
        });
        if (!session) {
            return sendRedirect(event, '/', 302);
        }
    }
});