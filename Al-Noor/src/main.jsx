import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contacts from './Components/Contacts.jsx';



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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  
)
