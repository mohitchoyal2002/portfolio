import React from 'react'
import Intro from '../components/Intro'
import Header from '../components/Header'
import Skills from '../components/Skills'
import About from '../components/About'
import Projects from '../components/Projects'
import ContactMe from '../components/ContactMe'
import Experience from '../components/Experience'

const MainPage = () => {
  return (
    <div>
      <Header/>
      <Intro/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <ContactMe/>
    </div>
  )
}

export default MainPage