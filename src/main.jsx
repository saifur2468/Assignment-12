import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import Mainlayout from "./Component/Mainlayout";
import Home from "./Component/Home";
import Errorpage from "./Component/Errorpage";
import Login from "./Component/Authsection/login";
import Register from "./Component/Authsection/Register";
 import Appartments from "./Component/Appartments"
import AuthProvider  from "./Component/Authsection/Authprovider";
import Privaterouter from "./Component/Routers/Privaterouter"
import ContactSection from "./Component/ContactSection";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"signup",
        element:<Register></Register>
      },
      {
        path:"/ContactSection",
        element:<ContactSection></ContactSection>
      },
 

     




      {
        path:"Appartments",
        element:(
          <Privaterouter>
            <Appartments></Appartments>
          </Privaterouter>
        )
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);