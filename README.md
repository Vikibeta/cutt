# cutt
> 一个基于webpack，切图写静态页面的脚手架工具

### why cutt

* 有切图，写静态页面、多页面的需求，需要快速搭建项目
* 页面热更新，使用[scss](https://www.sass.hk/)，借助[webpack](https://webpack.js.org/)编译打包，且不需要繁琐的配置

### 安装

* npm

```
// npm全局安装cutt
npm install cutt -g
	
// 使用cutt <project-name> 生成项目
cutt website
	
// 进入项目
cd website
	
// 安装依赖
npm install
	
// 开发
npm run dev
```
* git(可选)

```
// 下拉项目
git clone https://github.com/jackshawn/cutt.git
	
// 进入项目
cd cutt
	
// 安装依赖
npm install
	
// 开发
npm run dev
```

### 开发

* 目录结构

```
cutt
├── dist/                                        # 打包文件目录
├── src/                                         # 源文件目录
│   ├── common/                                  # 公共页面目录
│   │   ├── header.html                          # 公共的页头
│   │   └── footer.html                          # 公共的页脚
│   ├── img/                                     # 图片目录
│   │   ├── favicon.jpg
│   │   └── logo.jpg
│   ├── js/                                      # js目录
│   │   ├── index.js                             # index页面的入口文件
│   │   ├── about.js                             # about页面的入口文件
│   │   ├── common.js                            # 公共的js文件
│   │   └── utils.js                             # 公共工具函数
│   ├── scss/                                    # 样式目录
│   │   ├── index.scss                           # index页面样式
│   │   ├── about.scss                           # about页面的样式
│   │   ├── common.scss                          # 公共的样式
│   │   ├── reset.css                            # 浏览器样式重置文件
│   │   └── variable.scss                        # scss变量文件
│   ├── index.html                  
│   └── about.html
├── package.json
├── README.md                  
├── cutt.config.js                               # cutt配置文件
└── webpack.config.js                            # webpack配置文件
```

* cutt.config.js

```
var config = {
    pages: ['index', 'about'], // 必选, 页面名, 不需要后缀
    host: '0.0.0.0', // 可选, 开发地址, 默认localhost
    port: 8081 // 可选, 端口, 默认8080
};

module.exports = config;
```

* .html

```
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>cutt</title>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="keywords" content="some,seo,keywords">
    <meta name="description" content="some seo description">
    <link rel="shortcut icon" href="img/favicon.jpg">
</head>
<body>
    #include("./common/header.html")
    <div class="main">
        <p><img src="img/logo.jpg" alt=""></p>
        <a class="nav" href="about.html">nav to about.html</a>
        <p class="common-color">colored from common.scss</p>
        <p class="color">colored from index.scss</p>
    </div>
    #include("./common/footer.html")
</body>
</html>
```
需要编写的静态页面, 可以使用`#include("./common/footer.html")`引用复用的页面部分；

* 添加页面

	webpack处理多页面搞起来还是有点麻烦，当添加新页面时需要：

1. 停止服务
2. 相应目录下新建文件：new.html, new.scss, new.js
3. `cutt.config.js`添加新页面名`pages: ['index', 'about', 'new']`
4. `npm run dev`重新启动服务

### 打包

```
npm run build
```
编译打包后的文件在`dist/`下，可以双击浏览器打开；

### TODO

* 支持less
* 考虑引入jQuery
