import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiTailwindcss,
  SiReact,
} from 'react-icons/si'
import { BiPhoneCall } from 'react-icons/bi'
import { IoMailOutline } from 'react-icons/io5'
const Footer = () => {
  return (
    <footer className="footer mt-12 constrast-section">
      <div className="container footer-container flex flex-col lg:grid bg-none">
        <div className="flex flex-col items-start mt-12 bg-none">
          <div className="footer-content__title bg-none">Contact</div>
          <a className="flex bg-none mb-6" href="tel:0905245054">
            <BiPhoneCall className="bg-none" size="2rem" />
            <p className="ml-4"> Call me: (+84) 905245054</p>
          </a>
          <div className="flex mb-6 bg-none">
            <IoMailOutline className="bg-none" size="2rem" />
            <p className="ml-4">Email: hieutk5@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col my-12 items-start bg-none">
          <div className="footer-content__title bg-none">Socials</div>
          <a
            className="mb-6 bg-none flex"
            href="https://www.facebook.com/hieumaxnho/"
            target="_blank"
            rel="noreferrer"
          >
            <SiFacebook className="bg-none" size="2rem" />
            <p className="ml-4">Facebook</p>
          </a>
          <a
            className="mb-6 bg-none flex"
            href="https://github.com/nmhieudut"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub className="bg-none" size="2rem" />
            <p className="ml-4">Github</p>
          </a>
          <a
            className="mb-6 bg-none flex"
            href="https://www.instagram.com/hillrose_1509/"
            target="_blank"
            rel="noreferrer"
          >
            <SiInstagram className="bg-none" size="2rem" />
            <p className="ml-4">Instagram</p>
          </a>
        </div>
      </div>
      <p className="text-center">Powered by</p>
      <div className="flex flex-wrap justify-center pb-3 bg-none">
        <SiReact className="m-4 bg-none" size="4rem" />
        <SiTailwindcss className="m-4 bg-none" size="4rem" />
      </div>
    </footer>
  )
}

export default Footer
