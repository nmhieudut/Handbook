import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: any) => theme.body};
    color: ${({ theme }: any) => theme.text};
  }
  header {
    background: ${({ theme }: any) => theme.body};
  }
  h1,h2,h3,h4,h5,h6,a, span,label {
    color: ${({ theme }: any) => theme.text}!important;
  }
  .header-border {
    border-bottom: 1px solid;
    border-color: ${({ theme }: any) => theme.border}
  }
  .constrast-section {
    background-color:  ${({ theme }: any) => theme.constrast};
  }
  .menu-item:hover {
    color: ${({ theme }: any) => theme.text};
    text-decoration-color: ${({ theme }: any) => theme.text};
  }
  .footer-content__title {
    border-bottom-color: ${({ theme }: any) => theme.text} 
  }
  .toggle-icon {
    border-color: ${({ theme }: any) => theme.text} 
  }
`

export const lightTheme = {
  body: '#ffffff',
  text: '#0c1017',
  constrast: '#ececec',
  border: 'rgba(229,231,235,1)',
}

export const darkTheme = {
  body: '#0c1017',
  text: '#fff',
  constrast: 'rgba(17, 24, 39, 1)',
  border: 'rgba(31, 41, 55, 1)',
}
