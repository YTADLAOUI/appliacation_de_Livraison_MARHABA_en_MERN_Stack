import React, { useEffect, useState } from "react";
import Navbar from "../header/navbar";
import axios from 'axios';
import { Link } from "react-router-dom";
import io from 'socket.io-client';

const socket = io('http://localhost:1111');
const DeliveryWelcomePage = () => {
  const loginUser = localStorage.getItem("token");
    let parsedUser;
    if (loginUser) {
    parsedUser = JSON.parse(loginUser);
    }
    const userName = parsedUser.user.name

    const dashboardStyle = {
      overflow: 'hidden'
    };
    const [orders, setOrder] = useState([]);

    const handelClick = async (orderId, orderUserId) => {
      try {

        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('for track' ,latitude, longitude, orderUserId);
          // Emit the location data to the server
          socket.emit('updateLocation', {
            orderUserId,
            latitude,
            longitude,
          });
          });
    
        await axios.post("http://localhost:1111/api/order/Inprogress/Order", {orderId})

        // After updating the order status, fetch the updated list of orders
      const updatedOrders = await axios.get("http://localhost:1111/api/order/Accepted/Order");
      setOrder(updatedOrders.data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
    axios.get(`http://localhost:1111/api/order/Accepted/Order`)
    .then(res => {
        // console.log(res);
        const order = res.data;
        console.log(order);
        setOrder(order)
        })
    },[])

    useEffect(() => {
      socket.on('locationUpdated', (data) => {
        console.log('Location updated:', data);
        // Handle the updated location as needed (e.g., update a map)
      });
    
      return () => {
        // Cleanup socket connection on component unmount
        socket.disconnect();
      };
    }, []);

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
                  <Link to="/home" className="nav-link align-middle px-0 text-light">
                    <i className="bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <hr />
                <li className="mb-4">
                  <Link to="" className="nav-link px-0 align-middle text-light">
                    <i className="bi bi-grid-3x3-gap"></i> <span className="ms-1 d-none d-sm-inline">All Orders</span>
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
            <p className="fw-bold ms-4">This is your personalized dashboard as a Delivery.</p>
            <p className="fw-bold mb-0 fs-4">Orders List</p>
          </div>
          
          <div >
          {orders.map((order) => (
            <section className="navbar navbar-expand-lg navbar-light bg-warning rounded p-2 mb-2">
              <div className="mr-auto ms-5">
              <p className="navbar-brand mb-0">resto</p>
              <p className="mb-0 me-4 text-center" >{order.restaurant_id.name}</p>
              </div>
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <p className="nav-link m-0 p-0">Order : {order.menus.map((pr)=>(pr._id.name))}</p>
                    <p className="nav-link m-0 p-0">Quantity : {order.menus.map((pr)=>(pr.quantity))}</p>
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
              {order.status === 'inprogress' || order.status === 'done' ? (
                <button className="btn btn-success text-light" disabled>
                  {order.status}
                </button>
                  ) : (
                  <button className="btn btn-success" onClick={() => handelClick(order._id, order.user_id._id)}>Confirme</button>
                  )}
              </div>
            </section>
            ))}
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default DeliveryWelcomePage;