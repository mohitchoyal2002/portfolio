import React from 'react'
import { FaGraduationCap, FaCertificate } from 'react-icons/fa'
import { useProfile } from '../context/DataProvider'

const Education = () => {
  const { education } = useProfile();
  return (
    <div id='education' className='font-nunito px-4 py-16 bg-gradient-to-tr from-sky-50 to-sky-200'>
      <h1 className='text-blue-950 font-extrabold text-4xl text-center mb-12 tracking-tight'>Education & Certifications</h1>
      <div className='flex flex-wrap justify-center gap-8'>
        {
          education.map((edu: any, index: any) => {
            const isCert = edu.institute === 'HackerRank' || edu.institute === 'Udemy';
            return (
              <div key={index} className='w-full max-w-sm mx-auto group bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white/80 flex flex-col gap-3 relative overflow-hidden'>
                <div className='absolute -right-4 -top-4 text-sky-200 opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-500'>
                  {isCert ? <FaCertificate size={120} /> : <FaGraduationCap size={120} />}
                </div>
                <div className='z-10 flex items-center gap-3'>
                  <div className='p-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl text-white shadow-lg'>
                    {isCert ? <FaCertificate size={24} /> : <FaGraduationCap size={24} />}
                  </div>
                </div>
                <div className='z-10 flex flex-col gap-1 mt-2'>
                  <h1 className='text-blue-950 font-bold text-xl leading-snug'>{edu.degree}</h1>
                  <span className='text-sky-700 font-semibold text-md'>{edu.institute}</span>
                  <span className='text-gray-500 text-sm font-medium bg-white/50 w-fit px-2 py-0.5 rounded-full mt-1 border border-sky-100'>{edu.duration}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Education
