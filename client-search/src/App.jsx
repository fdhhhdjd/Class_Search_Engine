//* LIB
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoclose={4000}
        hideprogressbar={false}
        newestontop={false}
        closeonclick
        rtl={false}
        pauseonfocusloss
        draggable
        pauseonhover
      />
      <Outlet />
    </React.Fragment>
  );
};

export default App;
