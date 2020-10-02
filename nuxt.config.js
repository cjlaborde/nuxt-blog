export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // if you use spa you have to load data different instead of asyncData use data
  // mode: 'spa',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'WB Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Cool Web Development blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Open+Sans" }
    ]
  },

  loading: {
    color: 'blue',
    height: '5px',
    duration: 5000
  },

  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#fa923'
  // },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/styles/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // makes components global but now that is part of the default so not needed
    // '~plugins/core-components.js'
    '~plugins/date-filter.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-bee7d.firebaseio.com',
    credentials: false
  },



  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-bee7d.firebaseio.com',
    fbAPIKey: 'AIzaSyDyf0XEJpI4WIwH3EVmqSdV61SiRkLVf5Q'
  },
  // rootDir: '/blog'

  // set settings for vue router
  router: {
    // middleware that works in all routes
    // middleware: 'log'

    // used when serving app from a sub foulder, if not serve from the root
    // base: '/my-app',

    // allow you to programatically add your own route
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     path: '*',
    //     component: resolve(__dirname, 'pages/index.vue')
    //   })
    // }

    // set default active class
    // set active class
    // linkActiveClass: 'active',
  },
  // nuxt will look for this folder for all pages/components/middleware etc
  // srcDir: 'client-app'

  //used for animations when moving to different pages
  transition: {
    name: 'fade',
    mode: 'out-in'
  }

}