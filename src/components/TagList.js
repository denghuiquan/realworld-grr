import React from 'react'

export default function TagList ({ tagList }) {
  return (
    <ul className='tag-list'>
      {tagList.map(tag => (
        <li
          key={tag}
          className='tag-default tag-pill tag-outline ng-binding ng-scope'
          ng-repeat='tag in $ctrl.article.tagList'
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
