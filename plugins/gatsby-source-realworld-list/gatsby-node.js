const axios = require('axios')
const { paginate } = require('gatsby-awesome-pagination')

const { createNodeHelpers } = require('gatsby-node-helpers')

async function sourceNodes (
  { actions, createNodeId, createContentDigest },
  { apiURL, sourceName, endpoint, params }
) {
  const { createNode } = actions

  let articles = await loadArticles(apiURL, endpoint, params)

  // 将文章数据添加到gatsby 数据层
  const { createNodeFactory } = createNodeHelpers({
    createContentDigest,
    createNodeId,
    typePrefix: sourceName
  })

  const createNodeObject = createNodeFactory('')
  articles.forEach(article => {
    article.id = `${sourceName}#${article.slug}`
    createNode(createNodeObject(article))
  })
}

/**
 * 获取文章数据
 * @param {*} apiURL
 * @param {*} endpoint
 * @param {*} params
 */
async function loadArticles (apiURL, endpoint, params) {
  let limit = params.limit || 100
  let offset = 0
  let result = []

  await load()

  return result

  async function load () {
    try {
      const { data } = await axios.get(`${apiURL}${endpoint}`, {
        params: { limit, offset }
      })

      result.push(...data.articles)
      if (result.length < data.articlesCount) {
        offset += limit
        await load()
      }
    } catch (error) {
      console.log(error)
    }
  }
}

async function createPages ({ graphql, actions }) {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allArticle {
        nodes {
          slug
        }
      }
    }
  `)

  paginate({
    createPage, // The Gatsby `createPage` function
    items: data.allArticle.nodes, // An array of objects
    itemsPerPage: 10, // How many items you want per page
    pathPrefix: '/article/list', // Creates pages like `/blog`, `/blog/2`, etc
    component: require.resolve('../../src/templates/articleList.js') // Just like `createPage()`
  })
}

module.exports = {
  sourceNodes,
  createPages
}
