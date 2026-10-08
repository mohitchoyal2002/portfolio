import { FiAward, FiBookOpen } from 'react-icons/fi';
import { useProfile } from '../context/DataProvider';

const Education = () => {
  const { education } = useProfile();
  const courses = education.filter(item => item.institute === 'HackerRank' || item.institute === 'Udemy');
  const degrees = education.filter(item => !courses.includes(item));
  return (
    <section id='education' className='education-section'>
      <div className='shell education-layout'>
        <div className='education-primary'>
          <p className='eyebrow'><FiBookOpen aria-hidden='true' />Education</p>
          {degrees.map(item => <div key={item.degree + item.institute}><h2>{item.degree}</h2><p>{item.institute}</p><span>{item.duration}</span></div>)}
        </div>
        <div className='education-courses'>
          <p className='eyebrow'><FiAward aria-hidden='true' />Learning & certifications</p>
          {courses.map(item => <div className='course-row' key={item.degree}><div><h3>{item.degree}</h3><p>{item.institute}</p></div><span>{item.duration}</span></div>)}
        </div>
      </div>
    </section>
  );
};

export default Education;
