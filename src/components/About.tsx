import { FiArrowUpRight, FiCheck, FiMapPin } from 'react-icons/fi';
import { useProfile } from '../context/DataProvider';
import SectionHeading from './SectionHeading';

const About = () => {
  const { aboutMe, intro } = useProfile();
  const sentences = aboutMe.split(/(?<=[.!?])\s+/);
  const split = Math.ceil(sentences.length / 2);
  return (
    <section id='about' className='section about-section'>
      <div className='shell'>
        <SectionHeading number='04' label='A little about me' title='Curious by nature. Practical by approach.' />
        <div className='about-layout'>
          <div className='about-copy'><p>{sentences.slice(0, split).join(' ')}</p><p>{sentences.slice(split).join(' ')}</p></div>
          <aside className='recruiter-card' aria-label='Recruiter overview'>
            <span className='eyebrow'>AT A GLANCE</span><h3>Your next engineering conversation.</h3>
            <ul><li><FiCheck aria-hidden='true' />{intro.role}</li><li><FiCheck aria-hidden='true' />{intro.experience}</li><li><FiMapPin aria-hidden='true' />{intro.location}</li></ul>
            <p>Interested in senior, backend, and full-stack engineering opportunities.</p>
            <a href='#meeting' className='button button-ink'>Discuss an opportunity <FiArrowUpRight aria-hidden='true' /></a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
