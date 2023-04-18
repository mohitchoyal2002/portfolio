import {MdEmail} from 'react-icons/md'
import {FaGithub} from 'react-icons/fa'
import {AiFillLinkedin, AiOutlineCopyrightCircle} from 'react-icons/ai'


const ContactMe = () => {
  return (
    <>
    <div id='contact-me' className='p-10 font-nunito bg-sky-300'>
      <h1 className='text-white mb-6 font-bold text-3xl text-center'>Contact Me</h1>
      <div className='flex justify-evenly flex-wrap gap-5'>
        <a href='#' className=''><div className='py-6 px-36 flex flex-col items-center gap-2 bg-sky-100 transition delay-75 hover:shadow-whitner rounded-md'>
          <div className='rounded-full p-4 bg-sky-300'>
            <MdEmail className='text-white' fontSize={22}/>
          </div>
          <span className='text-blue-950 text-lg font-semibold'>Email</span>
        </div></a>
        <a href='https://github.com/mohitchoyal2002' target='_blank' className=''><div className='py-6 px-36 flex flex-col items-center gap-2 bg-sky-100 hover:shadow-whitner transition delay-75 rounded-md'>
          <div className='rounded-full p-4 bg-sky-300'>
            <FaGithub className='text-white' fontSize={22}/>
          </div>
          <span className='text-blue-950 text-lg font-semibold'>Github</span>
        </div></a>
        <a href='https://www.linkedin.com/in/mohit-choyal/' target='_blank' className=''><div className='py-6 px-36 flex flex-col items-center gap-2 bg-sky-100 hover:shadow-whitner transition delay-75 rounded-md'>
          <div className='rounded-full p-4 bg-sky-300'>
            <AiFillLinkedin className='text-white' fontSize={22}/>
          </div>
          <span className='text-blue-950 text-lg font-semibold'>LinkedIn</span>
        </div></a>
      </div>
    </div>
    <h1 className='my-2 w-full justify-center flex items-center gap-2 text-center text-xs text-blue-950'>MohitWebDev <span><AiOutlineCopyrightCircle className='text-blue-950' fontSize={12}/></span> 2023</h1>
    </>
  )
}

export default ContactMe