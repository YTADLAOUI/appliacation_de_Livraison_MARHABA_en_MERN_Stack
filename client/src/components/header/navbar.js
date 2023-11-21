import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Navbar() {

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
                <a className="nav-link">Chefs</a>
              </li>
            </ul>

            
            {/* {!isAuthenticated() &&  (
              <>
                <form className="d-flex me-3">
                    <button className="btn btn-outline-danger" type="submit">Sign In</button>
                </form>
                <form className="d-flex">
                    <button className="btn btn-outline-danger" type="submit">Sign Up</button>
                </form>
              </>  
            )} 

            {isAuthenticated() && ( */}
              <>
                <div className="d-flex">
            <span className="btn btn-outline-danger me-1" onClick={cart} ><i className='fas fa-shopping-cart'><span>{prd?.list.length}</span></i></span>
                </div>
                <div className="d-flex">
                    <span className="btn btn-outline-danger" onClick={loggOut}>logout</span>
                </div>
              </>
            {/* )} */}
           
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;