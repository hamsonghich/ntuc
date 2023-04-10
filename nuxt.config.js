export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'BIXFlexi',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
          integrity: 'sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN',
          crossorigin: 'anonymous'
        },
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        } ,
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
        }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/froala-editor@latest/js/froala_editor.pkgd.min.js' },
      ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      '~/assets/css/style.css',
      '~/assets/css/paginate/index.css',
      '~/node_modules/froala-editor/css/froala_editor.pkgd.min.css',
      '~/node_modules/froala-editor/css/froala_style.min.css'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '@/plugins/main.js',
      '@/plugins/i18n.js',
      '@/plugins/vuelidate.js',
      '@/plugins/vue-simple-suggest.js',
      '@/plugins/autocomplete.js',
      '@/plugins/dateTimePicker.js',
      '@/plugins/otpInput.js',
      '@/plugins/vue-select.js',
      '@/plugins/paginate.js',
      '@/plugins/alert.js',
      '@/plugins/vue-typed-js',
      '@/plugins/vue-multiselect.js',
      '@/plugins/lightgallery.js',
      '@/plugins/vueCurrencyInput.js',
      '@/plugins/froala.js',
      '@/plugins/vue-magic-grid.js'
      /*'~/plugins/paginate.js',
      '@/plugins/vue-carousel-3d.js',
      '@/plugins/progress-bar.js',
      '@/plugins/datePicker.js',
      '@/plugins/vueCurrencyInput.js',
      '@/plugins/vue2-editor.js',
      '@/plugins/vue-tour.js',
      '@/plugins/sleep.js',
      '@/plugins/vue-toastification.js',
      '@/plugins/lightgallery.js',*/
    ],

    router: {
      base: process.env.BASE_URL ? process.env.BASE_URL : '/qb/v.2',
      mode: process.env.ROUTER_MODE ? process.env.ROUTER_MODE : 'hash',
      middleware: ['i18n']
    },
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      '@nuxtjs/dayjs',
      '@nuxtjs/device'
    ],

    bootstrapVue: {
      icons: true
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/bootstrap
      'bootstrap-vue/nuxt',
      'nuxt-material-design-icons'
    ],

    env: {
      API_URL: process.env.API_URL,
      HOST: process.env.HOST,
      SUP_EMAIL: process.env.SUP_EMAIL,
      PORT: process.env.PORT,
      HR_URL: process.env.HR_URL,
      MAIN_URL: process.env.MAIN_URL,
      FROALA_LICENSE_KEY: process.env.FROALA_LICENSE_KEY,
      YOUR_LICENSE_KEY_GOES_HERE: process.env.YOUR_LICENSE_KEY_GOES_HERE,
      IMAGE_URL: process.env.IMAGE_URL
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      extend(config, ctx) {
        if (ctx.isDev) {
          config.devtool = ctx.isclient ? 'source-map' : 'inline-source-map'
        }
      }
    }
  }
