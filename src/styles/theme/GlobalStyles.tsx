import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    color: ${({ theme }: any) => theme.text};
    background: ${({ theme }: any) => theme.body};
  }
  header {
    background: ${({ theme }: any) => theme.body};
  }
  h1, h2, h3, h4, h5, h6, a, span, label,
  .ant-card-meta-title, 
  .comment-input {
    color: ${({ theme }: any) => theme.text}!important;
  }
  .ant-popover-inner, .ant-popover-arrow-content {
    background: ${({ theme }: any) => theme.body};
  }
  .comment, .comment-input {
    background: ${({ theme }: any) => theme.commentBg};
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
  .ant-card {
    background: ${({ theme }: any) => theme.constrast};
    color: ${({ theme }: any) => theme.text};
  }
  .footer-content__title {
    border-bottom-color: ${({ theme }: any) => theme.text} 
  }
  .toggle-icon {
    border-color: ${({ theme }: any) => theme.text} 
  }
`

export const lightTheme = {
  body: '#fbfbfb',
  text: '#0c1017',
  constrast: '#ffffff',
  border: 'rgba(229,231,235,1)',
  commentBg: '#F2F3F5'
}

export const darkTheme = {
  body: '#0c1017',
  text: '#fff',
  constrast: 'rgba(17, 24, 39, 1)',
  border: 'rgba(31, 41, 55, 1)',
  commentBg: '#3A3B3C'
}
