import React, { useEffect, useState } from 'react'
import { getTags } from '../endpoints'

export default function Sidebar () {
  const [isLoading, setIsLoading] = useState(true)
  const [tags, setTags] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await getTags()
        setTags(data.tags)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    })()
  }, [])
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>
      <div className='tag-list'>
        {isLoading ? (
          <>loading...</>
        ) : (
          tags.map(tag => (
            <a key={tag} className='tag-pill tag-default'>
              {tag}
            </a>
          ))
        )}
      </div>
    </div>
  )
}
