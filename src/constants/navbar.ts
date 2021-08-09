interface INavMenu {
  page_path: string
  children: string
}

export const navMenu: INavMenu[] = [
  {
    page_path: '/blog',
    children: 'Blog',
  },
  {
    page_path: '/docs',
    children: 'Docs',
  },
  {
    page_path: '/contact',
    children: 'Contact',
  },
]
