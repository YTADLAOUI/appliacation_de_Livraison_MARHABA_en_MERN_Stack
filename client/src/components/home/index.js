import React from 'react'
import Navbar from '../header/navbar'
import Restaurant from '../restaurant/index'
import Hero from '../header/hero'

function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <Restaurant />
    </>
  )
}

export default Home