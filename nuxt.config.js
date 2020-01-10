require(`dotenv`).config()

export default {
  mode: `spa`,

  env: {
    baseUrl: process.env.BASE_URL || `http://localhost:3000`,
  },

  auth: {
    redirect: {
      home: `/`,
      login: `/login`,
      callback: `/`,
      creator: `/creator`,
      logout: `/logout`,
    },

    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN || ``,
        client_id: process.env.AUTH0_CLIENT || ``,
      },
    },
  },

  router: {
    middleware: [`auth`],
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || ``,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      {
        hid: `description`,
        name: `description`,
        content: process.env.npm_package_description || ``,
      },
    ],
    link: [
      { rel: `icon`, type: `image/x-icon`, href: `/favicon.ico` },
      {
        rel: `stylesheet`,
        href: `https://indestructibletype.com/fonts/Jost.css`,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: `#0F5DBD` },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    `@nuxtjs/eslint-module`,
    `@nuxtjs/stylelint-module`,
    `@nuxtjs/tailwindcss`,
    `@nuxtjs/dotenv`,
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [`@nuxtjs/axios`, `@nuxtjs/dotenv`, `@nuxtjs/auth`],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */
  },
}
