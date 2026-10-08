import { MdEmail } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'
import { AiFillLinkedin, AiOutlineCopyrightCircle } from 'react-icons/ai'


const ContactMe = () => {
  return (
    <>
      <div id='contact-me' className='px-4 py-16 font-nunito bg-gradient-to-br from-sky-400 to-blue-600'>
        <h1 className='text-white mb-12 font-extrabold text-4xl text-center tracking-wide'>Get In Touch</h1>
        <div className='flex justify-center flex-wrap gap-8'>
          <a href='mailto:mohitchoyal2002@gmail.com' className='group'>
            <div className='py-8 w-64 flex flex-col items-center gap-4 bg-white/20 backdrop-blur-lg border border-white/30 transition-all duration-300 ease-in-out transform group-hover:-translate-y-3 group-hover:bg-white/30 group-hover:shadow-2xl rounded-2xl'>
              <div className='rounded-full p-4 bg-white/30 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <MdEmail className='text-white' fontSize={32} />
              </div>
              <span className='text-white text-xl font-bold tracking-wider'>Email</span>
            </div>
          </a>
          <a href='https://github.com/mohitchoyal2002' target='_blank' rel='noopener noreferrer' className='group'>
            <div className='py-8 w-64 flex flex-col items-center gap-4 bg-white/20 backdrop-blur-lg border border-white/30 transition-all duration-300 ease-in-out transform group-hover:-translate-y-3 group-hover:bg-white/30 group-hover:shadow-2xl rounded-2xl'>
              <div className='rounded-full p-4 bg-white/30 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <FaGithub className='text-white' fontSize={32} />
              </div>
              <span className='text-white text-xl font-bold tracking-wider'>Github</span>
            </div>
          </a>
          <a href='https://www.linkedin.com/in/mohit-choyal/' target='_blank' rel='noopener noreferrer' className='group'>
            <div className='py-8 w-64 flex flex-col items-center gap-4 bg-white/20 backdrop-blur-lg border border-white/30 transition-all duration-300 ease-in-out transform group-hover:-translate-y-3 group-hover:bg-white/30 group-hover:shadow-2xl rounded-2xl'>
              <div className='rounded-full p-4 bg-white/30 backdrop-blur-md text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6'>
                <AiFillLinkedin className='text-white' fontSize={32} />
              </div>
              <span className='text-white text-xl font-bold tracking-wider'>LinkedIn</span>
            </div>
          </a>
        </div>
      </div>
      <h1 className='my-4 w-full justify-center flex items-center gap-2 text-center text-sm font-medium text-blue-950 tracking-wide'>
        MohitWebDev <span><AiOutlineCopyrightCircle className='text-blue-950' fontSize={14} /></span> {new Date().getFullYear()}
      </h1>
    </>
  )
}

export default ContactMe
