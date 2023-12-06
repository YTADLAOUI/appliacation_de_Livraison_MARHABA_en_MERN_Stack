import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { io } from 'socket.io-client';

function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nontif,setNontif]=useState(null)
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
 const roleNotification= JSON.parse(localStorage.getItem('token'));
  console.log(roleNotification?.role)
  useEffect(() => {
    const socket = io('http://localhost:1111'); 

    
    socket.on('order-was-placed', (data) => {
      console.log(data,"bro")
      console.log('New order:', data.message);
      console.log('Order details:', data.order);
      console.log('User details:', data.user);
      const roleNotification= JSON.parse(localStorage.getItem('token'));
        if(roleNotification.role=="manager") setNontif(data.message);
       const managerId="12345FDEFA";
       console.log(managerId)
      if (data && data.order && data.order.manager === managerId) {
        console.log(data.message);
        console.log(data.order);
      }
    
    },[]);

    return () => {
      socket.disconnect();
    };
  }, []);
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
      <nav className="navbar navbar-expand-lg bg-white fixed-top">
        <div className="container">
          <a className="navbar-brand">Marhaba</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <i className="nav-link active" aria-current="page" onClick={()=>navigate("/home")}>Home</i>
              </li> */}
              {/* <li className="nav-item">
                <a className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Specials</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Events</a>
              </li> */}
              


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
              <div className="nav-item ">
                <a className="nav-link" onClick={()=>navigate("/api/user/delivery/me")}>Dashboard</a>
              </div>
              <div className="nav-item">
                <a className="nav-link" onClick={()=>navigate("/clientOrders")}>Your Orders</a>
              </div>
                <div className="d-flex">
                  
              {/* notification start*/}
              <div className={`nav-item me-3 me-lg-0 dropdown ml-auto ${isDropdownOpen ? 'show' : ''}`}>
                <i
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
                </i>
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
                        {
                          nontif
                        }

                      </p>
                    </a>
                  </li>
                  {/* <li>
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
                  </li> */}
                </ul>
              </div>
              {/* notification end */}
                  <span className="btn btn-outline-danger me-1" style={{ border: 'none' }} onClick={cart}>
                    <i className='fas fa-shopping-cart'>
                      <span style={{ marginLeft: '5px',fontSize:'10px'}}>{prd?.list.length}</span>
                    </i>
                  </span>
                </div>
                <div className="d-flex">
                    <span className="btn btn-outline-danger" onClick={loggOut}>logout</span>
                </div>
              </>
             )} 
           
          </div>
        </div>
      </nav>
  );
}

export default Navbar;