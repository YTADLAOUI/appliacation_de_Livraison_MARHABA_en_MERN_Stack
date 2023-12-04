import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Content from './Content'
import { Table } from 'react-bootstrap'
import Navbar from "../header/navbar";

const AppSidebar = () => {


  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <a href="/add_restaut" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">add Restaurant </span>
            </a>
            <a href="/add_dishe " className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">add Dishe </span>
            </a>
            {/* Other sidebar content */}
          </div>
        </div>
        <div className="col py-3">
          <h1>Restaurant dishes</h1>
          <Content/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AppSidebar)
