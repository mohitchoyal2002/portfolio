import {AiFillHtml5} from 'react-icons/ai'
import {BiServer} from 'react-icons/bi'
import {VscTools} from 'react-icons/vsc'
import {frontend} from '../assets/skills.json'
import {backend} from '../assets/skills.json'
import {other} from '../assets/skills.json'

const Skills = () => {
  
  return (
    <div id='skills' className='py-10 bg-transparent font-nunito w-full'>
      <h1 className='text-3xl font-bold text-blue-950 text-center mb-6'>My Skills</h1>
      <div className='flex flex-wrap w-full justify-center gap-8 items-start'>
        <div className='w-256 rounded-lg' >
          <div className='py-2 w-full bg-sky-400 flex flex-col items-center rounded-t-lg'>
            <AiFillHtml5 fontSize={32} className='text-white'/>
            <span className='text-lg text-white font-semibold'>Front End</span>
          </div>
          <div className='bg-white w-full py-4 rounded-b-lg'>
            {
              frontend.map((skill)=>{
                return(
                  <p key={skill} className='text-center text-blue-950 text-base font-normal mb-1'>{skill}</p>
                )
              })
            }
          </div>
        </div>
        <div className='w-256 rounded-lg' >
          <div className='py-2 w-full bg-sky-400 flex flex-col items-center rounded-t-lg'>
            <BiServer fontSize={32} className='text-white'/>
            <span className='text-lg text-white font-semibold'>Back End</span>
          </div>
          <div className='bg-white w-full py-4 rounded-b-lg'>
            {
              backend.map((skill)=>{
                return(
                  <p key={skill} className='text-center text-blue-950 text-base font-normal mb-1'>{skill}</p>
                )
              })
            }
          </div>
        </div>
        <div className='w-256 rounded-lg ' >
          <div className='py-2 w-full bg-sky-400 flex flex-col items-center rounded-t-lg'>
            <VscTools fontSize={32} className='text-white'/>
            <span className='text-lg text-white font-semibold'>Other</span>
          </div>
          <div className='bg-white w-full py-4 rounded-b-lg'>
            {
              other.map((skill)=>{
                return(
                  <p key={skill} className='text-center text-blue-950 text-base font-normal mb-1'>{skill}</p>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills