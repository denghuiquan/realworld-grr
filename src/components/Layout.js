import React from 'react'
import Footer from './Footer'
import Header from './header'

export default function Layout ({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
