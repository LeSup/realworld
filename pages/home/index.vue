<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  exact
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'home', query: { tab: 'tag' } }"
                  exact
                >
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{ name: 'profile', params: { username: article.author.username } }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                :to="{ name: 'profile', params: { username: article.author.username } }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ active: item === page }" v-for="item in total" :key="item">

                <nuxt-link
                  class="page-link"
                  :to="{ name: 'home', query: { page: item, tag, tab } }"
                >
                  {{ item }}
                </nuxt-link>

              </li>
            </ul>
          </nav>
          <!-- 分页 -->

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                :to="{ name: 'home', query: { tag: item, tab: 'tag' } }"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getAllArticles, getFeedArticles } from '@/api/article';
import { addFavorite, cancelFavorite } from '@/api/favorite';
import { getTags } from '@/api/tag';

export default {
  name: 'home',
  // query变化会调用asyncData方法
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    const { tag, tab } = query;
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const newTab = tab || (store.state.user ? 'your_feed' : 'global_feed');
    const getArticles = tab === 'your_feed' ? getFeedArticles : getAllArticles;

    const [ { data: articlesData }, { data: tagsData } ] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags(),
    ]);

    const { tags } = tagsData;
    if (tags.length > 20) tags.splice(20);
    
    const { articles, articlesCount } = articlesData;
    articles.forEach(article => article.favoriteDisabled = false);

    return {
      articles,
      articlesCount,
      tags,
      page,
      limit,
      tag,
      tab: newTab
    };
  },
  computed: {
    ...mapState(['user']),
    total() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await cancelFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        // 点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    }
  }
}
</script>

<style>

</style>