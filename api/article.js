import { request } from '@/plugins/request';

// 公共文章列表
export const getAllArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  });
}

// 关注用户的文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  });
}

// 关注用户的文章列表
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  });
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  });
}

// 增加文章评论
export const addComment = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  });
}

// 删除文章评论
export const deleteComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  });
}