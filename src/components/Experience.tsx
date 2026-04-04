import React from 'react'
import { useProfile } from '../context/DataProvider'

const Experience = () => {
  const { experience } = useProfile();
  return (
    <div id='experience' className='font-nunito px-4 py-16 bg-gradient-to-tl from-white to-sky-50'>
      <h1 className='text-blue-950 font-extrabold text-4xl text-center mb-12 tracking-tight'>Experience</h1>
      <div className='flex flex-wrap justify-center gap-8'>
        {
          experience.map((exp: any, index: any) => {
            return (
              <div key={index} className='w-full max-w-md mx-auto group bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-2xl flex flex-col gap-6 relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out'></div>
                <div className='flex items-center gap-6'>
                  <div className='w-20 h-20 rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-gray-50 shrink-0 p-2 border border-gray-100 group-hover:scale-105 transition-transform duration-300'>
                    <img src={exp.logo} alt={exp.employer} className='object-contain w-full h-full' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h1 className='text-blue-950 font-bold text-2xl tracking-tight'>{exp.employer}</h1>
                    <span className='text-sky-600 font-semibold text-lg'>{exp.position}</span>
                    <span className='text-gray-500 text-sm font-medium bg-gray-100 w-fit px-3 py-1 rounded-full mt-1 border border-gray-200'>{exp.duration}</span>
                  </div>
                </div>
                {exp.tech && <span className='text-sky-800 text-sm font-medium border-l-4 border-sky-400 pl-3 py-1 bg-sky-50 rounded-r-lg'>Tech: {exp.tech}</span>}
                <p className='text-gray-600 font-medium text-md leading-relaxed'>{exp.work}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Experience
