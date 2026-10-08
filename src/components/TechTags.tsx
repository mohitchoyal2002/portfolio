const TechTags = ({ tech }: { tech: string }) => (
  <ul className='tech-tags' aria-label='Technologies'>
    {tech.split(',').map(item => item.trim()).filter(Boolean).map(item => <li key={item}>{item}</li>)}
  </ul>
);

export default TechTags;
