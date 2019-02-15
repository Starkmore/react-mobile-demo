This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### react 移动端项目搭建主要使用react+redux+react-router+axios+antd-mobile+webpack;react-router基于4.x版本，webpack基于4.x,antd-mobile基于2.2.x

#### 1.项目环境
node/npm(yarn)
#### 2.安装 create-react-app

```
$ npm install -g create-react-app 
```
执行  
```
create-react-app projectName
```
最后 可得到 一个create-reac-app 脚手架的基础项目，最初的项目目录并没有config/scripts目录，需执行
```
npm  run eject
```
可得到一个完整的项目 目录

![image](http://a3.qpic.cn/psb?/V14HRW3d1ZKZAx/KbXpf2edeVsXuls0Z3ifdn.QfHvulAkOdln89SKmzhM!/m/dLYAAAAAAAAAnull&bo=2wAfAQAAAAADB.c!&rf=photolist&t=5)

整体 目结构如下

    ---
      |---- build  webpack         打包文件
      |---- config index           webpack 4.x 配置
      |---- node_modules           安装依赖包
      |---- pbulic                 公共资源
      |---- scripts                文件启动加载包
      |----src
             |---- assets/         js/css/icon/image存放
             |---- components/     公共组件
             |---- config          相关配置
             |---- utils           公共工具
             |---- router          路由
             |---- views           视图部分
             |---- app.js          视图路由渲染
             |---- index.js        主入口
      |---- package.json           静态文件存放 
      
      
 #### 3.antd-mobile2.x安装 （UI组件）
 
```
 $ npm install antd-mobile --save
```
 **使用 babel-plugin-import（推荐）进行模块加载**。
 ```
 $ npm  install  babel-plugin-import --save
 ```
 在config/webpack.config.js文件中的rules添加,位置很重要，style为true和"css"主要区别在于主题样式改变，如不需要改变主  
 题样式 style则为"css",下面需要配置主题色这里就直接写成true
```js
 
  ["import", {"libraryName": "antd-mobile", "libraryDirectory":"es", "style": true}],
```
```
{
  ...
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: paths.appSrc,
      loader: require.resolve('babel-loader'),
      options: {
        customize: require.resolve(
          'babel-preset-react-app/webpack-overrides'
        ),
        
        plugins: [
          ["import", {"libraryName": "antd-mobile", "libraryDirectory":"es", "style": true}],
          [
            require.resolve('babel-plugin-named-asset-import'),
            {
              loaderMap: {
                svg: {
                  ReactComponent:
                    '@svgr/webpack?-prettier,-svgo![path]',
                },
              },
            },
          ],
        ],
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        cacheCompression: isEnvProduction,
        compact: isEnvProduction,
      },
    },
  ...
}
```
至此在项目中就能正常使用按需加载的antd-mobile;

**主题设置**

首先在 package.json中配置：
```
    {
        ...
          "theme": {
            "brand-primary": "#54B9D1",
            "brand-primary-tap": "#64C1D6"
        }
        ...
    }
```
在webpack.config.js文件中 获取主题色，在rules配置主题色
```
    //  antd mobile 主题色定制
    const theme = require('./../package.json').theme;
    
    rules:[
       ...
        {
          test: /\.less$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "less-loader",
            options: {
              sourceMap: true,
              modifyVars: theme,
              javascriptEnabled: true,
            }
          }]
        }
       ...
    ]

```
重启项目，主题色配置成功   
[antd安装及主体配置，参考相关资料，有详细说明](https://blog.csdn.net/focusdroid/article/details/85381042)

![image](http://m.qpic.cn/psb?/V14HRW3d1ZKZAx/XHCp.AcRLjL6LUAt.3uZiLSl9x2uf26U1QtfeOl*.2E!/b/dDUBAAAAAAAA&bo=eQGeAgAAAAARB9Q!&rf=viewer_4)



 #### 4.react-router4.x安装
 温馨提示: 此过程不包含怎么使用,详细说明请参见官方文档及我的个人[demo](https://note.youdao.com/)
 ```
 $  npm install react-router react-router-dom  --save-dev
 ```
 
 #### 5.代理配置proxy
 在实际应用过程中需要请求后台接口，需要一定代理接口
 代理之前确保 已经  npm run eject
1.  create-react-app 的版本在低于 2.0 的时候可以在 package.json 增加 proxy 配置， 配置成如下：
```
    "proxy":{
        "/api/**":{
          "target":"http://api.sqydt.easysq.cn/api/",
          "changeOrigin": true
        }
    }
```
2.  create-react-app 的版本高于 2.0 版本的时候在 package.json 只能配置 string 类型， 配置成如下：
```
    "proxy": "http://api.sqydt.easysq.cn/api/",
```
3.  第三种代理方式推荐 ,安装  http-proxy-middleware ,新建src/setupProxy.js 文件, 配置成如下：(可配置多个代理)
```
 $  npm install http-proxy-middleware  --save
```
```
    const proxy = require("http-proxy-middleware");
    
    module.exports = function(app) {
      app.use(
        proxy("/api", {
          target: "http://api.sqydt.easysq.cn/api",
          changeOrigin: true,
          pathRewrite: {
            "/api": ""
          }
        })
      );
      app.use(
        proxy("/base/**", {
          target: "http://192.168.0.136:3000/",
          changeOrigin: true
        })
      );
    };
```

#### 6. react-redux(react状态管理)

 温馨提示: 此过程不包含怎么使用,详细说明请参见官方文档及我的个人[demo](https://note.youdao.com/)
 
 基础安装，按照项目需求按需引入
```
$ npm install react-redux redux redux-thunk  --save-dev
```

### 7. css预处理安装（Sass）
在最新的脚手架中webpack已经配置sass，只需要
```
 $  npm  install  sass-loader  --save



 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify