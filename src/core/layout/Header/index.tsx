import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { navMenu } from 'constants/navbar'
import { HashLink } from 'react-router-hash-link'
import { Divide as Hamburger } from 'hamburger-react'

export default function Header() {
  const [showLinks, setShowLinks] = useState(false)
  const wrapperRef = useRef<any>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current.contains(event.target)) {
        setShowLinks(false)
      }
    }
    if (showLinks) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [wrapperRef, showLinks])

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
    const yOffset = -100
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center header-menu">
      <HashLink
        scroll={(el) => scrollWithOffset(el)}
        to="/"
        className="flex text-white items-center header-logo mr-24 text-white-300"
      >
        {/* <img src={logo} alt="" /> */}
      </HashLink>
      <div
        className="lg:flex hidden justify-center items-center ml-auto menu-collapse"
        ref={wrapperRef}
      >
        <div className="flex menu-collapse-links">
          {navMenu.map((item, i) => {
            return (
              <HashLink
                scroll={(el) => scrollWithOffset(el)}
                onClick={() => setShowLinks(false)}
                key={i}
                className="menu-item ml-14"
                to={item.page_path}
              >
                {item.children}
              </HashLink>
            )
          })}
        </div>
        <div className="flex auth-menu items-center auth-menu">
          <Link to="/login" className="btn btn-transparent">
            Sign In
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </div>
      <div
        className={'collapse ' + (showLinks ? '' : 'collapse-close')}
        ref={wrapperRef}
      >
      <button
        ref={wrapperRef}
        id="close-icon"
        className="ml-auto toggle-icon my-5"
        onClick={() => setShowLinks(!showLinks)}
      >
        <Hamburger toggled={showLinks} direction="right" />
      </button>
      </div>
      </div>
  )
}
