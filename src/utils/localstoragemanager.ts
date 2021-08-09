export const LSManager = {
  // token
  setToken: (token: string) => localStorage.setItem('access-token', token),
  getToken: () => localStorage.getItem('access-token')?.toString(),
  removeToken: () => localStorage.remove('access-token'),

  //set theme
  setTheme: (theme: string) => localStorage.setItem('THEME', theme),
  getTheme: () => localStorage.getItem('THEME'),

  // clear all data in local storage
  clearSite: () => localStorage.clear(),
}
