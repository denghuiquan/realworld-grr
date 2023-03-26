import { navigate } from 'gatsby'
import React, { useState } from 'react'
import { createArticle } from '../endpoints'
import useInput from '../hooks/useInput'

export default function CreateOrEditArticle () {
  const [tagList, setTagList] = useState([])
  const title = useInput('')
  const description = useInput('')
  const body = useInput('')
  const tagItem = useInput('')
  const [isRequesting, setIsRequesting] = useState(false)

  const handleTagItemKeyDown = async e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setTagList([...tagList, tagItem.input.value.trim()])
      tagItem.setValue('')
    }
  }

  const removeTag = tag => {
    setTagList(tagList.filter(t => t !== tag))
  }

  async function publishHandler (e) {
    e.preventDefault()
    // Todo: validate input values
    const article = {
      title: title.input.value,
      description: description.input.value,
      body: body.input.value,
      tagList: [
        ...tagItem.input.value
          .split(';')
          .map(tag => tag.trim())
          .filter(tag => tag !== '')
      ]
    }
    try {
      setIsRequesting(true)
      const { data } = await createArticle(article)
      navigate(`/article/detail/${data.article.slug}`)
    } catch (error) {
      console.log(error)
    }
    setIsRequesting(false)
  }

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            <form>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Article Title'
                    {...title.input}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder="What's this article about?"
                    {...description.input}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control'
                    rows={8}
                    placeholder='Write your article (in markdown)'
                    {...body.input}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    onKeyDown={e => handleTagItemKeyDown(e)}
                    type='text'
                    className='form-control'
                    placeholder='Enter tags'
                    {...tagItem.input}
                  />

                  <div className='tag-list'>
                    {tagList.map(tag => (
                      <span
                        key={tag}
                        className='tag-default tag-pill ng-binding ng-scope'
                      >
                        <i
                          className='ion-close-round'
                          onClick={() => removeTag(tag)}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  disabled={isRequesting}
                  onClick={e => publishHandler(e)}
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='button'
                >
                  <i className='ion refresh' />
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
