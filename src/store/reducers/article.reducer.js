export default (state = {}, action) => {
  switch (action.type) {
    case 'loadArticlesFailed':
      return { success: false, message: action.payload }

    case 'loadArticlesSuccess':
      return {
        success: true,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount
      }
    case 'loadMoreArticlesSuccess':
      return {
        success: true,
        articles: state.articles.concat(action.payload.articles),
        articlesCount: action.payload.articlesCount
      }

    default:
      return state
  }
}
