import React from "react";



// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
 
} from "react-icons/md";
import Dashboard from "views/admin/dashboard/Dashboard";

import UserOrders from "views/admin/orders/UserOrders";

import Products from "views/admin/products/Products";
import Users from "views/admin/users/Users";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard/>,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <UserOrders/>,
    secondary: true,
  },
  {
    name: "Products",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products",
    component: <Products />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Users />,
  },
 
  
];
export default routes;
