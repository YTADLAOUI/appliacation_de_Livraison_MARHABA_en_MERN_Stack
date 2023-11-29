import React, { useEffect, useState } from "react";
import Navbar from "../header/navbar";
import axios from 'axios';

const DeliveryWelcomePage = () => {
    const dashboardStyle = {
      overflow: 'hidden'
    };

    const [orders, setOrder] = useState({});

    useEffect(()=>{
    axios.post(``)
    .then(res => {
        // console.log(res);
        const order = res.body;
        // console.log(order);
        setOrder(order)
        })
    },[])

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
              <p className="navbar-brand mb-0 ms-1" >test</p>
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <p className="nav-link mb-0">test</p>
                  </li>
                </ul>
              <div className="me-2">
                  <button className="btn btn-success" type="submit">Confirme</button>
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