import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Poppins';
    src: url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
    font-weight: 300;
    font-style: italic;
}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-family:'Poppins', sans-serif;
}

html {
  font-size: 62.5%; /* 단위 rem 사용 시 16px = 1.6rem으로 사용 가능 */
  
} 

/* a 링크 초기화 */
a {
  color: #222;
  text-decoration: none;
}

/* 제목 태그 초기화 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 14px;
  font-weight: normal;
}

/* 테두리 초기화 */
img,
fieldset {
  border: 0 none;
}

/* 버튼 초기화 */
button {
  border: 0;
  background: none;
}

/* input 화살표 초기화 */

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

:root {
  --white: #ffffff;
  --white10: #d9d9d9;
  --black: #000000;
  --black10: #0f0f0f;
  --error: #dc3a3a;

  --pink10: rgba(247, 123, 154, 0.18);
  --pink100:#F76388;
  --pink200:#d44f70;
  --pink300: #ad2c4d;
  --pink400:#912c45;

  --purple100: #f8f0ff;
  --purple200: #ecd9ff;
  --purple300: #dcb9ff;
  --purple400: #c894fd;
  --purple500: #ab57ff;
  --purple600: #9935ff;
  --purple700: #861dee;
  --purple800: #6e0ad1;
  --purple900: #5603a7;

  --beige100: #fff0d6;
  --beige200: #ffe2ad;
  --beige300: #ffc583;
  --beige400: #ffae65;
  --beige500: #ff8832;

  --blue100: #e2f5ff;
  --blue200: #b1e4ff;
  --blue300: #7cd2ff;
  --blue400: #34b9ff;
  --blue500: #00a2fe;

  --green100: #e4fbdc;
  --green200: #d0f5c3;
  --green300: #9be282;
  --green400: #60cf37;
  --green500: #2ba600;

  --gray10: rgba(23, 23, 23, 0.25); 
  --gray100: #f6f6f6;
  --gray200: #eeeeee;
  --gray300: #cccccc;
  --gray400: #D9D9D9;
  --gray500: #555555;
  --gray600: #4a4a4a;
  --gray700: #333333;
  --gray800: #262626;
  --gray900: #1B1B1B;
}
`;

export default GlobalStyle;
