interface INavMenu {
  page_path: string
  children: string
}

export const navMenu: INavMenu[] = [
  {
    page_path: '/home',
    children: 'Home',
  },
]
