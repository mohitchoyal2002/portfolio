interface Props { number: string; label: string; title: string; description?: string; }

const SectionHeading = ({ number, label, title, description }: Props) => (
  <div className='section-heading'>
    <div><p className='eyebrow'><span className='section-number'>{number}</span>{label}</p><h2>{title}</h2></div>
    {description && <p className='section-description'>{description}</p>}
  </div>
);

export default SectionHeading;
