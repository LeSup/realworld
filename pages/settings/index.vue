<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUser">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" :disabled="formDisabled">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user';

export default {
  middleware: 'authenticated',
  name: 'settings',
  data () {
    return {
      user: {
        image: '',
        bio: '',
        email: '',
        username: '',
        password: ''
      },
      formDisabled: false
    };
  },
  async mounted() {
    this.getUser();
  },
  methods: {
    async getUser () {
      const { data } = await getUser();
      this.user = data.user;
    },
    async updateUser () {
      this.formDisabled = true;
      console.log(this.user);
      await updateUser({ user: this.user });
      this.formDisabled = false;
    }
  }
}
</script>

<style>

</style>