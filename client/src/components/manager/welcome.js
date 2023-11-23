import React from "react";
import Navbar from "../header/navbar";

const ManagerWelcomePage = () => {
    return (
        <>
            <Navbar />
            <div>
                <h1>Welcome, Manager!</h1>
                <p>This is your personalized welcome page as a Manager.</p>
                
                {/* Manager-specific functionality */}
                <button onClick={() => { /* Add manager-specific functionality here */ }}>
                    Manager Action 1
                </button>
                <button onClick={() => { /* Add another manager-specific functionality here */ }}>
                    Manager Action 2
                </button>

                
            </div>
        </>
    );
};

export default ManagerWelcomePage;