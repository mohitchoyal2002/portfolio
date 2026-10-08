import { FiArrowDown, FiArrowUpRight, FiCode, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import mohit from '../assets/mohit-linkedin.jpg';
import { useProfile } from '../context/DataProvider';

const Intro = () => {
  const { intro } = useProfile();
  return (
    <section id='home' className='hero' aria-labelledby='hero-title'>
      <div className='hero-grid' aria-hidden='true' />
      <div className='shell hero-layout'>
        <div className='hero-copy'>
          <p className='eyebrow hero-introduction'>Hi, I’m {intro.name || 'Mohit Choyal'} <span className='intro-line' /></p>
          <h1 id='hero-title'>Thoughtful code.<br /><span>Useful products.</span></h1>
          <p className='hero-role'>{intro.role}</p>
          <p className='hero-summary'>{intro.summary}</p>
          <div className='hero-buttons'>
            <a href='#projects' className='button button-lime'>Explore my work <FiArrowUpRight aria-hidden='true' /></a>
            <a href='#meeting' className='button button-outline'>Schedule a meeting <FiArrowUpRight aria-hidden='true' /></a>
          </div>
          <div className='hero-facts'>
            <span><strong>{intro.experience}</strong></span>
            <span><FiMapPin aria-hidden='true' />{intro.location}</span>
          </div>
          <div className='hero-socials'>
            <a href='https://github.com/mohitchoyal2002' target='_blank' rel='noopener noreferrer'><FiGithub aria-hidden='true' /> GitHub <FiArrowUpRight aria-hidden='true' /></a>
            <a href='https://www.linkedin.com/in/mohit-choyal/' target='_blank' rel='noopener noreferrer'><FiLinkedin aria-hidden='true' /> LinkedIn <FiArrowUpRight aria-hidden='true' /></a>
          </div>
        </div>
        <div className='hero-visual'>
          <div className='portrait-decoration' aria-hidden='true'><span>+</span><span>+</span><span>+</span></div>
          <div className='portrait-card'>
            <div className='portrait-topline'><span className='status-dot' />Open to engineering opportunities<FiArrowUpRight aria-hidden='true' /></div>
            <div className='portrait-image'><img src={mohit} alt='Mohit Choyal, Senior Software Developer' width={400} height={400} /></div>
            <div className='portrait-caption'><span>Build with intention.<br /><strong>Ship with confidence.</strong></span><FiCode aria-hidden='true' /></div>
          </div>
          <div className='stack-note'><span className='note-icon' aria-hidden='true'>↗</span><div><span>MY CORE STACK</span><strong>Rails · React · Next.js</strong><small>PostgreSQL & API integrations</small></div></div>
        </div>
      </div>
      <div className='shell hero-bottom'><a href='#projects'>Scroll to explore <FiArrowDown aria-hidden='true' /></a><span>Backend thinking. Frontend craft.</span></div>
      <div className='stack-strip'><div className='shell'><span className='stack-strip-label'>BUILT WITH EXPERIENCE IN</span><span>Ruby on Rails</span><span>React / Next.js</span><span>PostgreSQL</span><span>REST APIs</span><span>AI integrations</span></div></div>
    </section>
  );
};

export default Intro;
