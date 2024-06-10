import { projects } from '../assets/skills.json'

const Projects = () => {
  return (
    <div id='projects' className='py-6 px-4  bg-sky-300 font-nunito'>
      <h1 className='text-3xl font-bold text-white text-center mb-6'>My Projects</h1>

      <div className='flex flex-wrap items-start gap-10 justify-center py-4'>
        {
          projects.map((project) => {
            return (
              <div className='rounded-lg w-96'>
                <div className='h-80 w-full'>
                  <img src={project.image} alt="" className='w-full h-full rounded-t-lg' />
                </div>
                <div className='min-h-50 flex flex-col justify-between bg-white py-4 px-2 lg:px-8 md:px-5 rounded-b-lg'>
                  <div>
                    <div className='text-blue-950 mb-4 flex items-center gap-2'>
                      <h1 className='font-bold text-lg capitalize'>{project.title}</h1>
                      <span className='text-xs bg-blue-950 text-white font-bold p-1 rounded-lg'>{project.type}</span>
                    </div>
                    <div className='flex justify-center mb-4'>
                    <p className='text-gray-600 font-medium text-base'>
                      {project.discription}
                    </p>
                    </div>
                    <div className='flex justify-center'>
                      <p className='text-blue-950 font-semibold text-base'>
                        Tech Used: {project.tech}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-5 mb-2'>
                    {
                      project.live ? <a href={project.live_link} target='_blank' className='p-2 bg-white border border-blue-950 rounded-md text-blue-950 font-semibold text-sm'>See Live</a>:<div className='hidden'></div>
                    }
                    {
                      project.github ?
                      <a href={project.github} target='_blank' className='p-2 bg-blue-950 rounded-md text-white font-semibold text-sm'>Source Code</a>:<div className='hidden'></div>
                    }
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
