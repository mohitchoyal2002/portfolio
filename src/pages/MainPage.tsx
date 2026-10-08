import Intro from '../components/Intro';
import Header from '../components/Header';
import Skills from '../components/Skills';
import About from '../components/About';
import Projects from '../components/Projects';
import ContactMe from '../components/ContactMe';
import Experience from '../components/Experience';
import Education from '../components/Education';
import ScheduleMeeting from '../components/ScheduleMeeting';

const MainPage = () => (
  <div className='portfolio'>
    <a className='skip-link' href='#main-content'>Skip to content</a>
    <Header />
    <main id='main-content' tabIndex={-1}>
      <Intro />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Education />
      <ScheduleMeeting />
    </main>
    <ContactMe />
  </div>
);

export default MainPage;
