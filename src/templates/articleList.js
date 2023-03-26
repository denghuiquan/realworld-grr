import { graphql, Link } from 'gatsby'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import HeadSEO from '../components/HeadSEO'
import Preview from '../components/Preview'
import Sidebar from '../components/Sidebar'
import Toggle from '../components/Toggle'

export default function ArticleList ({ data, pageContext }) {
  const dispatch = useDispatch()
  const articleReducer = useSelector(state => state.articleReducer)

  const { skip, limit } = pageContext
  // 实现客户端的动态获取最新文章数据
  useEffect(() => {
    dispatch({ type: 'loadArticles', payload: { offset: skip, limit } })
  }, [])

  const articles = articleReducer.articles || data.allArticle.nodes

  return (
    <>
      <HeadSEO
        title='Home Page'
        description='A place to share your knowledge.'
      />
      <div className='home-page'>
        <Banner />
        <div className='container page'>
          <div className='row'>
            <div className='col-md-9'>
              <Toggle />
              {articles.map(article => (
                <Preview key={article.slug} article={article} />
              ))}
            </div>
            <div className='col-md-3'>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allArticle(skip: $skip, limit: $limit) {
      nodes {
        id
        slug
        author {
          image
          username
        }
        tagList
        description
        favorited
        favoritesCount
        createdAt
        title
      }
    }
  }
`
