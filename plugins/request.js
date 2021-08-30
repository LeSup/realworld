import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
});

export default ({ store }) => {
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state;
    if (user) {
      config.headers.Authorization = `Token ${user.token}`;
    }
    // 返回请求配置
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
};