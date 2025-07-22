// import type { IncomingMessage, ServerResponse } from "node:http";

import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    modules: [
        "@nuxt/eslint",
        "@nuxt/icon",
        "@nuxtjs/color-mode",
        "@pinia/nuxt",
        "@vee-validate/nuxt",
        "nuxt-csurf",
        "nuxt-maplibre",
        //        "@nuxtjs/leaflet",
    ],
    eslint: {
        config: {
            standalone: false,
        },
    },
    css: ["~/assets/css/app.css", "maplibre-gl/dist/maplibre-gl.css"],
    /*     head: {
        script: [
            {
                src: "https://unpkg.com/maplibre-gl@^5.6.1/dist/maplibre-gl.js",
                defer: true, // Optional: defer script loading for better performance
            },
        ],
        link: [
            {
                rel: "stylesheet",
                href: "https://unpkg.com/maplibre-gl@^5.6.1/dist/maplibre-gl.css",
            },
        ],
    },
 */ vite: {
        plugins: [
            tailwindcss(),
        ],
        optimizeDeps: {
            include: [
                "maplibre-gl",
            ],
        },
        /*         server: {
            proxy: {
                "/.well-known": {
                    target: "http://localhost:3000", // Default Nuxt dev server port
                    changeOrigin: true,
                    bypass: (req: IncomingMessage, res: ServerResponse): boolean | void | undefined => {
                        if (req.url && req.url.includes("com.chrome.devtools.json")) {
                            res.statusCode = 404; // Return 404 for this specific file
                            res.end();
                            return true; // Bypass Nuxt’s router
                        }
                    },
                },
            },
        },
 */ },
    colorMode: {
        dataValue: "theme",
    },
});
