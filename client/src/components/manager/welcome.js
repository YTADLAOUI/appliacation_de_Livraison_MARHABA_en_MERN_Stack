import React from "react";
import Navbar from "../header/navbar";

const ManagerWelcomePage = () => {
  return (
    <>
    <Navbar />
    <div>
      <h1>Welcome, Manager!</h1>
      <p>This is your personalized welcome page as a Manager.</p>
      {/* Add any additional content or functionality specific to clients */}
    </div>
    </>
  );
};

export default ManagerWelcomePage;