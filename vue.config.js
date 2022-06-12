const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
          '/api': {
              target: 'http://api.fanyi.baidu.com/api/trans/vip/', // 要代理的地址(开发阶段接口地址)，代理到本地访问，http://localhost:8080/api/
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': '' //这里的/其实就是代表根,可以理解为用/api代替target里的地址
              }

          },
      },
  },
  }
})
