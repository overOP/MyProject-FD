import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { FaBars } from 'react-icons/fa';
import { navData } from '../data/Data';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // auto-expand on desktop, collapse on mobile
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all duration-300 flex-shrink-0 relative ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4">
        <h1
          className={`text-xl font-bold transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Logo
        </h1>
      </div>

      {/* Hamburger (always visible at top left on mobile) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-6 z-10 text-white"
          aria-label="Toggle Sidebar"
        >
          <FaBars className="text-2xl" />
        </button>
      )}

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col gap-2 px-2">
        {navData.map(({ path, icon, name }, index) => (
          <NavLink
            to={path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2 rounded-md transition-colors ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
              }`
            }
          >
            <span className="text-lg">{React.createElement(icon)}</span>
            {isOpen && <span className="text-sm">{name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
