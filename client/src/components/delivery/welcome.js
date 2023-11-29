import React from "react";
import Navbar from "../header/navbar";

const DeliveryWelcomePage = () => {
    const dashboardStyle = {
      overflow: 'hidden'
    };
  return (
    <>
    <Navbar />
    <div>
      {/* Add any additional content or functionality specific to clients */}
    </div>
    <div className="container-fluid" id="dashboard" style={dashboardStyle}>
      <div className="row">
        <div className="col-2 col-md-3 col-lg-2 px-sm-2 px-0 shadow bg-dark vh-100">
          <div id="toTop">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 mt-5 text-white">
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item mb-4 mt-5">
                  <a href="/home" className="nav-link align-middle px-0 text-light">
                    <i className="bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <hr />
                <li className="mb-4">
                  <a href="" className="nav-link px-0 align-middle text-light">
                    <i className="bi bi-grid-3x3-gap"></i> <span className="ms-1 d-none d-sm-inline">All Orders</span>
                  </a>
                </li>
                <hr />
                {/* Add more list items as needed */}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-10 col-md-9 col-lg-10 py-2">

          <div className="row items-center me-0 mb-4">
            <h1 className="col fw-bold fs-2 ms-4 mt-4">Welcome, Delivery!</h1>
            <p className="fw-bold ms-4">This is your personalized dashboard as a Delivery.</p>
          </div>
          
          <div >
            <section className="navbar navbar-expand-lg navbar-light bg-warning rounded p-2">
              <a className="navbar-brand" href="">test</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#">test</a>
                  </li>
                </ul>
                  <button className="btn btn-outline-success" type="submit">Confirme</button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default DeliveryWelcomePage;