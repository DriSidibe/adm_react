import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import Logo from "./logo";
import { lazy } from "react";
import { useAuth } from "./context/AuthContext";
import Button from "./ui/button";
import { useNavbar } from "./context/navBarContext";
import { useApi } from "../utils";

export const PagesUrls = [
  {
    path: "/",
    name: "Products_home",
    component: lazy(() => import("./products")),
  },
  {
    path: "/products",
    name: "Produits",
    component: lazy(() => import("./products")),
  },
  {
    path: "/sell-products",
    name: "Vendre des produits",
    component: lazy(() => import("./sellProduct")),
  },
  {
    path: "/selled-products",
    name: "Produits vendus",
    component: lazy(() => import("./selledProducts")),
  },
  {
    path: "/aprovisionnement",
    name: "Aprovisionnement",
    component: lazy(() => import("./aprovisionnement")),
  },
  {
    path: "/statistics",
    name: "Statistiques",
    component: lazy(() => import("./statistics")),
  },
  {
    path: "/add-product",
    name: "Ajouter un produit",
    component: lazy(() => import("./addProduct")),
  },
  {
    path: "/update-product",
    name: "Mettre à jour le produit",
    component: lazy(() => import("./updateProduct")),
  },
  {
    path: "/login",
    name: "Connexion",
    component: lazy(() => import("./login")),
  },
];

export const Navbar = () => {
  const { setCanShowNavbar } = useNavbar();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [...PagesUrls];

  const handleClick = (name) => {
    if (name === "Deconnexion") {
      auth.logout();
      window.location.href = "/login";
      setCanShowNavbar(true);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:hidden xl:flex space-x-8">
            {navItems.map((item) =>
              item.name !== "Connexion" &&
              item.name !== "Mettre à jour le produit" &&
              item.name !== "Products_home" &&
              item.name !== "Deconnexion" ? (
                <NavLink
                  onClick={() => handleClick(item.name)}
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-1 py-2 text-sm font-medium transition-colors duration-300
                  ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                  }
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:bg-blue-600 dark:after:bg-blue-400
                  after:transition-all after:duration-300
                  ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <></>
              )
            )}
            <Button onClick={auth.logout}>Se déconnecter</Button>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:flex xl:hidden transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) =>
            item.name !== "Connexion" &&
            item.name !== "Mettre à jour le produit" &&
            item.name !== "Products_home" &&
            item.name !== "Deconnexion" ? (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`
                }
              >
                {item.name}
              </NavLink>
            ) : (
              <></>
            )
          )}
          <Button onClick={auth.logout}>Se déconnecter</Button>
        </div>
      </div>
    </header>
  );
};
