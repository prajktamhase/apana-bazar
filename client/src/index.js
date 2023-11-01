import  ReactDOM from "react-dom/client";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import MyOrder from "./views/MyOrder/Order";
import Home from "./views/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
      },

      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/order",
        element: <MyOrder/>,
      },

  ]);

 root.render(
      <RouterProvider router={router} />
  );

