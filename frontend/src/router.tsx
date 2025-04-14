import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import MainPage from "./Pages/MainPage";
import UserProfilePage from "./Pages/UserProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        loader: () => redirect("/login"),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
      {
        path: "*",
        loader: () => redirect("/login"),
      },
    ],
  },
]);
