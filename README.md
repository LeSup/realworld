# realworld

realworld 基于 nuxt 开发，实现部分页面的服务端渲染。

## 安装

通过`npm install`安装项目依赖。

## 启动

通过`npm run dev`启动项目，进行本地开发调试。

## 部署

部署前需要先通过`npm run build`构建项目，然后将项目上传至 node 服务器，运行`npm run start`运行项目。

### 自动部署

项目使用了 Github Action 模块，继承了自动化部署功能。触发自动化部署，只需要将项目提交至 github，然后本地 `git tag vx.x.x` 并提交。
