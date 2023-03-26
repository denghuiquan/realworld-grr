const path = require('path')

// 创建页面函数
async function createPages ({ graphql, actions }) {
  const { createPage } = actions

  // 获取模版的绝对路径
  const template = require.resolve('./src/templates/mdarticle.js')

  // 从数据层中获取模版所需要的数据
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  // 根据模版和数据创建页面
  return data.allMarkdownRemark.nodes.map(
    node =>
      node.fields?.slug && // 这里的前置判断是为了避免为strapi数据中的markdown内容创建文章页面，从而避免article.js在静态渲染时报错
      createPage({
        // 模版绝对路径
        component: template,
        // 访问地址
        path: `/mdarticle/${node.fields.slug}`,
        // 传递给模版的数据
        // 传递过去的数据可以在模版组件的props属性中获取到，属性为pageContext
        context: {
          slug: node.fields.slug
        }
      })
  )
}

const onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath &&
    node.fileAbsolutePath.endsWith('.md') // 这里前置判断是为了避免为strapi数据中的markdown内容在被gatsby-transformer-remark自动化创建markdown内容节点时为其添加slug属性
  ) {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    // 给节点信息node 添加 field
    // 最终添加的field会存放在node.fields对象中
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

module.exports = {
  createPages,
  onCreateNode
}
