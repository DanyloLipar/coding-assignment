import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="general">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
