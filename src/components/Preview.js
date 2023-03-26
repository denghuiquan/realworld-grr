import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import dateformat from '../utils/dateformat'
import TagList from './TagList'
import { favoriteArticle, unfavoriteArticle } from '../endpoints'

export default function Preview ({ article }) {
  const [prevArticle, setPrevArticle] = useState(article)
  const [favRequesting, setFavRequesting] = useState(false)
  const toggleFavorited = async () => {
    setFavRequesting(true)
    try {
      const { data } = prevArticle.favorited
        ? await unfavoriteArticle(prevArticle.slug)
        : await favoriteArticle(prevArticle.slug)
      setPrevArticle(data.article)
    } catch (error) {
      console.log(error)
    }
    setFavRequesting(false)
  }
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`/app/profile/${prevArticle.author?.username}`}>
          <img src={prevArticle.author?.image} />
        </Link>
        <div className='info'>
          <Link
            to={`/app/profile/${prevArticle.author?.username}`}
            className='author'
          >
            {prevArticle.author?.username}
          </Link>
          <span className='date'>{dateformat(prevArticle.createdAt)}</span>
        </div>
        <button
          disabled={favRequesting}
          onClick={() => toggleFavorited()}
          className={`btn btn-sm pull-xs-right ${
            prevArticle.favorited ? 'btn-primary' : 'btn-outline-primary'
          }`}
        >
          <i className='ion-heart' /> {prevArticle.favoritesCount}
        </button>
      </div>
      <Link to={`/article/detail/${prevArticle.slug}`} className='preview-link'>
        <h1>{prevArticle.title}</h1>
        <p>{prevArticle.description}</p>
        <span onClick={() => navigate(`/article/detail/${prevArticle.slug}`)}>
          Read more...
        </span>
        {/* <Link to={`/article/detail/${prevArticle.slug}`}>Read more...</Link> */}
        <TagList tagList={prevArticle.tagList} />
      </Link>
    </div>
  )
}
