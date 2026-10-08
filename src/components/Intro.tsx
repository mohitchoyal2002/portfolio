import bg from '../assets/background.jpg'
import mohit from '../assets/mohit-linkedin.jpg'
import { useProfile } from '../context/DataProvider'

const Intro = () => {
  const { intro } = useProfile();
  const role = intro?.role || 'Senior Software Developer';
  const experience = intro?.experience || '4 years of total experience';
  const location = intro?.location || 'Indore, India';
  const summary = intro?.summary || 'Building full-stack applications, REST APIs, and AI workflows with Ruby on Rails, React, Next.js, and PostgreSQL.';

  return (
    <div id='home' className='relative min-h-screen w-full flex items-center justify-center font-nunito overflow-hidden' style={{ backgroundImage: `url('${bg}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
      {/* Gradient Overlay for better contrast */}
      <div className='absolute inset-0 bg-gradient-to-br from-white/95 via-sky-50/80 to-blue-100/60 backdrop-blur-[2px] z-0'></div>

      <div className='relative z-10 flex flex-col-reverse lg:flex-row md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-32 w-full max-w-6xl px-4 sm:px-6 py-24 lg:py-32'>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <h2 className='text-xl lg:text-2xl text-gray-500 font-semibold mb-2 tracking-wide uppercase'>Hello World, I'm</h2>
          <h1 className='text-4xl sm:text-5xl lg:text-7xl font-extrabold text-blue-950 mb-4 tracking-tight drop-shadow-sm'>
            Mohit <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600'>Choyal</span>
          </h1>
          <p className='text-xl lg:text-2xl text-blue-900 font-bold mb-3'>{role}</p>
          <p className='text-lg lg:text-xl text-gray-600 max-w-lg mb-8 leading-relaxed'>
            <strong className='text-blue-900'>{experience}</strong> · {location}
            <br />
            {summary}
          </p>
          <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4'>
            <a href="#contact-me" className='px-8 py-3 text-white text-lg rounded-full bg-gradient-to-r from-sky-400 to-blue-500 font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(14,165,233,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'>
              Let's Talk
            </a>
            <a href='#projects' className='px-8 py-3 text-blue-950 text-lg rounded-full bg-white/50 backdrop-blur-md border border-white/60 font-bold transition-all duration-300 transform hover:-translate-y-1 hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700'>
              View Projects
            </a>
          </div>
        </div>

        <div className='relative group mb-8 lg:mb-0'>
          {/* Glowing ring effect */}
          <div className='absolute -inset-2 bg-gradient-to-tr from-sky-300 to-blue-500 rounded-full blur-lg opacity-40 group-hover:opacity-75 transition duration-500'></div>
          <img src={mohit} alt="Mohit Choyal" width={400} height={400} className='relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 object-cover rounded-full shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] border-4 border-white transition-transform duration-700 group-hover:scale-105' />
        </div>
      </div>
    </div>
  )
}

export default Intro
