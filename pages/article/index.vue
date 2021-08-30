<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <article-comments :article="article" />

    </div>

  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import ArticleMeta from './components/article-meta.vue';
import ArticleComments from './components/article-comments.vue';
import { getArticle } from '@/api/article';

const md = new MarkdownIt();

export default {
  name: 'article',
  components: {
    ArticleMeta,
    ArticleComments
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    article.body = md.render(article.body);
    return {
      article
    };
  }
}
</script>

<style>

</style>