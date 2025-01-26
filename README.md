![header](https://capsule-render.vercel.app/api?type=waving&color=F76388&height=180&section=header&text=LOOKY&fontSize=90&fontAlignY=40&fontColor=000000)

## **📑 목차**

> ***[프로젝트 소개](#프로젝트-소개)***
> 
> ***[개발 기간](#개발-기간)***
> 
> ***[상세 계획](#상세-계획)***
> 
> ***[User Flow](#User-Flow)***
> 
> ***[프로젝트 구조](#프로젝트-구조)***
> 
> ***[개발 환경](#개발-환경)***
> 
> ***[기술 스택](#기술-스택)***
> 
> ***[주요 기능](#주요-기능)***
>
> ***[배포 및 실행 방법](#배포-및-실행-방법)***
> 

</br>

## 🧑‍💻 <a name="프로젝트-소개"/>프로젝트 소개


LOOKY는 

</br>

## 🔗 링크

[GitHub](https://github.com/Injaeeee/looky)

[🌐 배포 사이트](https://looky-cz8x.vercel.app/)

</br>

## 👨‍🏫 <a name="주요-기능"/>주요 기능

|![image](https://github.com/user-attachments/assets/96091afc-d694-4bfb-bc68-9aa3f58374f7)|![image](https://github.com/user-attachments/assets/4d22324e-1b30-489e-bfd9-60abaca81b11)|![image](https://github.com/user-attachments/assets/8efc73c7-002a-4814-806a-e11663c0b276)|
|:---:|:---:|:---:|
|**랜딩 페이지**|**게시물 목록 페이지**|**게시물 생성 모달**|

|![image](https://github.com/user-attachments/assets/56fce0a5-7e44-499c-b3df-4dd733e5c67d)|![image](https://github.com/user-attachments/assets/73514a5d-7deb-404f-918f-f3a084f88d4a)|![image](https://github.com/user-attachments/assets/1725025c-11a7-4e84-895a-103062756d0e)|
|:---:|:---:|:---:|
|**랭킹 페이지**|**마이 페이지**|**회원가입 페이지**|

</br>

## 🗓️ <a name="개발-기간"/>개발 기간

***12 / 23 (목) ~ 1 / 26 (일)***

</br>

## 📃 <a name="상세-계획"/>상세 계획과 일정

[**📌 상세 계획**](https://mud-stranger-c40.notion.site/Looky-15a06acd0113803a85b4f13fbdf04cdf?pvs=4)

</br>

## 💡 <a name="User-Flow"/>User Flow

![유저플로우](https://github.com/user-attachments/assets/50e4ed62-94cb-48b6-99ae-50825e1a3319)

</br>

## 📁 <a name="프로젝트-구조"/>프로젝트 구조

```
📁wine/
│
├── 📁public/
│   ├── 📁images/                 # 이미지 파일 폴더
│   └── 📁ic_wine.svg ...
│
├── 📁constants/
│   └── 📁auth/
│   └── mediaQueryBreakPoint.ts
│
├── 📁src/
│   └── 📁components/             # 재사용 가능한 컴포넌트
│       └── 📁common/            # 공통 컴포넌트
│           ├── 📁Button/
│           │     └── Button.tsx
│           └── 📁Toast/
│                 └── Toast.tsx
│
├── 📁pages/                  # Next.js page 라우팅
│   │   └── 📁signin/
│   │       └── index.tsx
│   │   └── 📁signup/
│   │       └── index.tsx
│   │   └── 📁[id]/              # 팀 페이지에 들어갈 컴포넌트 모음
│   │   │   ├── 📁editteam/
│   │   │   │     └── index.tsx
│   │       └── index.tsx
│   │   └── index.tsx
│   │   └── _app.tsx
│   │   └── _404.tsx
│   │
│   ├── 📁libs/                   # 라이브러리 관련된 세팅 및 함수들 정리하는 폴더
│   │   └── 📁axios/              # axios 관련 세팅 및 api 요청 함수
│   │       └── axiosInstance.ts
│   │       └── 📁auth/
│   │       └── 📁image/
│   │       └── 📁review/
│   │       └── 📁user/
│   │       └── 📁wine/
│   │
│   ├── 📁contexts/               # 전역 상태 관리
│   │
│   ├── 📁hooks/                  # 커스텀 React 훅
│   │
│   ├── 📁types/                  # 타입 폴더 (DTO 혹은 전역적으로 사용되는 type 미리 정의)
│   │                             # 컴포넌트 props의 경우에는 해당 컴포넌트 위치에 정의
│   │
│   ├── 📁style/                 # 스타일 관련 파일 모음
│   │   └── global.css
│   │
│   │
│   └── 📁util/                  # 유틸리티 폴더
│
├─ .gitignore
├─ .env.local                     
├─ .eslintrc.json
├─ .prettierrc.json
├─ tsconfig.json
│
...생략

```

</br>

## 💻 <a name="개발-환경"/>개발 환경

|OS|IDE|Version Control|Package Manager|deploy|
|:---:|:---:|:---:|:---:|:---:|
|![macOS](https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white) ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)|![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078d7?style=for-the-badge&logo=visual-studio-code&logoColor=white)|![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)|![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)|![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|
</br>

## ⚒ <a name="기술-스택"/>기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled%20Components-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)


</br>

## 🚀 <a name="배포-및-실행-방법"/>배포 및 실행 방법

**1. 프로젝트 클론**

`git clone https://github.com/Injaeeee/looky.git`

**2. 의존성 설치**

프로젝트에서 사용하는 패키지들을 설치합니다.

`npm install`

**3. 개발 서버 실행**

다음 명령어를 실행하여 로컬 개발 환경에서 프로젝트를 실행할 수 있습니다.

`npm run start`

이후 브라우저에서 [http://localhost:3000](http://localhost:3000/) 으로 접속하여 개발 중인 웹 애플리케이션을 확인할 수 있습니다.


**4. 배포**

이 프로젝트는 Vercel을 사용하여 배포할 수 있습니다.

GitHub와 연동된 Vercel 계정을 통해 자동으로 배포되며, 코드를 push하면 자동으로 배포 프로세스가 진행됩니다.

[**배포 사이트**](https://looky-cz8x.vercel.app/)
