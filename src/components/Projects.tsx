import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useProfile } from '../context/DataProvider'

const Projects = () => {
  const { projects } = useProfile();
  return (
    <div id='projects' className='py-24 px-6 bg-gradient-to-br from-blue-50 to-sky-200 font-nunito w-full'>
      <h1 className='text-4xl font-extrabold text-blue-950 text-center mb-16 tracking-tight'>Featured Projects</h1>
      <div className='flex flex-wrap items-stretch gap-10 justify-center w-full max-w-7xl mx-auto'>
        {
          projects.map((project: any, index: any) => {
            return (
              <div key={index} className='w-full max-w-md mx-auto group bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white/60 flex flex-col'>
                <div className='h-56 sm:h-64 w-full overflow-hidden relative'>
                  <img src={project.image} alt={project.name} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' />
                  <div className='absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6'>
                    <span className='text-white font-semibold flex flex-wrap gap-2'>
                      {project.tech.split(', ').map((t: any) => <span key={t} className='px-2 py-1 bg-white/20 rounded-md text-xs backdrop-blur-sm shadow-sm'>{t}</span>)}
                    </span>
                  </div>
                </div>
                <div className='flex-1 flex flex-col justify-between p-6 sm:p-8'>
                  <div className='mb-6 sm:mb-8'>
                    <div className='flex items-center justify-between mb-4'>
                      <h1 className='font-bold text-xl sm:text-2xl text-blue-950 capitalize'>{project.name}</h1>
                    </div>
                    <p className='text-gray-600 font-medium text-sm sm:text-base leading-relaxed line-clamp-4'>
                      {project.desc}
                    </p>
                  </div>
                  <div className='flex items-center gap-3 sm:gap-4 mt-auto pt-6 border-t border-sky-900/10'>
                    {project.link ? (
                      <a href={project.link} target='_blank' rel='noreferrer' className='flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg text-white font-bold text-xs sm:text-sm hover:from-sky-300 hover:to-blue-400 transition-colors shadow-lg'>
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    ) : null}

                    {project.github ? (
                      <a href={project.github} target='_blank' rel='noreferrer' className='flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-white/50 hover:bg-white/80 rounded-lg text-blue-950 font-bold text-xs sm:text-sm border border-blue-950/20 transition-all shadow-sm'>
                        <FaGithub size={16} /> Source
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Projects
