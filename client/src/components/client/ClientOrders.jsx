import React, { useEffect, useState } from "react";
import Navbar from "../header/navbar";
import axios from 'axios';
import { Link } from "react-router-dom";

const ClientOrders = () => {
    const loginUser = localStorage.getItem("token");
    let parsedUser;
    if (loginUser) {
    parsedUser = JSON.parse(loginUser);
    }
    const userName = parsedUser.user.name
    const userId = parsedUser.user._id
    console.log(userId);
    const dashboardStyle = {
        overflow: 'hidden'
      };
      const [orders, setOrder] = useState([]);
      const [loading, setLoading] = useState(true);
  
      const handelClick = async (orderId) => {
        try {
          await axios.post("http://localhost:1111/api/order/Done/Order", {orderId})
  
          // After updating the order status, fetch the updated list of orders
        const updatedOrders = await axios.get(`http://localhost:1111/api/order/userOrders/${userId}`);
        setOrder(updatedOrders.data);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          try {
            // Set loading to true while fetching data.
            setLoading(true);
    
            // Fetch orders.
            const response = await axios.get(`http://localhost:1111/api/order/userOrders/${userId}`);
            setOrder(response.data);
    
            // Set loading to false after fetching data.
            setLoading(false);
          } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, [userId]);


  return (
    <>
    <Navbar />
    <div>
      {/* Add any additional content or functionality specific to clients */}
    </div>
    <div className="container-fluid" id="dashboard" style={dashboardStyle}>
      <div className="row vh-100">
        <div className="col-2 col-md-3 col-lg-2 px-sm-2 px-0 shadow bg-dark">
          <div id="toTop">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 mt-5 text-white">
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item mb-4 mt-5">
                  <Link to="/home" className="nav-link align-middle px-0 text-light">
                    <i className="bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <hr />
                <li className="mb-4">
                  <Link to="" className="nav-link px-0 align-middle text-light">
                    <i className="bi bi-grid-3x3-gap"></i> <span className="ms-1 d-none d-sm-inline">Your Orders</span>
                  </Link>
                </li>
                <hr />
                <li className="mb-4">
                  <Link to="/trackOrder" className="nav-link px-0 align-middle text-light">
                    <i className="bi bi-grid-3x3-gap"></i> <span className="ms-1 d-none d-sm-inline">Track Order</span>
                  </Link>
                </li>
                <hr />
                {/* Add more list items as needed */}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-10 col-md-9 col-lg-10 py-2">

          <div className="row items-center me-0 mb-4">
            <h1 className="col fw-bold fs-2 ms-4 mt-4">Welcome, {userName}!</h1>
            <p className="fw-bold ms-4">This is your personalized dashboard as a Client.</p>
            <p className="fw-bold mb-0 fs-4">Your Orders</p>
          </div>
          
          <div>
          {loading ? (
                // Render a loading indicator while orders are being fetched.
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                  <div className="ms-2">Loading...</div>
                </div>
              ) :
          orders.length === 0 ? (<div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <p className="fs-3">You Have No Orders For This Moment!</p>
            </div>
          ) : (
            orders.map((order) => (
              <section key={order._id} className="navbar navbar-expand-lg navbar-light bg-warning rounded p-2 mb-2">
                <div className="mr-auto ms-5">
                  <p className="navbar-brand mb-0">resto</p>
                  <p className="mb-0 me-4 text-center">{order.restaurant_id.name}</p>
                </div>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <p className="nav-link m-0 p-0">Order : {order.menus.map((pr) => pr._id.name)}</p>
                    <p className="nav-link m-0 p-0">Quantity : {order.menus.map((pr) => pr.quantity)}</p>
                    <p className="nav-link m-0 p-0">Total : {order.total_price} dh</p>
                  </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <p className="nav-link m-0 p-0">name : {order.user_id.name}</p>
                    <p className="nav-link m-0 p-0">phone : {order.user_id.phone}</p>
                    <p className="nav-link m-0 p-0">address : {order.user_id.address}</p>
                  </li>
                </ul>
                <div className="me-5">
                  {order.status === 'done' ? (
                    <button className="btn btn-success text-light" disabled>
                      {order.status}
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={() => handelClick(order._id)}>Confirm</button>
                  )}
                </div>
              </section>
            ))
          )}
          
        </div>


        </div>
      </div>
    </div>
    </>
  )
}

export default ClientOrders