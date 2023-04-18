import React from 'react'
import { experience } from '../assets/skills.json'

const Experience = () => {
  return (
    <div id='experience' className='font-nunito px-4 py-10'>
      <h1 className='text-blue-950 font-bold text-3xl text-center mb-4'>Experience</h1>
      <div className='flex flex-wrap justify-evenly gap-5'>
        {
          experience.map((exp) => {
            console.log(exp.tech);
            
            return (
              <div className='w-96 bg-white rounded-md p-4 hover:shadow-whitner'>
                <div className=' flex items-center gap-5 '>
                  <img src={exp.logo} alt="" className='w-1/6' />
                  <div className='flex flex-col gap-0 mb-4'>
                    <h1 className='text-blue-950 font-semibold text-lg'>{exp.employer}</h1>
                    <span className='text-gray-500 text-base font-medium'>{exp.position}</span>
                    <span className='text-gray-500 text-sm font-medium mb-2'>({exp.duration})</span>
                    {exp.tech !== undefined ? <span className='text-gray-500 text-sm font-medium'>Technology: {exp.tech}</span>:<span className='hidden'></span>}
                  </div>
                </div>
                <p className='text-blue-950 font-medium text-base'>{exp.work}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Experience