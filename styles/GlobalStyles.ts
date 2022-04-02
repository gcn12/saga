import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "Poppins", sans-serif;
    /* font-family: 'Lexend Deca', sans-serif; */
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  html {
    --color-title: #318543;
    --background: #f5f9f4;
    --accent: #40a355;
    --input: #ecf6f7;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  input {
    border: 1px solid lightgray;
    padding: 2px 5px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  strong {
    font-weight: 600;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  ul {
    /* list-style-type: none; */
    padding-left: 1.3rem;
  }

  li {
    margin-bottom: 8px;
  }

  #root,
  #__next {
    isolation: isolate;
  }

  .menu-highlight[data-reach-menu-item][data-selected] {
    background-color: rgb(228, 228, 228);
    color: black;
  }

  .light-text {
    transition: all 0.3s ease-in-out;
  }

  .fade:hover .light-text {
    color: rgb(109, 109, 109);
  }

  .dark:hover .dark-text {
    color: black;
  }

  .colored-button {
    color: white;
    background-color: var(--accent);
    padding: 8px 16px;
    border-radius: 8px;
    margin: 0 5px 5px 0;
    font-weight: 600;
    transition: 0.3s filter ease-in-out;
  }
  .colored-button:hover {
    /* background-color: rgb(105, 182, 105); */
    filter: brightness(92%);
  }

 [data-reach-menu-item][data-selected] {
    background: #cccccc;
    color: black;
  }
`;
