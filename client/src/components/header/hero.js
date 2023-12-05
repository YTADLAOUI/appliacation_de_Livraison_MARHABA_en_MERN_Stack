import React from 'react'
import './styles.module.css';
import SearchComponent from '../search/searchComponent';

function Hero() {
  return (
    <>
        <header className="">

            <div className="header-title mb-4">
                <p>
                    <b>Marhaba</b>, where mouthwatering flavors meet unparalleled convenience. 
                    Explore our diverse menu featuring delectable dishes from around the world, 
                </p>
            </div>
            <div class="container">
                <div class="row height d-flex justify-content-center align-items-center">

                    <div className="col-md-8">

                    {/* <div className="search d-flex">
                        <i className="fa fa-search"></i>
                        <input type="text" class="form-control me-2" placeholder="Would you like to search for a restaurant? Search Now"/>
                        <button class="btn btn-primary">Search</button>
                    </div> */}
                    <SearchComponent />
                    
                    </div>
                    
                </div>
            </div>

        </header>
    </>
  )
}

export default Hero