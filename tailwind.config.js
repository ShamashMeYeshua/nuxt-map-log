// tailwind.config.js
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.{js,vue,ts}",
        "./pages/**/*.{js,vue,ts}",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                // error: 'hsl(0, 87%, 67%)', // Or your preferred red shade
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark"], // Ensure desired themes are listed
    },
};
