import avatar from '../assets/avatar.png'

const About = () => {
  return (
    <div id='about' className='px-4 py-16 font-nunito bg-sky-300 flex flex-col items-center gap-16'>
      <h1 className='text-3xl text-white text-center font-bold'>About Me</h1>
      <div className='flex flex-wrap items-center justify-center gap-20 h-full w-full'>
        <img src={avatar} alt="" className='h-44 rounded-full shadow-whitner' />
        <div className='bg-white rounded-lg p-5 bg-opacity-60 text-lg font-medium text-blue-950 w-full lg:w-1/2 shadow-whitner'>
          I am a Full Stack Developer with a passion for building beautiful and user-friendly websites. I have a strong understanding of both frontend and backend development. I am excited to put my skills to use in a professional setting. I am a Quick Learner and team player and I am confident that I can be a valuable asset to any web development team. 
        </div>
      </div>
    </div>
  )
}

export default About