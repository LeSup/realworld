import Vue from 'vue';
import Dayjs from 'dayjs';

// 注册拦截器
export default () => {
  Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return Dayjs(value).format(format);
  });
}