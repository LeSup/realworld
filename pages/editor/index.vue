<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="handleSubmit">
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" required>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description" required>
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tag"
                    @keydown.enter="handleEnter"
                  >
                  <div class="tag-list" v-for="tag in article.tagList" :key="tag">{{ tag }}</div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" :disabled="formDisabled">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article';

const genArticle = () => {
  return {
    title: '',
    description: '',
    body: '',
    tagList: []
  }
};

export default {
  middleware: 'authenticated',
  name: 'editor',
  data () {
    return {
      tag: '',
      formDisabled: false,
      article: genArticle()
    }
  },
  methods: {
    handleEnter () {
      const tag = (this.tag || '').trim();
      if (!tag) return;
      if (this.article.tagList.includes(tag)) return;
      this.article.tagList.push(tag);
      this.tag = '';
    },
    async handleSubmit () {
      this.formDisabled = true;
      await createArticle({ article: this.article });
      this.article = genArticle();
      this.tag = '';
      this.formDisabled = false;
    }
  }
}
</script>

<style>

</style>