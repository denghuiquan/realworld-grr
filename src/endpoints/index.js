import axios from 'axios'

axios.defaults.baseURL = 'https://api.realworld.io/api'
const getToken = () => localStorage.getItem('token')

axios.defaults.headers = {
  Authorization: `Token ${getToken()}`
}

export function login (data) {
  return axios.post('/users/login', data)
}
export function getCurrentUser (token) {
  if (!token) token = getToken()
  return axios.get('/user', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function updateUser (user, token) {
  if (!token) token = getToken()
  return axios.put(
    '/user',
    { user },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
}

export function getArticleByPage (params = { offset: 0, limit: 50 }, token) {
  if (!token) token = getToken()
  return axios.get('/articles', {
    params,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function getArticleByAuthor (
  author,
  params = { offset: 0, limit: 10 },
  token
) {
  if (!token) token = getToken()
  return axios.get('/articles', {
    params: { author, ...params },
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function getFeedArticleByPage (params = { offset: 0, limit: 50 }, token) {
  if (!token) token = getToken()
  return axios.get('/articles/feed', {
    params,
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function getArticleBySlug (slug, token) {
  if (!token) token = getToken()
  return axios.get(`/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function getUserProfile (username, token) {
  if (!token) token = getToken()
  return axios.get(`/profiles/${username}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function followUser (username, token) {
  if (!token) token = getToken()

  return axios.post(`/profiles/${username}/follow`, null, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function unfollowUser (username, token) {
  if (!token) token = getToken()
  return axios.delete(`/profiles/${username}/follow`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function favoriteArticle (slug, token) {
  if (!token) token = getToken()

  return axios.post(`/articles/${slug}/favorite`, null, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export function unfavoriteArticle (slug, token) {
  if (!token) token = getToken()
  return axios.delete(`/articles/${slug}/favorite`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function getTags (token) {
  if (!token) token = getToken()
  return axios.get('/tags', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export function getArticleComments (slug, token) {
  if (!token) token = getToken()
  return axios.get(`/articles/${slug}/comments`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function addArticleComment (slug, comment, token) {
  if (!token) token = getToken()
  return axios.post(
    `/articles/${slug}/comments`,
    {
      comment: {
        body: comment
      }
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
}

export function deleteArticleComment (slug, id, token) {
  if (!token) token = getToken()
  return axios.delete(`/articles/${slug}/comments/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export function createArticle (article, token) {
  if (!token) token = getToken()
  return axios.post(
    `/articles/`,
    {
      article
    },
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  )
}

export default {
  login,
  getCurrentUser,
  getArticleByPage,
  getArticleByAuthor,
  getArticleBySlug,
  getUserProfile,
  followUser,
  unfollowUser,
  favoriteArticle,
  unfavoriteArticle,
  getTags,
  updateUser,
  getArticleComments
}
