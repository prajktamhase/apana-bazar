import  ReactDOM from "react-dom/client";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import MyOrder from "./views/MyOrder/Order";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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

