interface INavMenu {
  page_path: string
  children: string
}

export const navMenu: INavMenu[] = [
  {
    page_path: '/',
    children: 'Home',
  },
]
