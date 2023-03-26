import React from 'react'
import HeadSEO from '../components/HeadSEO'

export default function Person (props) {
  const { pageContext: person } = props
  return (
    <>
      <HeadSEO
        title={`Person Detail for ${person.name}`}
        description={`${person.name} is ${person.age} years old`}
      />

      <h2>
        {person.slug}:{person.name}:{person.age}
      </h2>
    </>
  )
}
