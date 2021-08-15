import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { navMenu } from 'constants/navbar'
import { HashLink } from 'react-router-hash-link'
import { Divide as Hamburger } from 'hamburger-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/reducers'
import { Avatar, Dropdown, Image, Menu } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { SignOutAction } from 'store/auth/action'
export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.loggedInUser)
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
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => dispatch(SignOutAction())}
        icon={<UserOutlined />}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  )
  return (
    <header className="sticky top-0 z-20 header-border">
      <div className="py-5 mx-auto header-container">
        <div className="flex items-center header-menu">
          <HashLink
            scroll={(el) => scrollWithOffset(el)}
            to="/"
            className="flex text-white items-center header-logo mr-24 text-white-300"
          >
            {/* <img src={logo} alt="" /> */}
          </HashLink>
          <div
            className={
              'menu-collapse ' + (showLinks ? 'menu-collapse__open' : '')
            }
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
              {user ? (
                <div className="hover:bg-gray-200 p-2 rounded-full transition">
                  <Dropdown overlay={menu} placement="bottomRight">
                    <span className="flex items-center cursor-pointer">
                      <Avatar src={user.avatar && <Image src={user.avatar} />}>
                        {user.displayName?.charAt(0)}
                      </Avatar>
                      <div className="mx-4">{user.displayName}</div>
                      <DownOutlined />
                    </span>
                  </Dropdown>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-transparent">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div
            className={'collapse ' + (showLinks ? '' : 'collapse-close')}
            ref={wrapperRef}
          >
            <button
              ref={wrapperRef}
              className="ml-auto toggle-icon"
              onClick={() => setShowLinks(!showLinks)}
            >
              <Hamburger toggled={showLinks} direction="right" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
