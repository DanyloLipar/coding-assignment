import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import YoutubePlayer from "../components/YoutubePlayer";

const AppLayout = () => {
  return (
    <>
      <Header />

      <div className="container">
        {true ? (
          <YoutubePlayer />
        ) : (
          <div style={{ padding: "30px" }}>
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default AppLayout;
