/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const prd = useSelector((state) => state.valueCart.value);

  const loggOut =()=>{
    fetch('http://localhost:1111/api/auth/loggeduser')
    .then(()=>{
      console.log('before' )
      localStorage.removeItem('token')
      console.log('after')
      navigate('/login');

    })
    .catch()
  }

  const cart=()=>{
    navigate("/cartShopping")
  }
  const isAuthenticated = () => {
    const jwt = localStorage.getItem('token');
    if(jwt) return JSON.parse(jwt);
    return false
  }
  console.log(prd.list.length,"nav")
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">Marhaba</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <i className="nav-link active" aria-current="page" onClick={()=>navigate("/home")}>Home</i>
              </li>
              <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Specials</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={()=>navigate("/api/user/delivery/me")}>Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={()=>navigate("/trackOrder")}>Track Your Order</a>
              </li>

              {/* notification start*/}
              <li className={`nav-item me-3 me-lg-0 dropdown ${isDropdownOpen ? 'show' : ''}`}>
                <a
                  onClick={toggleDropdown}
                  className="nav-link dropdown-toggle hidden-arrow show"
                  role="button"
                  alt="Notifications"
                  id="navbarNotification"
                  data-mdb-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <i className="fas fa-bell" alt="Notifications"></i>
                  <span
                    id="navbarNotificationCounter"
                    className="badge rounded-pill badge-notification bg-danger"
                    alt="Notifications"
                    style={{ color: 'rgb(255, 255, 255)', display: 'none' }}
                  >
                    1
                  </span>
                </a>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}
                  id="navbarNotificationContent"
                  aria-labelledby="navbarDropdownMenuLink"
                  style={{
                    width: '250px',
                    position: 'absolute',
                    inset: '0px 0px auto auto',
                    margin: '0px',
                    transform: 'translate3d(0px, 44px, 0px)',
                  }}
                  data-popper-placement="bottom-end"
                  data-mdb-popper="null"
                >
                  <li>
                    <a
                      gtm-id="Notifications"
                      className="dropdown-item text-wrap border-bottom border-gray rounded"
                      data-notification-date="08/25/2023 16:55"
                      rel="nofollow noreferrer"
                    >
                      <p className="small text-uppercase mb-2">8/25/2023</p>
                      <p className="mb-0">
                        Get free hosting for your frontend project + database with MDB GO.
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      gtm-id="Notifications"
                      className="dropdown-item text-wrap"
                      data-notification-date="08/25/2023 16:55"
                      rel="nofollow noreferrer"
                    >
                      <p className="small text-uppercase mb-2">8/25/2023</p>
                      <p className="mb-0">
                        Get free hosting for your frontend project + database with MDB GO.
                      </p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* notification end */}

            </ul>

            
            {!isAuthenticated() &&  (
              <>
                <form className="d-flex me-3">
                    <button className="btn btn-outline-danger" type="submit">Sign In</button>
                </form>
                <form className="d-flex">
                    <button className="btn btn-outline-danger" type="submit">Sign Up</button>
                </form>
              </>  
            )} 

            {isAuthenticated() && (
              <>
                <div className="d-flex">
            <span className="btn btn-outline-danger me-1" onClick={cart} ><i className='fas fa-shopping-cart'><span>{prd?.list.length}</span></i></span>
                </div>
                <div className="d-flex">
                    <span className="btn btn-outline-danger" onClick={loggOut}>logout</span>
                </div>
              </>
             )} 
           
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;