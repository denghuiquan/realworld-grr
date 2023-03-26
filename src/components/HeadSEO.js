import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
export default function HeadSEO ({ title, description, meta, lang }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: description || site.siteMetadata.description
        }
      ].concat(meta)}
    ></Helmet>
  )
}

HeadSEO.defaultProps = {
  title: 'My First Gatsby WebSite',
  description: '一个Gatsby演示项目案例',
  meta: [],
  lang: 'en'
}
