import React from 'react'
import bg from '../assets/background.jpg'
import mohit from '../assets/mohit.png'
// import Fade from 'react-reveal/Fade'

const Intro = () => {
  return (
    <div id='home' className=' p-10 pt-44 pb-40 h-screen w-full flex flex-col-reverse items-center justify-center gap-20 font-nunito lg:flex-row lg:gap-40  md:flex-row md:gap-40 md:px-4' style={{backgroundImage: `url('${bg}')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}>
      {/* <Fade left> */}
      <div>
        <h1 className='text-2xl lg:text-4xl md:text-4xl font-bold text-blue-950 text-center mb-1'>Hii there! I am <span className='text-sky-500'>Mohit</span></h1>
        <p className='text-base text-blue-950'>I'm a Full Stack Web Developer based in Indore, India.</p>
        <div className='flex w-full items-center justify-center gap-5 mt-4'>
          <a href="#contact-me"><button className='w-28 h-10 text-white text-base rounded-lg bg-sky-400 border border-sky-400 font-semibold'>Let's Talk</button></a>
          <a href='#projects'><button className='w-28 h-10 text-purple-950 text-base rounded-lg bg-white bg-opacity-25 border border-purple-500 font-semibold'>My Projects</button></a>
        </div>
      </div>
      {/* </Fade> */}
      {/* // <Fade right> */}
      <div>
        <img src={mohit} alt="" className='h-60 md:h-80 lg:h-80 shadow-custom rounded-full' />
      </div>
      {/* </Fade> */}
    </div>
  )
}

export default Intro