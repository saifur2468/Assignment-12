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
import Dashborad from "./Component/Private Routes/Dashborad";
import MakeAnnunmante from "./Component/MakeAnnunmante";
import SeeAnnunmante from "./Component/SeeAnnunmante";
import AgreementsRequest from "./Component/AgreementsRequest";
import ManageCoupons from "./Component/ManageCoupons";
import AdminProfile from "./Component/AdminProfile";
import ManageMembers from "./Component/ManageMembers";
import UserProfile from "./Component/UserProfile";
import MakePayment from "./Component/MakePayment";
import CheckoutForm from "./Component/CheckoutForm";
import Payment from "./Component/Payment";
import PaymentHistory from "./Component/PaymentHistory";

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
     path:"/Appartments",
     element:<Appartments></Appartments>
      },
      {
        path:"/SeeAnnunmante",
        element:(
          <Privaterouter>
            <SeeAnnunmante></SeeAnnunmante>
          </Privaterouter>
        )
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
        path:"Dashboard",
        element:<Dashborad></Dashborad>,
        children:[
         
      {
        path:"MakeAnnunmante",
        element:<MakeAnnunmante></MakeAnnunmante>
      },

      
      {
        path:"AgreementsRequest",
        element:(
          <Privaterouter>
            <AgreementsRequest></AgreementsRequest>
          </Privaterouter>
        )
      },
      {
path:"ManageCoupons",
element:<ManageCoupons></ManageCoupons>
      },
      {
path:"adminProfile",
element:<AdminProfile></AdminProfile>
      },
 {
  path:"ManageMembers",
  element:<ManageMembers></ManageMembers>
 },
 {
path:"userProfile",
element:<UserProfile></UserProfile>
 },
{
  path:"MakePayment",
  element:<MakePayment></MakePayment>
},
     
{
  path:"CheckoutForm",
  element:<CheckoutForm></CheckoutForm>
},
{
path:"paymentHistory",
element:<PaymentHistory></PaymentHistory>
},



      {
        path:"Appartments",
        element:(
          <Privaterouter>
            <Appartments></Appartments>
          </Privaterouter>
        )
      }

        ]
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