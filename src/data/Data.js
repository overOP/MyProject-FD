// src/data/Data.js
import { FaHome, FaUser, FaCog, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { MdShoppingCartCheckout } from "react-icons/md";

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
  {
    name: 'Cart',
    path: '/cart',
    icon: MdShoppingCartCheckout,
  }
];
