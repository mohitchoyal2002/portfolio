import avatar from '../assets/avatar.png'
import { useProfile } from '../context/DataProvider'

const About = () => {
  const { aboutMe } = useProfile();
  return (
    <div id='about' className='px-4 py-16 lg:py-24 font-nunito bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center gap-10 lg:gap-16 relative overflow-hidden'>
      {/* Decorative Blobs */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30'></div>
      <div className='absolute top-20 right-10 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30'></div>

      <h1 className='text-4xl text-blue-950 text-center font-extrabold tracking-tight z-10'>About Me</h1>
      <div className='flex flex-wrap items-center justify-center gap-10 lg:gap-16 w-full max-w-6xl z-10'>
        <div className='relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500'></div>
          <img src={avatar} alt="Avatar" className='relative h-64 w-64 object-cover rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-105 border-4 border-white' />
        </div>
        <div className='bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 lg:p-12 text-base sm:text-lg font-medium text-blue-950/80 w-full lg:w-1/2 shadow-xl hover:shadow-2xl transition-all duration-300 leading-relaxed text-left md:text-justify group'>
          <p className='transform transition duration-500 group-hover:-translate-y-1'>{aboutMe}</p>
        </div>
      </div>
    </div>
  )
}

export default About
