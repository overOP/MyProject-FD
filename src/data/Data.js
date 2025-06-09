// src/data/Data.js
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

export const navData = [
  {
    name: 'Home',
    path: '/',
    icon: FaHome,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: FaUser,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: FaChartBar,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: FaCog,
  },
  {
    name: 'Login',
    path: '/login',
    icon: FaSignOutAlt,
  },
  {
    name: 'Signup',
    path: '/signup',
    icon: FaSignOutAlt,
  },
];
