import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, role }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar role={role} />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
