import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { FaBars } from "react-icons/fa";
import { navData } from "../data/Data";
import { useCart } from "../store/cartStore";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const cart = useCart((state) => state.cartItem); 
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all duration-300 flex-shrink-0 relative ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <h1
          className={`text-xl font-bold transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Logo
        </h1>
      </div>

      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-6 z-10 text-white"
          aria-label="Toggle Sidebar"
        >
          <FaBars className="text-2xl" />
        </button>
      )}

      <nav className="mt-6 flex flex-col gap-2 px-2">
        {navData.map(({ path, icon, name }, index) => {
          const isCart = name === "Cart";
          return (
            <NavLink
              to={path}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-2 rounded-md transition-colors ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
              }
            >
              <span className="text-lg">{React.createElement(icon)}</span>
              {isOpen && (
                <span className="text-sm flex items-center">
                  {name}
                  {isCart && totalItems > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
