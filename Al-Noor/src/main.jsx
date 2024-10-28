import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contacts from './Components/Contacts.jsx';
import Confirmation from './Components/Confirmation.jsx';



const router = createBrowserRouter([
  {
    // path: "/",
    // element: <App/>,
     children: [
      {
        path: "/",
        element: <App/>,
      },
      {
        path: "/contacts",
        element: <Contacts/>,
      },
      {
        path: "/confirmation",
        element: <Confirmation/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  
)
