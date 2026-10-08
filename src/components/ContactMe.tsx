import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const ContactMe = () => (
  <footer id='contact-me' className='contact-section'>
    <div className='shell'>
      <div className='contact-heading'><div><p className='eyebrow'>HAVE SOMETHING IN MIND?</p><h2>Good products start<br />with a conversation<span>.</span></h2></div><a href='#meeting' className='contact-arrow' aria-label='Schedule a meeting'><FiArrowUpRight aria-hidden='true' /></a></div>
      <div className='contact-links'>
        <a className='contact-email' href='mailto:mohitchoyal2002@gmail.com'><FiMail aria-hidden='true' /><span>mohitchoyal2002@gmail.com</span><FiArrowUpRight aria-hidden='true' /></a>
        <div><a href='https://github.com/mohitchoyal2002' target='_blank' rel='noopener noreferrer'><FiGithub aria-hidden='true' />GitHub<FiArrowUpRight aria-hidden='true' /></a><a href='https://www.linkedin.com/in/mohit-choyal/' target='_blank' rel='noopener noreferrer'><FiLinkedin aria-hidden='true' />LinkedIn<FiArrowUpRight aria-hidden='true' /></a></div>
      </div>
      <div className='footer-bottom'><span>© {new Date().getFullYear()} Mohit Choyal</span><span>Built with care in Indore, India.</span><a href='#home'>Back to top ↑</a></div>
    </div>
  </footer>
);

export default ContactMe;
