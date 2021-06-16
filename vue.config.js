const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: "/",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"));
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  pages: {
    
    index: {
      entry: "src/views/main.js",
      title: "数据大屏",
      template: "src/public/index.html", // 模板来源
    },
  },
  devServer: {
    host: "localhost",
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: null // 设置代理
    
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/less/variables.less') // 变量文件位置
      ]
      }
  }
};