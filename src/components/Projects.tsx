import { useState } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { Project, useProfile } from '../context/DataProvider';
import ProjectArtwork from './ProjectArtwork';
import SectionHeading from './SectionHeading';
import TechTags from './TechTags';

type Kind = 'independent' | 'professional' | 'earlier';
export const projectInfo = (name: string): { kind: Kind; domain: string; theme: string; steps: string[] } => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const known: Record<string, { kind: Kind; domain: string; theme: string; steps: string[] }> = {
    orbitflow: { kind: 'independent', domain: 'Lead & client workflows', theme: 'orbit', steps: ['Capture', 'Connect', 'Follow up'] },
    aonemart: { kind: 'independent', domain: 'Mobile commerce', theme: 'mart', steps: ['Inventory', 'Orders', 'Rewards'] },
    chartrequest: { kind: 'professional', domain: 'Healthcare & AI', theme: 'chart', steps: ['Request', 'Extract', 'Review'] },
    cxwork: { kind: 'professional', domain: 'CRM & integrations', theme: 'crm', steps: ['Email', 'Meetings', 'Salesforce'] },
    nxzsound: { kind: 'professional', domain: 'Music & audio APIs', theme: 'music', steps: ['Tracks', 'Playlists', 'Playback'] },
    uphance: { kind: 'professional', domain: 'Inventory & production', theme: 'inventory', steps: ['Inventory', 'Sales', 'Production'] },
    teslaclone: { kind: 'earlier', domain: 'Frontend practice', theme: 'earlier', steps: ['React', 'Layouts', 'Components'] },
    eassessmentapp: { kind: 'earlier', domain: 'Full-stack assessment', theme: 'earlier', steps: ['Students', 'Assessments', 'Results'] },
    ecommerceapp: { kind: 'earlier', domain: 'Full-stack commerce', theme: 'mart', steps: ['Sellers', 'Products', 'Customers'] },
  };
  return known[key] || { kind: 'independent', domain: 'Software project', theme: 'orbit', steps: ['Interface', 'APIs', 'Data'] };
};
const filters = [
  { key: 'selected', label: 'Selected work' },
  { key: 'independent', label: 'Independent builds' },
  { key: 'professional', label: 'Professional work' },
  { key: 'earlier', label: 'Earlier projects' },
] as const;
type Filter = typeof filters[number]['key'];

const Projects = () => {
  const { projects } = useProfile();
  const [filter, setFilter] = useState<Filter>('selected');
  const visible = projects.filter(project => filter === 'selected' ? projectInfo(project.name).kind !== 'earlier' : projectInfo(project.name).kind === filter);
  const renderProject = (project: Project) => {
    const info = projectInfo(project.name);
    const sentences = project.desc.split(/(?<=[.!?])\s+/);
    const summary = sentences[0];
    const detail = sentences.slice(1).join(' ');
    return (
      <article key={project.name} className={'project-card project-' + info.theme}>
        <ProjectArtwork name={project.name} theme={info.theme} domain={info.domain} steps={info.steps} />
        <div className='project-body'>
          <div className='project-meta'><span>{info.kind === 'professional' ? 'Professional contribution' : info.kind === 'earlier' ? 'Earlier project' : 'Independent build'}</span><span>{info.domain}</span></div>
          <h3>{project.name}</h3>
          <p className='project-summary'>{summary}</p>
          {detail && <details className='project-details'><summary>More about my work</summary><p>{detail}</p></details>}
          <TechTags tech={project.tech || ''} />
          <div className='project-links'>
            {project.link && <a href={project.link} target='_blank' rel='noopener noreferrer' aria-label={'Visit ' + project.name + ' website (opens in a new tab)'}>Visit website <FiArrowUpRight aria-hidden='true' /></a>}
            {project.github && <a href={project.github} target='_blank' rel='noopener noreferrer' aria-label={'View ' + project.name + ' source on GitHub (opens in a new tab)'}><FiGithub aria-hidden='true' /> View code <FiArrowUpRight aria-hidden='true' /></a>}
            {!project.link && !project.github && <a href='#meeting'>Discuss this work <FiArrowUpRight aria-hidden='true' /></a>}
          </div>
        </div>
      </article>
    );
  };
  return (
    <section id='projects' className='section work-section'>
      <div className='shell'>
        <SectionHeading number='01' label='Selected work' title='From idea to working product.' description='Independent builds and production contributions across healthcare, CRM, commerce, and music.' />
        <div className='project-filters' role='group' aria-label='Filter projects'>
          {filters.map(item => <button key={item.key} type='button' aria-pressed={filter === item.key} onClick={() => setFilter(item.key)}>{item.label}</button>)}
        </div>
        <p className='sr-only' aria-live='polite'>{visible.length} projects shown for {filters.find(item => item.key === filter)?.label}</p>
        <div className='project-grid'>{visible.map(renderProject)}</div>
        {!visible.length && <p className='empty-state'>More work is on the way. Let’s talk about what I’m building.</p>}
        <div className='section-footnote'><span>Want to explore the architecture or my contribution?</span><a href='#meeting'>Let’s walk through it <FiArrowUpRight aria-hidden='true' /></a></div>
      </div>
    </section>
  );
};

export default Projects;
