import { takeEvery, put } from 'redux-saga/effects'
import { getArticleByPage, getFeedArticleByPage } from '../../endpoints'

function* loadArticles ({ payload }) {
  try {
    const { data } = yield getArticleByPage(payload)
    yield put({
      type: 'loadArticlesSuccess',
      payload: { articles: data.articles, articlesCount: data.articlesCount }
    })
  } catch (error) {
    const message = error.response.data.message
    yield put({ type: 'loadArticlesFailed', payload: message })
  }
}

function* loadFeedArticles ({ payload }) {
  try {
    const { data } = yield getFeedArticleByPage(payload)
    yield put({
      type: 'loadArticlesSuccess',
      payload: { articles: data.articles, articlesCount: data.articlesCount }
    })
  } catch (error) {
    const message = error.response.data.message
    yield put({ type: 'loadArticlesFailed', payload: message })
  }
}

function* loadMoreArticles ({ payload }) {
  try {
    const { data } = yield getArticleByPage(payload)
    yield put({
      type: 'loadMoreArticlesSuccess',
      payload: { articles: data.articles, articlesCount: data.articlesCount }
    })
  } catch (error) {
    const message = error.response.data.message
    yield put({ type: 'loadArticlesFailed', payload: message })
  }
}

function* loadMoreFeedArticles ({ payload }) {
  try {
    const { data } = yield getFeedArticleByPage(payload)
    yield put({
      type: 'loadMoreArticlesSuccess',
      payload: { articles: data.articles, articlesCount: data.articlesCount }
    })
  } catch (error) {
    const message = error.response.data.message
    yield put({ type: 'loadArticlesFailed', payload: message })
  }
}

export default function* articleSaga () {
  yield takeEvery('loadArticles', loadArticles)
  yield takeEvery('loadMoreArticles', loadMoreArticles)
  yield takeEvery('loadFeedArticles', loadFeedArticles)
  yield takeEvery('loadMoreFeedArticles', loadMoreFeedArticles)
}
