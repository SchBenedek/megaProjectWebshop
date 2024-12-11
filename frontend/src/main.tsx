import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Kiiras from './components/Products/Kiiras';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Card from './components/Products/Card';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Kiiras />,
  },
  {
    path:"/products/:id",
    element: <Card />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
