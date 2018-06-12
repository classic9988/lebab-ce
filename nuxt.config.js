import path from 'path'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'lebabnuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://unpkg.com/babel-standalone@6.25.0/babel.min.js' },
      { src: 'https://unpkg.com/babili-standalone@0.0.10/babili.min.js' },
      { src: 'https://cdn.rawgit.com/umdfied/a1781297dcfb57ca176551b44757d545/raw/9fda6d14d5a7eb980df21bcd8c632bdacedcd1a9/lebab.min.js' }
    ]
  },

  css: ['codemirror/lib/codemirror.css', '~/assets/scss/style.scss'],

  modules: [
    ['bootstrap-vue/nuxt', { css: false }], '~/modules/lebabVer'
  ],

  plugins: [{ src: '~plugins/nuxt-codemirror-plugin.js', ssr: false }],

  /*
   ** Customize the progress bar color
   */
  loading: false,
  loadingIndicator: {
    name: 'cube-grid',
    color: '#3B8070',
    background: 'white'
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file) => {
        return ['js'].includes(file)
      }
    }
  },
  dev: process.env.NODE_ENV === 'development',
  /*
   ** Build configuration
   */
  build: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: true
      }
    },
    extractCSS: true,
    generate: {
      workers: 4,
      workerConcurrency: 500,
      concurrency: 500,
      done ({ duration, errors, workerInfo }) {
        if (errors.length) {
          console.log(done)
        }
      }
    },
    /*
     ** Run ESLint on save
     */
    extend (config, { isDev, isClient }) {
      console.log(config.plugins)
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.inline$/,
        use: [{
          'loader': 'vue-style-loader',
          'options': {
            'sourceMap': false
          }
        },
        {
          'loader': 'css-loader',
          'options': {
            'sourceMap': false,
            'minimize': true,
            'importLoaders': 1,
            'alias': {
              '/assets': path.resolve(__dirname, 'assets'),
              '/static': path.resolve(__dirname, 'static')
            }
          }
        },
        {
          'loader': 'postcss-loader',
          'options': {
            'sourceMap': false,
            'useConfigFile': false
          }
        }
        ]
      })
    }
  }
}
