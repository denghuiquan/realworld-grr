import { graphql, Link } from 'gatsby'
import React from 'react'
// import Header from '../components/Header'
import HeadSEO from '../components/HeadSEO'

export default function List ({ data }) {
  return (
    <>
      <HeadSEO title='List Page' description='List of Markdown Articles' />
      <div>
        {data.allMarkdownRemark.nodes.map(post => (
          <div key={post.id}>
            <p>{post.frontmatter.title}</p>
            <p>Published: {post.frontmatter.date}</p>
            <div>
              {post.excerpt}{' '}
              <Link to={`/mdarticle/${post.fields?.slug}`}>查看全文 </Link>
            </div>
            <br />
          </div>
        ))}
      </div>
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fields: { slug: { ne: null } } }) {
      nodes {
        fields {
          slug
        }
        internal {
          type
        }
        html
        excerpt
        headings {
          value
          depth
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
        }
        id
        fileAbsolutePath
      }
    }
  }
`
