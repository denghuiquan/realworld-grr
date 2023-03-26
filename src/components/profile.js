import { graphql, Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  followUser,
  getArticleByAuthor,
  getArticleByPage,
  getUserProfile,
  unfollowUser
} from '../endpoints'
import Preview from './Preview'

export default function Profile ({ username, location }) {
  const [followRequesting, setFollowRequesting] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [authorArticles, setAuthorArticles] = useState({
    articlesCount: 0,
    articles: [],
    favoriteds: []
  })
  const [tab, setTab] = useState('all')

  const authReducer = useSelector(state => state.authReducer)

  const loadMoreAuthorArticles = async () => {
    if (authorArticles.articles.length < authorArticles.articlesCount) {
      setIsLoading(true)
      const { data } = await getArticleByAuthor(username, {
        offset: authorArticles.articles.length,
        limit: 20
      })
      setIsLoading(false)
      setAuthorArticles({
        ...authorArticles,
        articles: [...authorArticles.articles, ...data.articles],
        articlesCount: data.articlesCount
      })
    }
  }

  const loadMyFavoritedArticles = async () => {
    setTab('favorited')

    if (authorArticles.favoriteds.length !== 0) {
      return
    } else {
      setIsLoading(true)
      const { data } = await getArticleByAuthor(username, {
        offset: authorArticles.length,
        limit: 1000,
        favorited: true
      })
      setIsLoading(false)
      setAuthorArticles({
        ...authorArticles,
        favoriteds: [...data.articles],
        articlesCount: authorArticles.articlesCount
      })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    ;(async function () {
      await Promise.all([
        getUserProfile(username, token),
        getArticleByAuthor(username)
      ])
        .then(res => {
          setUser(res[0].data.profile)
          setAuthorArticles({ ...authorArticles, ...res[1].data })
        })
        .catch(error => {
          console.log(error)
          // todo: 考虑是否是网络原因，如果是则重试获取
          // 否则提示错误
        })
        .finally(() => {
          setIsLoading(false)
        })
    })()
  }, [])

  const toggleFollow = async () => {
    setFollowRequesting(true)
    try {
      const { data } = user.following
        ? await unfollowUser(user.username)
        : await followUser(user.username)
      setUser(data.profile)
    } catch (error) {
      console.log(error)
    }
    setFollowRequesting(false)
  }

  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <img src={user.image} className='user-img' />
              <h4>{user.username}</h4>
              <p>{user.bio}</p>
              {authReducer.user?.username === user.username ? (
                <Link
                  className='btn btn-sm btn-outline-secondary action-btn'
                  to='/app/setting'
                >
                  <i className='ion-gear-a' /> Edit Profile Settings
                </Link>
              ) : (
                <button
                  disabled={followRequesting}
                  onClick={() => toggleFollow()}
                  className={`btn btn-sm btn-outline-secondary action-btn`}
                >
                  {followRequesting ? (
                    <i className='ion-refresh' />
                  ) : user.following ? (
                    <i className='ion-minus-round' />
                  ) : (
                    <i className='ion-plus-round' />
                  )}
                  {user.following ? (
                    <span>&nbsp; UnFollow </span>
                  ) : (
                    <span>&nbsp; Follow </span>
                  )}
                  {user.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li onClick={() => setTab('all')} className='nav-item'>
                  <a className={`nav-link ${tab === 'all' ? 'active' : ''}`}>
                    My Articles
                  </a>
                </li>
                <li
                  onClick={() => loadMyFavoritedArticles()}
                  className='nav-item'
                >
                  <a
                    className={`nav-link ${
                      tab === 'favorited' ? 'active' : ''
                    }`}
                  >
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>
            {tab === 'all' &&
              authorArticles.articles.map(article => (
                <Preview article={article} key={article.slug} />
              ))}
            {tab === 'favorited' &&
              authorArticles.favoriteds.map(article => (
                <Preview article={article} key={article.slug} />
              ))}
            <div className='article-preview'>
              {tab === 'all' &&
                !isLoading &&
                authorArticles.articlesCount !== 0 &&
                authorArticles.articles.length <
                  authorArticles.articlesCount && (
                  <a onClick={() => loadMoreAuthorArticles()}>加载更多...</a>
                )}

              {/* 或者检查滚动加载 */}
              {tab === 'all' &&
                !isLoading &&
                authorArticles.articlesCount === 0 &&
                authorArticles.articles.length === 0 && (
                  <span>该用户尚未发布任何文渣.</span>
                )}

              {tab === 'favorited' && !isLoading && (
                <span>该用户目前还没你喜欢的文渣.</span>
              )}
              {isLoading && <span>loading...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
