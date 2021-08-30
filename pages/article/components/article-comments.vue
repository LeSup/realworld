<template>
  <div class="row">

    <div class="col-xs-12 col-md-8 offset-md-2">

      <form class="card comment-form" @submit.prevent="addComment">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="comment"
            required
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" :disabled="postDisabled">
          Post Comment
          </button>
        </div>
      </form>
      
      <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <nuxt-link
            class="comment-author"
            :to="{ name: 'profile', params: { username: comment.author.username } }"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link
            class="comment-author"
            :to="{ name: 'profile', params: { username: comment.author.username } }"
          >
            {{ comment.author.username }}
          </nuxt-link>
          <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
          <span class="mod-options" v-if="comment.author.username === user.username">
            <!-- <i class="ion-edit"></i> -->
            <i class="ion-trash-a" @click="deleteComment(comment)"></i>
          </span>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getComments, addComment,  deleteComment } from '@/api/article';

export default {
  name: 'articleComments',
  data() {
    return {
      comment: '',
      comments: null,
      postDisabled: false,
    };
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    await this.getComments();
  },
  methods: {
    async getComments () {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async addComment () {
      this.postDisabled = true;
      await addComment(this.article.slug, { comment: { body: this.comment } });
      this.comment = '';
      this.postDisabled = false;
      await this.getComments();
    },
    async deleteComment(comment) {
      await deleteComment(this.article.slug, comment.id);
      await this.getComments();
    }
  }
}
</script>

<style>

</style>