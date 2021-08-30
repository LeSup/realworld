const cookieParser = process.server ? require('cookieparser') : undefined;

export const state = () => {
  return {
    user: null
  };
};

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  }
};

export const actions = {
  // 服务端渲染时触发
  // 将请求头中的cookie信息存储到store中，持久化登录状态
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const cookie = cookieParser.parse(req.headers.cookie);
      try {
        user = JSON.parse(cookie.user);
      } catch (e) {}
    }
    commit('setUser', user);
  }
};