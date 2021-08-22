import { Divider, Image, Menu } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LoggedInUser } from 'store/auth/reducer'

interface Props {
  user: LoggedInUser
  theme: {
    theme: string
  }
}

function Slider({ user, theme: { theme } }: Props) {
  const location = useLocation()
  const path = location.pathname
  const [selectedKey, setSelectedKey] = useState(path === '/home' ? 2 : 1)
  const handleClick = (e) => {
    setSelectedKey(e.key)
  }
  console.log('theme', theme)
  return (
    <div className="w-96 fixed h-screen">
      <Menu
        className="pt-20 h-full"
        mode="inline"
        theme={theme === 'light' ? 'light' : 'dark'}
        onClick={handleClick}
        defaultSelectedKeys={[selectedKey + '']}
      >
        <Menu.Item key="1" className="px-8 py-12 rounded-xl">
          <Avatar src={user.avatar && <Image src={user.avatar} />}>
            {user.displayName?.charAt(0)}
          </Avatar>
          <span className="mx-4">{user.displayName}</span>
        </Menu.Item>
        <Divider plain />
        <Menu.Item key="2">
          <Link to="/home" className="p-2 rounded-full transition">
            <span className="flex items-center cursor-pointer">Feeds</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Slider
