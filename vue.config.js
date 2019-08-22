const webpack = require('webpack')

module.exports = {
  publicPath: '/pagenow',
  // 配置less
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  devServer: {
    port: 8081,
    // proxy: {
    //   '/pagenow': {
    //     target: 'http://localhost:8090',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       "^/pagenow": ""
    //     }
    //   }
    // }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  }
}

