import React from 'react'
import { useSelector } from 'react-redux'

export default function Toggle ({ tab, toggleTab }) {
  const authReducer = useSelector(state => state.authReducer)

  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item' onClick={() => toggleTab('your')}>
          <a
            className={`nav-link ${tab === 'your' ? 'active' : ''} ${
              authReducer.success && authReducer.user ? '' : 'disabled'
            }`}
          >
            Your Feed
          </a>
        </li>
        <li className='nav-item' onClick={() => toggleTab('global')}>
          <a className={`nav-link ${tab === 'global' ? 'active' : ''}`}>
            Global Feed
          </a>
        </li>
      </ul>
    </div>
  )
}
