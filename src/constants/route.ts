interface IRouter {
  path: string
  exact: boolean
  componentPath: string
}

export const routes: IRouter[] = [
  {
    path: '',
    exact: true,
    componentPath: 'pages/Home',
  },
  {
    path: 'auth',
    exact: true,
    componentPath: 'pages/Auth',
  },
  {
    path: 'profile',
    exact: true,
    componentPath: 'pages/Profile',
  },
  {
    path: 'search',
    exact: true,
    componentPath: 'pages/Search',
  },
  //test-dev-area
  {
    path: 'sandbox',
    exact: true,
    componentPath: 'pages/Sandbox',
  },
]
