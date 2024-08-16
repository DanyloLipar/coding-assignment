import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PlayerModal from "../components/PlayerModal";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="general">
        <Outlet />
      </main>
      <PlayerModal />
    </>
  );
};

export default AppLayout;
