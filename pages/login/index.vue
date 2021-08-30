<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
            <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, error) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ error }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
const cookie = process.client ? require('js-cookie') : undefined;

export default {
  middleware: 'notAuthenticated',
  name: 'login',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 提交注册/登录表单
        const requestFn = this.isLogin ? login : register;
        const { data } = await requestFn({ user: this.user });

        console.log('data', data);

        // 存储用户信息
        this.$store.commit('setUser', data.user);
        // 存储到cookie
        cookie.set('user', JSON.stringify(data.user));

        // 跳转到首页
        this.$router.push('/');
      } catch (e) {
        // 错误处理
        this.errors = e.response.data.errors;
      }
    }
  }
}
</script>

<style>

</style>