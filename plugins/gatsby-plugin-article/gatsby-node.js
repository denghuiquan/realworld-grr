async function createPages ({ actions, graphql }) {
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

  data.allArticle.nodes.forEach(article => {
    createPage({
      path: `/article/detail/${article.slug}`,
      component: require.resolve('../../src/templates/article.js'),
      context: {
        slug: article.slug
      }
    })
  })
}

module.exports = {
  createPages
}
