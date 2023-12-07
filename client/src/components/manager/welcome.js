import React from "react";
import Navbar from "../header/navbar";

const ManagerWelcomePage = () => {
    return (
        <>
            <Navbar />
            <div>
                <h1>Welcome, Manager!</h1>
                <p>This is your personalized welcome page as a Manager.</p>
            </div>
        </>
    );
};

export default ManagerWelcomePage;