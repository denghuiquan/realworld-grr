import { graphql, Link, navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addArticleComment,
  deleteArticleComment,
  favoriteArticle,
  followUser,
  getArticleBySlug,
  getArticleComments,
  unfavoriteArticle,
  unfollowUser
} from '../endpoints'
import useInput from '../hooks/useInput'
import dateformat from '../utils/dateformat'

export default function Article ({ data, location, slug }) {
  const authReducer = useSelector(state => state.authReducer)
  const [article, setArticle] = useState(data?.article || {})
  const [comments, setComments] = useState([])
  const commentBody = useInput('')

  const [favRequesting, setFavRequesting] = useState(false)
  const [followRequesting, setFollowRequesting] = useState(false)
  const [addingComment, setAddingComment] = useState(false)

  const toggleFollow = async () => {
    if (!authReducer.success) {
      navigate(`/login?redirect=${location.pathname}`)
      return
    }

    setFollowRequesting(true)
    try {
      const { data } = article?.author.following
        ? await unfollowUser(article?.author.username)
        : await followUser(article?.author.username)

      setArticle({ ...article, author: data.profile })
    } catch (error) {
      console.log(error)
    }
    setFollowRequesting(false)
  }

  const toggleFavorited = async () => {
    if (!authReducer.success) {
      navigate(`/login?redirect=${location.pathname}`)
      return
    }
    setFavRequesting(true)
    try {
      const { data } = article.favorited
        ? await unfavoriteArticle(article.slug)
        : await favoriteArticle(article.slug)
      setArticle(data.article)
    } catch (error) {
      console.log(error)
    }
    setFavRequesting(false)
  }

  const addComment = async e => {
    e.preventDefault()

    setAddingComment(true)
    const { data } = await addArticleComment(
      article.slug,
      commentBody.input.value
    )
    setAddingComment(false)
    commentBody.setValue('')
    setComments([...comments, data.comment])
  }

  const deleteComment = async id => {
    // /api/articles/:slug/comments/:id
    const { data } = await deleteArticleComment(article.slug, id)
    setComments(comments.filter(comment => comment.id !== id))
  }

  useEffect(() => {
    if (slug || article.slug) {
      ;(async function () {
        const { data } = await getArticleBySlug(slug || article.slug)
        setArticle(data.article)
      })()
      ;(async function () {
        const { data } = await getArticleComments(slug || article.slug)
        setComments(data.comments)
      })()
    }
  }, [])

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{article.title}</h1>
          <div className='article-meta'>
            <Link to={`/app/profile/${article.author?.username}`}>
              <img src={article.author?.image} />
            </Link>
            <div className='info'>
              <Link
                to={`/app/profile/${article.author?.username}`}
                className='author'
              >
                {article.author?.username}
              </Link>
              <span className='date'>{dateformat(article.createdAt)}</span>
            </div>
            <button
              disabled={followRequesting}
              onClick={() => toggleFollow()}
              className='btn btn-sm btn-outline-secondary'
            >
              {followRequesting ? (
                <i className='ion-refresh' />
              ) : article.author?.following ? (
                <i className='ion-minus-round' />
              ) : (
                <i className='ion-plus-round' />
              )}
              {article.author?.following ? (
                <span>&nbsp; UnFollow </span>
              ) : (
                <span>&nbsp; Follow </span>
              )}
              {article.author?.username}
            </button>
            &nbsp;&nbsp;
            <button
              disabled={favRequesting}
              onClick={toggleFavorited}
              className={`btn btn-sm ${
                article.favorited ? 'btn-primary' : 'btn-outline-primary'
              }`}
            >
              <i className='ion-heart' />
              Favorite Post
              <span className='counter'>({article?.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>
      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            {/* <p>{article.description}</p> */}
            {/* <h2 id='introducing-ionic'>Introducing RealWorld.</h2> */}
            <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
          </div>
        </div>
        <hr />
        <div className='article-actions'>
          <div className='article-meta'>
            <Link to={`/app/profile/${article.author?.username}`}>
              <img src={article.author?.image} />
            </Link>
            <div className='info'>
              <Link
                to={`/app/profile/${article.author?.username}`}
                className='author'
              >
                {article.author?.username}
              </Link>
              <span className='date'>{dateformat(article.createdAt)}</span>
            </div>
            <button
              disabled={followRequesting}
              onClick={() => toggleFollow()}
              className='btn btn-sm btn-outline-secondary'
            >
              {followRequesting ? (
                <i className='ion-refresh' />
              ) : article.author?.following ? (
                <i className='ion-minus-round' />
              ) : (
                <i className='ion-plus-round' />
              )}
              {article.author?.following ? (
                <span>&nbsp; UnFollow </span>
              ) : (
                <span>&nbsp; Follow </span>
              )}
              {article.author?.username}
            </button>
            &nbsp;&nbsp;
            <button
              disabled={favRequesting}
              onClick={toggleFavorited}
              className={`btn btn-sm ${
                article.favorited ? 'btn-primary' : 'btn-outline-primary'
              }`}
            >
              <i className='ion-heart' />
              Favorite Post
              <span className='counter'>({article.favoritesCount})</span>
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <form className='card comment-form'>
              <div className='card-block'>
                <textarea
                  className='form-control'
                  placeholder='Write a comment...'
                  rows={3}
                  {...commentBody.input}
                />
              </div>
              <div className='card-footer'>
                <img
                  src={authReducer.user?.image}
                  className='comment-author-img'
                />
                <button
                  disabled={addingComment}
                  onClick={addComment}
                  className='btn btn-sm btn-primary'
                >
                  Post Comment
                </button>
              </div>
            </form>
            {comments.map(comment => (
              <div key={comment.id} className='card'>
                <div className='card-block'>
                  <p
                    className='card-text'
                    dangerouslySetInnerHTML={{ __html: comment.body }}
                  ></p>
                </div>
                <div className='card-footer'>
                  <a className='comment-author'>
                    <img
                      src={`${comment.author.image}`}
                      className='comment-author-img'
                    />
                  </a>
                  &nbsp;
                  <a className='comment-author'>{comment.author.username}</a>
                  <span className='date-posted'>
                    {dateformat(comment.createdAt)}
                  </span>
                  {authReducer.user.username === comment.author.username && (
                    <span className='mod-options'>
                      {/* <i className='ion-edit' /> */}
                      <i
                        className='ion-trash-a'
                        onClick={() => deleteComment(comment.id)}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query ($slug: String) {
    article(slug: { eq: $slug }) {
      slug
      body
      createdAt
      description
      favorited
      favoritesCount
      tagList
      title
      updatedAt
      author {
        following
        bio
        image
        username
      }
    }
  }
`
