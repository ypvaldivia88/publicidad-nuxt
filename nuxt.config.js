const i18n = require("./config/locales");
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "JCCE | Publicidades",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "An example project for building RESTful interfaces with Nuxt.js"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["@/assets/scss/app.scss"],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  },
  modules: [
    ["bootstrap-vue/nuxt"],
    // ["nuxt-i18n", i18n],
    ["@nuxtjs/axios"],
    ["@nuxtjs/auth"]
  ],
  plugins: [
    { src: "~/plugins/vue-notifications", ssr: false },
    { src: "~/plugins/vee-validate" },
    { src: "~/plugins/vue-moment" }
  ],
  router: {
    middleware: ["auth"]
  },
  bootstrapVue: {
    css: false //, // Or `css: false`
    // bootstrapVueCSS: false // Or `bvCSS: false`
  },
  auth: {
    strategies: {
      local: {
        token: { type: "Bearer" },
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "tokens.accessToken"
          },
          refresh: {
            url: "/refresh",
            method: "post",
            propertyName: "tokens.refreshToken"
          },
          logout: { url: "/logout", method: "post" },
          user: { url: "/users/me", method: "get", propertyName: false }
        }
      }
    }
  },
  axios: {
    /* set API_URL environment variable to configure access to the API
     */
    baseURL: process.env.API_URL || "http://localhost:4000/api/v1/",
    redirectError: {
      401: "/login",
      404: "/notfound"
    }
  }
};
