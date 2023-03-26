import { graphql, Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import HeadSEO from '../components/HeadSEO'
import Preview from '../components/Preview'
import Sidebar from '../components/Sidebar'
import Toggle from '../components/Toggle'

export default function IndexPage ({ data }) {
  const dispatch = useDispatch()
  const articleReducer = useSelector(state => state.articleReducer)
  const [tab, setTab] = useState('global')

  const toggleTab = newtab => {
    if (newtab) {
      setTab(newtab)
      return
    }
    // 处理不传参数的情况
    switch (tab) {
      case 'your':
        setTab('global')
        break

      case 'global':
        setTab('your')
        break
      default:
        setTab(tab)
    }
  }

  // 实现客户端的动态获取最新文章数据
  useEffect(() => {
    switch (tab) {
      case 'your':
        dispatch({
          type: 'loadFeedArticles',
          payload: { offset: 0, limit: 10 }
        })
        break

      case 'global':
      default:
        dispatch({ type: 'loadArticles', payload: { offset: 0, limit: 10 } })
    }
  }, [tab])

  const articles = articleReducer.articles || data.allArticle.nodes

  const loadMoreArticles = () => {
    dispatch({
      type: tab === 'your' ? 'loadMoreFeedArticles' : 'loadMoreArticles',
      payload: { offset: articleReducer.articles.length, limit: 20 }
    })
  }

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
              <Toggle tab={tab} toggleTab={toggleTab} />
              {articles.map(article => (
                <Preview article={article} key={article.slug} />
              ))}
              <div className='article-preview'>
                {articleReducer.success &&
                  articleReducer.articlesCount !== 0 &&
                  articleReducer.articles.length <
                    articleReducer.articlesCount && (
                    <a onClick={() => loadMoreArticles()}>加载更多...</a>
                  )}
                {!articleReducer.success && <p>loading...</p>}
                {articleReducer.success &&
                  articleReducer.articles.length === 0 &&
                  articleReducer.articlesCount === 0 && (
                    <>
                      No articles are here... yet. please follow some author
                      first.
                    </>
                  )}
              </div>
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
  query {
    allArticle(skip: 0, limit: 10) {
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
