<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="followDisabled"
              @click="handleClick"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ !profile.following ? 'Follow' : 'UnFollow' }} {{ profile.username }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'my' }"
                  :to="{ name: 'profile', params: { username }, query: { tab: 'my' } }"
                  exact
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'favorited' }"
                  :to="{ name: 'profile', params: { username }, query: { tab: 'favorited' } }"
                  exact
                >
                  Favorited Articles
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
                  class="author"
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
            <nuxt-link
              class="preview-link"
              :to="{ name: 'article', params: { slug: article.slug } }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >{{ tag }}</li>
              </ul>
            </nuxt-link>
          </div>


        </div>

      </div>
    </div>

    </div>
</template>

<script>
import { getProfile, followUser, unFollowUser } from '@/api/user';
import { getAllArticles } from '@/api/article';
import { addFavorite, cancelFavorite } from '@/api/favorite';

export default {
  middleware: 'authenticated',
  name: 'profile',
  // query变化会调用asyncData方法
  watchQuery: ['tab'],
  data () {
    return {
      followDisabled: false,
      tab: ''
    };
  },
  async asyncData ({ query, params }) {
    const { tab = 'my' } = query;
    const { username } = params;

    const articleParams = {};
    if (tab === 'my') {
      articleParams.author = username;
    } else {
      articleParams.favorited = username;
    }
    // 并行请求
    const [{ data: profileData }, { data: articlesData }] = await Promise.all([
      // 个人简介
      getProfile(username),
      // 个人文章
      getAllArticles(articleParams)
    ]);
    // 解析文章
    const { articles, articlesCount } = articlesData;
    articles.forEach(article => article.favoriteDisabled = false);
    // 返回数据
    return {
      ...profileData,
      articles,
      username,
      tab
    };
  },
  methods: {
    async handleClick () {
      const { username, following } = this.profile;
      
      const fetchFn = following ? unFollowUser : followUser;

      this.followDisabled = true;
      const { data } = await fetchFn(username);
      this.profile.following = data.profile.following;
      this.followDisabled = false;
    },
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