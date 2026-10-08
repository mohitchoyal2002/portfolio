import React from 'react'
import Intro from '../components/Intro'
import Header from '../components/Header'
import Skills from '../components/Skills'
import About from '../components/About'
import Projects from '../components/Projects'
import ContactMe from '../components/ContactMe'
import Experience from '../components/Experience'
import Education from '../components/Education'
import ScheduleMeeting from '../components/ScheduleMeeting'

const MainPage = () => {
  return (
    <div>
      <Header />
      <Intro />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <ScheduleMeeting />
      <ContactMe />
    </div>
  )
}

export default MainPage
