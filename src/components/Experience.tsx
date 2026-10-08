import { useProfile } from '../context/DataProvider';
import { FiArrowUpRight, FiBriefcase } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import TechTags from './TechTags';

const Experience = () => {
  const { experience, intro } = useProfile();
  return (
    <section id='experience' className='section experience-section'>
      <div className='shell'>
        <SectionHeading number='02' label='Experience' title='Built in the real world.' description={intro.experience + ' across full-stack development, integrations, and production systems.'} />
        <div className='timeline'>
          {experience.map((exp, index) => (
            <article key={exp.employer + exp.duration} className='timeline-item'>
              <div className='timeline-date'><span className='timeline-dot' aria-hidden='true' /><span>{exp.duration.replace('Current', 'Present')}</span>{index === 0 && <span className='current-role'>Current role</span>}</div>
              <div className='experience-card'>
                <div className='experience-top'><div><p className='employer'>{exp.employer}</p><h3>{exp.position}</h3></div><FiBriefcase aria-hidden='true' /></div>
                <p className='experience-description'>{exp.work}</p>
                {exp.tech && <TechTags tech={exp.tech} />}
              </div>
            </article>
          ))}
        </div>
        <div className='section-footnote'><span>More about my professional journey</span><a href='https://www.linkedin.com/in/mohit-choyal/' target='_blank' rel='noopener noreferrer'>View LinkedIn <FiArrowUpRight aria-hidden='true' /></a></div>
      </div>
    </section>
  );
};

export default Experience;
