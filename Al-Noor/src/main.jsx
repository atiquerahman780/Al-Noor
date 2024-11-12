import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cart from './Components/Cart.jsx';
import Confirmation from './Components/Confirmation.jsx';
import Products from './Components/Products.jsx';
import HeaderArea from './Components/HeaderArea.jsx';
import Reviews from './Components/Reviews.jsx';
import ProceedToPay from './Components/ProceedToPay.jsx';
import CustomerForm from './Components/CustomerForm.jsx';
import Run from './Components/Run.jsx';
import Payment_Method from './Components/Payment_Method.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
     children: [
      {
        path: "/",
        element: <>
        <HeaderArea/>
        <Products/>
        </>,
      },
      {
        path: "/reviews",
        element: <>
        <HeaderArea/>
        <Reviews/>,

        </>
      },
      {
        path: "/cart",
        element: 
        <>
        <HeaderArea/>
        <Cart/>,
        </>
        
      },
      {
        path: "/proceed_to_pay",
        element: 
        <>
        <HeaderArea/>
        <ProceedToPay/>,
        </>
        
      },
      {
        path: "/shipping_information",
        element: 
        <>
        <HeaderArea/>
        <CustomerForm/>,
        </>
        
      },
      {
        path: "/run",
        element: 
        <>
        <HeaderArea/>
        <Run/>,
        </>
        
      },
      {
        path: "/confirmation",
        element: 
        <>
        <HeaderArea/>
        <Confirmation/>,
        </>
        
      },
      {
        path: "/contacts",
        element: 
        <>
        <HeaderArea/>
        <Payment_Method/>,
        </>
        
      },
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  
)
