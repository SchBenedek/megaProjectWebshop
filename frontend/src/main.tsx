import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Kiiras from './components/Products/Kiiras';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Card from './components/Products/Card';
import Kezdolap from './components/Kezdolap/Kezdolap';
import Feltetelek from './components/Kezdolap/Feltetelek';
import { AuthProvider } from './lib/AuthContext';
import Cart from './components/Navbar/Cart';
import { CartProvider } from "./lib/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Kezdolap />,
  },
  {
    path: "/kiiras",
    element: <Kiiras />,
  },
  {
    path: "/products/:id",
    element: <Card />,
  },
  {
    path: "/feltetelek",
    element: <Feltetelek />,
  },
  {
    path: "/cart",
    element: <Cart />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>,
    </AuthProvider>
  </StrictMode>
);
