import { AiFillHtml5 } from 'react-icons/ai'
import { BiServer } from 'react-icons/bi'
import { VscTools } from 'react-icons/vsc'
import { useProfile } from '../context/DataProvider'

const Skills = () => {
  const { frontend, backend, other } = useProfile();
  return (
    <div id='skills' className='py-16 bg-gradient-to-tr from-sky-50 to-white font-nunito w-full'>
      <h1 className='text-4xl font-extrabold text-blue-950 text-center mb-12 tracking-tight'>My Technical Arsenal</h1>
      <div className='flex flex-wrap w-full justify-center gap-10 items-stretch px-4'>
        <div className='w-full max-w-sm group rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-6 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden'>
          <div className='absolute -right-4 -top-4 text-sky-100 opacity-30 group-hover:scale-110 transition-transform duration-500'>
            <AiFillHtml5 size={140} />
          </div>
          <div className='flex items-center gap-4 z-10'>
            <div className='p-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl text-white shadow-lg'>
              <AiFillHtml5 fontSize={28} />
            </div>
            <span className='text-2xl text-blue-950 font-bold'>Front End</span>
          </div>
          <div className='flex flex-wrap gap-2 z-10'>
            {frontend.map((skill: any) => (
              <span key={skill} className='px-3 py-1.5 bg-sky-50 text-sky-700 font-semibold rounded-lg text-sm border border-sky-100 shadow-sm'>{skill}</span>
            ))}
          </div>
        </div>

        <div className='w-full max-w-sm group rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-6 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden'>
          <div className='absolute -right-4 -top-4 text-sky-100 opacity-30 group-hover:scale-110 transition-transform duration-500'>
            <BiServer size={140} />
          </div>
          <div className='flex items-center gap-4 z-10'>
            <div className='p-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl text-white shadow-lg'>
              <BiServer fontSize={28} />
            </div>
            <span className='text-2xl text-blue-950 font-bold'>Back End</span>
          </div>
          <div className='flex flex-wrap gap-2 z-10'>
            {backend.map((skill: any) => (
              <span key={skill} className='px-3 py-1.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg text-sm border border-indigo-100 shadow-sm'>{skill}</span>
            ))}
          </div>
        </div>

        <div className='w-full max-w-sm group rounded-2xl bg-white border border-gray-100 p-6 flex flex-col gap-6 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden'>
          <div className='absolute -right-4 -top-4 text-sky-100 opacity-30 group-hover:scale-110 transition-transform duration-500'>
            <VscTools size={140} />
          </div>
          <div className='flex items-center gap-4 z-10'>
            <div className='p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl text-white shadow-lg'>
              <VscTools fontSize={28} />
            </div>
            <span className='text-2xl text-blue-950 font-bold'>Other Tools</span>
          </div>
          <div className='flex flex-wrap gap-2 z-10'>
            {other.map((skill: any) => (
              <span key={skill} className='px-3 py-1.5 bg-purple-50 text-purple-700 font-semibold rounded-lg text-sm border border-purple-100 shadow-sm'>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
