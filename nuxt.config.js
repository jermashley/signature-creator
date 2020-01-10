const env = require(`dotenv`).config().parsed

export default {
  mode: `universal`,

  env: {
    baseUrl: env.BASE_URL || `http://localhost:3000`,
  },

  auth: {
    redirect: {
      home: false,
      login: false,
    },

    strategies: {
      auth0: {
        domain: env.AUTH0_DOMAIN || ``,
        client_id: env.AUTH0_CLIENT || ``,
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
    title: env.npm_package_name || ``,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      {
        hid: `description`,
        name: `description`,
        content: env.npm_package_description || ``,
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
    // Doc: https://github.com/nuxt-community/eslint-module
    `@nuxtjs/eslint-module`,
    // Doc: https://github.com/nuxt-community/stylelint-module
    `@nuxtjs/stylelint-module`,
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    `@nuxtjs/tailwindcss`,
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    `@nuxtjs/axios`,
    `@nuxtjs/dotenv`,
    `@nuxtjs/auth`,
    `nuxt-fontawesome`,
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  fontawesome: {
    imports: [
      {
        set: `@fortawesome/pro-duotone-svg-icons`,
        icons: [
          `faSignIn`,
          `faSignOut`,
          `faStar`,
          `faHomeAlt`,
          `faToggleOff`,
          `faToggleOn`,
          `faDownload`,
        ],
      },
    ],
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
