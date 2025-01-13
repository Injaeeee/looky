import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./router/rootLayout";
import MainPage from "./pages/mainPage";
import ListPage from "./pages/listPage";
import GlobalStyle from "./assets/image/style/GlobalStyle";

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
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
