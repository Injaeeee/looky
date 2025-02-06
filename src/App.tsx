import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./router/rootLayout";
import MainPage from "./pages/mainPage";
import ListPage from "./pages/listPage";
import GlobalStyle from "./assets/style/GlobalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./assets/style/theme";
import RankingPage from "./pages/rankingPage";
import MyPage from "./pages/myPage";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import GeminiChat from "./pages/testPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "ranking",
        element: <RankingPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "test",
        element: <GeminiChat />,
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
