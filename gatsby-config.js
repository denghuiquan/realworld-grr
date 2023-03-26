require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  singleTypes: ['general'],
  collectionTypes: ['post', 'tag']
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    description: 'The best website builder tools is gatsby',
    author: 'denghuiquan',
    title: `Realworld in React`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    'gatsby-plugin-less',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'markdown',
        path: `${__dirname}/src/posts/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              withWebp: true
              // quality: 80
            }
          }
        ]
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-strapi',
      options: strapiConfig
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/app/*']
      }
    },
    {
      resolve: 'gatsby-source-realworld-list',
      options: {
        apiURL: process.env.REALWORLD_API_URL || 'https://api.realworld.io/api',
        endpoint: '/articles',
        sourceName: 'Article',
        params: {
          limit: 100
        }
      }
    },
    'gatsby-plugin-article',
    'gatsby-disable-404'
  ]
}
