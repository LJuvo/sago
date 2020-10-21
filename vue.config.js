// const path = require('path');

// let objectProject = {
//   index: {
//     entry: "src/views/main.js", // page 的入口
//     template: "src/public/index.html", // 模板来源
//     filename: "index.html", // 在 dist/index.html 的输出
//     chunks: ["chunk-vendors", "chunk-common", "index"]
//   }
// };
// let page = {};
// let projectname = process.argv[3]; // 获取执行哪个文件
// if (process.env.NODE_ENV == "development") {
//   page = objectProject;
// } else {
//   page[projectname] = objectProject[projectname];
//   page[projectname].filename = "index.html";
// }
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
    port: 7466,
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
// module.exports = {
//   publicPath: "./", // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
//   outputDir: "dist/" + projectname, //标识是打包哪个文件
//     //  放置静态资源的目录
//     assetsDir: "public",
  
//   //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
//   filenameHashing: true,
//   pages: page,
//   productionSourceMap: false, // 生产环境 sourceMap
//   devServer: {
//     open: true, // 项目构建成功之后，自动弹出页面
//     host: "localhost", // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
//     port: 8080, // 端口号，默认8080
//     https: false, // 协议
//     hotOnly: false, // 没啥效果，热模块，webpack已经做好了
//     // proxyTable: {
//     //   '/api': {
//     //     target:'http://www.riaeasy.com:9071', // 你请求的第三方接口
//     //     changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//     //     pathRewrite:{  // 路径重写，
//     //       '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
//     //     }
//     //   }
//     // }
//   },
//   pluginOptions: {
    // 'style-resources-loader': {
    //   preProcessor: 'less',
    //   patterns: [
    //     path.resolve(__dirname, './src/less/variables.less') // 变量文件位置
    //   ]
    //   }
//     },
// };
