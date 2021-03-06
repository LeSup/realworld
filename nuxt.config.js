/**
 * Nuxt.js 配置文件
 */

module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  router: {
    linkActiveClass: 'active',
    extendRoutes: (routes, resolve) => {
      routes.length = 0;
      routes.push({
        path: '/',
        name: 'layout',
        component: resolve(__dirname, 'pages/layout'),
        children: [{
          path: '',
          name: 'home',
          component: resolve(__dirname, 'pages/home'),
        }, {
          path: '/login',
          name: 'login',
          component: resolve(__dirname, 'pages/login'),
        }, {
          path: '/register',
          name: 'register',
          component: resolve(__dirname, 'pages/login'),
        }, {
          path: '/profile/:username',
          name: 'profile',
          component: resolve(__dirname, 'pages/profile'),
        }, {
          path: '/settings',
          name: 'settings',
          component: resolve(__dirname, 'pages/settings'),
        }, {
          path: '/editor/:slug?',
          name: 'editor',
          component: resolve(__dirname, 'pages/editor'),
        }, {
          path: '/article/:slug',
          name: 'article',
          component: resolve(__dirname, 'pages/article'),
        }]
      })
    }
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}