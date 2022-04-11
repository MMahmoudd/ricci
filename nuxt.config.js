import i18n from "./config/i18n";
export default {

    target: "static",
    env: {
        APP_URL: "http://localhost:3000",
        API_URL: "./config/index.js" || "http://104.248.89.169:6100/api",
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - Ricci",
        title: "Ricci",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [
            { rel: "icon", type: "image/png", href: "/logo.png" },
            {
                href: "https://fonts.googleapis.com/css?family=Tajawal:400,500,700&display=swap&subset=arabic",
                rel: "stylesheet",
            },
            {
                rel: "stylesheet",
                href: "https://use.fontawesome.com/releases/v5.9.0/css/all.css",
            },
            {
                rel: "stylesheet",
                href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css",
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@/assets/style/main.scss", "@/assets/style/styleEn.scss"],
    // router: {
    //     middleware: 'i18n'
    // },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    // plugins: [
    //     { src: '~/plugins/i18n.js' },
    // ],
    // i18n : {
    //     skipSettingLocaleOnNavigate: true,
    // },
    //   generate: {
    //     routes: ['/', '/contact', '/ar', '/ar/contact']
    // },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        [
            "nuxt-i18n",
            {
                vueI18nLoader: true,
                defaultLocale: "en",
                locales: [{
                        code: "en",
                        name: "English",
                    },
                    {
                        code: "ar",
                        name: "Arabic",
                    },
                ],
                vueI18n: i18n,
            },
        ],
        // https://go.nuxtjs.dev/vuetify
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["bootstrap-vue/nuxt", "@nuxtjs/pwa", "cookie-universal-nuxt","nuxt-maintenance-mode"],
    pwa: {
        meta: {
            title: "Ricci",
            author: "Ricci",
        },
        manifest: {
            name: "Ricci",
            short_name: "Ricci",
            description: "Welcome in Ricci",
            lang: "en",
          display: "standalone",

          start_url: "/?standalone=true",
        },
        icon: {
            source: "./static/logo.png",
      },
  //     module: ['nuxt-maintenance-mode'],
  //       maintenance: {
  //   enabled: !!process.env.MAINTENANCE_MODE, // If given truthy value, activation maintenance mode on startup your nuxt application.
  //   path: '/maintenance', // maintenance fallback content routing.
  //   matcher: /^\/admin/ // Path to be in maintenance mode (regex).
  // },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
