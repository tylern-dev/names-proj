import { createGlobalStyle } from 'styled-components'


const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: postgrotesk;
    font-style: normal;
    font-weight: normal;
    src: url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Book.eot'); /* IE9 Compat Modes */
    src:
      url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Book.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Book.woff2') format('woff2'), /* Cutting Edge Browsers */
      url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Book.woff') format('woff'); /* Modern Browsers */
  }
  @font-face {
    font-family: postgrotesk;
    font-style: normal;
    font-weight: bold;
    src: url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Bold.eot');
    src:
      url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Bold.eot?#iefix') format('embedded-opentype'),
      url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Bold.woff2') format('woff2'),
      url('https://dxkdvuv3hanyu.cloudfront.net/fonts/PostGrotesk-Bold.woff') format('woff');
  }


  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    width: 100vw; /* stylelint-disable-line declaration-block-no-duplicate-properties */
    overflow-x: hidden;
  }

  body,
  p {
    font-family: postgrotesk, Roboto, sans-serif;
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mainBlue};
    background: transparent;
    cursor: pointer;
  }

  html,
  body,
  div,
  span,
  iframe,
  img,
  figure,
  figcaption,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  blockquote,
  code,
  strong,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  input,
  table,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  summary,
  embed,
  footer,
  header,
  menu,
  nav,
  output,
  ruby,
  section,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  html {
    height: 100%;
    box-sizing: border-box;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    height: 100%;
    margin: 0;
    background: #eef2f5;
    background-color: #eef2f5;
    cursor: default;
  }

  #root {
    height: 100%;
  }

  @keyframes hide {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(0);
    }
  }

  @keyframes slide-in--from-top {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }

  aside,
  footer,
  header,
  main,
  nav,
  section {
    display: block;
  }

  [hidden] {
    display: none;
  }

  a:hover,
  a:active {
    outline: 0;
  }

  a:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  hr {
    flex-basis: 1000000px;
    border-top: 1px solid #dfe3e7;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    color: inherit;
    font: inherit;
  }

  button {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html input[type='button'],
  input[type='reset'],
  input[type='submit'] {
    cursor: pointer;
    -webkit-appearance: button;
  }

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  textarea {
    overflow: auto;
  }

  ::-moz-selection {
    background-color: #b8edff;
    color: #4d5661;
  }

  ::selection {
    background-color: #b8edff;
    color: #4d5661;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  input::-ms-clear {
    display: none;
  }

  html,
  html a {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    -webkit-font-smoothing: subpixel-antialiased;
  }

  body,
  input {
    color: #4d5661;
    font-family: postgrotesk, 'Averta-Regular', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  span {
    margin: 0;
    font-family: postgrotesk, 'Averta-Regular', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
  }

  h1.h0 {
    font-size: 40px;
    font-weight: 200;
    line-height: 1.125;
    text-transform: uppercase;
  }

  h1 {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.188;
  }

  h2 {
    font-size: 24px;
    line-height: 1.167;
  }

  h3 {
    font-size: 20px;
    line-height: 1.3;
  }

  @media (max-width: 599px) {
    h1.h0 {
      font-size: 24px;
      line-height: 1.167;
    }

    h1 {
      font-size: 20px;
      line-height: 1.3;
    }

    h2 {
      font-size: 18px;
      line-height: 1.563;
    }

    h3 {
      font-size: 16px;
      line-height: 1.786;
    }
  }

  p,
  li {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.786;
  }

  small {
    font-size: 12px;
    line-height: 1.786;
  }

  label {
    font-size: 12px;
    line-height: 1.786;
  }
`

export default GlobalStyles