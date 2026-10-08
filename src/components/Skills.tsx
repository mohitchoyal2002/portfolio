import { FiCode, FiDatabase, FiGitBranch } from 'react-icons/fi';
import { useProfile } from '../context/DataProvider';
import SectionHeading from './SectionHeading';

const Skills = () => {
  const { frontend, backend, other } = useProfile();
  const groups = [
    { title: 'Interfaces & experiences', subtitle: 'Frontend', skills: frontend, icon: FiCode },
    { title: 'Systems & data', subtitle: 'Backend', skills: backend, icon: FiDatabase },
    { title: 'Connections & delivery', subtitle: 'Integrations & tools', skills: other, icon: FiGitBranch },
  ];
  const core = ['Ruby on Rails', 'React', 'Next.js', 'PostgreSQL'];
  return (
    <section id='skills' className='section skills-section'>
      <div className='shell'>
        <SectionHeading number='03' label='The toolkit' title='The right tools. A clear purpose.' description='A full-stack foundation, with a focus on maintainable systems and useful user experiences.' />
        <div className='core-stack'><span>CORE STACK</span>{core.map((skill, index) => <span className='core-skill' key={skill}><span>{String(index + 1).padStart(2, '0')}</span>{skill}</span>)}</div>
        <div className='skills-grid'>
          {groups.map(group => <article className='skill-card' key={group.subtitle}>
            <div className='skill-heading'><group.icon aria-hidden='true' /><span>{group.subtitle}</span></div>
            <h3>{group.title}</h3>
            <ul className='skill-list'>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </article>)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
