import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Kiiras from "./components/Products/Kiiras";
import Card from "./components/Products/Card";
import Kezdolap from "./components/Kezdolap/Kezdolap";
import Feltetelek from "./components/Kezdolap/Feltetelek";
import Cart from "./components/Navbar/Cart";
import { AuthProvider } from "./lib/AuthContext";
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
    path: "/products",
    children: [
      {
        path: ":id",
        element: <Card />,
      },
    ],
  },
  {
    path: "/cart",
    children: [
      {
        path: ":id",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/feltetelek",
    element: <Feltetelek />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
