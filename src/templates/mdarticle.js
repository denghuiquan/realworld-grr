import { graphql } from 'gatsby'
import React from 'react'
import HeadSEO from '../components/HeadSEO'

export default function Article ({ data, pageContext }) {
  const { slug } = pageContext
  const tagStyle = {
    fontWeight: 'bolder',
    borderRadius: '20px',
    backgroundColor: 'cyan',
    padding: '4px 10px',
    marginLeft: '5px'
  }
  return (
    <>
      <HeadSEO
        title={`Article Detail for ${slug}`}
        description={data.markdownRemark.excerpt}
      />

      <div>
        <h1>{slug}.md</h1>
        <h2>{data.markdownRemark.frontmatter.title}</h2>
        <p>Published: {data.markdownRemark.frontmatter.date}</p>
        <p>
          Categories: {data.markdownRemark.frontmatter.categories}
          <span style={{ float: 'right' }}>
            {data.markdownRemark.frontmatter.tags.map(tag => (
              <code style={tagStyle} key={tag}>
                {tag}
              </code>
            ))}
          </span>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        ></div>
      </div>
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        categories
        title
        tags
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
