import { FiArrowRight, FiFileText, FiHeadphones, FiLayers, FiMail, FiShoppingBag } from 'react-icons/fi';

interface Props { name: string; theme: string; domain: string; steps: string[]; }

const ProjectArtwork = ({ name, theme, domain, steps }: Props) => {
  const Icon = theme === 'mart' ? FiShoppingBag : theme === 'chart' ? FiFileText : theme === 'crm' ? FiMail : theme === 'music' ? FiHeadphones : FiLayers;
  return (
    <div className={'project-artwork artwork-' + theme} aria-hidden='true'>
      <div className='artwork-grid' />
      <div className='artwork-top'><span>{domain}</span><span className='artwork-symbol'>↗</span></div>
      <div className='artwork-center'>
        {theme === 'orbit' ? <div className='orbit-symbol'><span /><span /><span /><i /></div> : <div className='artwork-icon'><Icon /></div>}
        <span className='artwork-name'>{name}</span>
      </div>
      <div className='workflow-steps'>{steps.map((step, index) => <span key={step}><span className='workflow-label'>{step}</span>{index < steps.length - 1 && <FiArrowRight />}</span>)}</div>
    </div>
  );
};

export default ProjectArtwork;
