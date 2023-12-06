import React from "react";

import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import Main from "./components/main";
import Signup from "./components/signup";
import Login from "./components/login";
import ClientWelcomePage from "./components/client/welcome";
import DeliveryWelcomePage from "./components/delivery/welcome";

import ManagerWelcomePage from "./components/manager/welcome";
import AddRestaurantForm from "./components/manager/add_restaut";
import EmailVerify from "./components/verifyemail/index";
import ForgotPassword from "./components/forgotPassword";
import PasswordReset from "./components/PasswordReset";
import Home from "./components/home";
import Restaurant from "./components/pages/Restaurant";
// import Navbar from "./components/header/navbar"
import 'bootstrap/dist/css/bootstrap.css'
import '../src/style.css'
import './components/sign.css'
import HomeScreen from "./components/add_a_Panies/HomeScreen";
import CheckOut from "./components/add_a_Panies/checkOut";
import Product from "./components/add_a_Panies/Product";
import CartShopping from "./components/add_a_Panies/cartShopping"
import  Content from "./components/manager/Content";
import Dashboard from "./components/manager/Dashboard";
import AddDishForm from "./components/manager/AddDishForm";
import RestaurantDishes from "./components/manager/RestaurantDishes";
import ManagerNontification from "./components/orders/managerNontification";
import HomeRestaut from "./components/restaut/homeRestaut"
function App() {
	// const user = localStorage.getItem("token");

	return (
		<>
		    {/* <Navbar /> */}
			<Routes>
				{/* {user && <Route path="/" exact element={<Main />} />} */}
				<Route path="/" exact element={<Home />} />
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/api/user/client/me" exact element={<ClientWelcomePage />} />
				<Route path="/api/user/delivery/me" exact element={<DeliveryWelcomePage />} />
				<Route path="/api/user/manager/me" exact element={<ManagerWelcomePage />} />
				<Route path="/active-email/:token" element={<EmailVerify />} />
				<Route path="/send-reset-password-email" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<PasswordReset />} />
				<Route path="/restaurant/search/:name?" element={<Restaurant />} />
			
				<Route path="/home" element={<HomeScreen/>} />
				<Route path="/restaurants/:id/dishesHome" element={<HomeScreen/>} />
				<Route path="/restaurants/:id/dishesHome" element={<Product/>} />
				<Route path="//cartShopping" element={<CartShopping/>} />
 crud_menu
				<Route path="/add_restaut" element={<AddRestaurantForm/>} />
				<Route path="/Dashboard" element={<Dashboard/>} />
				<Route path="/table" element={<Content/>} />
				<Route path="/add_dishe" element={<AddDishForm/>} />
				<Route path="/restaurants/:id/dishes" element={<RestaurantDishes/>} />
				<Route path="/restaurants" element={<HomeRestaut/>} />
                
				<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/checkOut" element={<CheckOut/>} />
			<Route path="/no" element={<ManagerNontification/>} />

				<Route path="/trackOrder" element={<Map/>} />
				<Route path="/clientOrders" element={<ClientOrders/>} />
				<Route path="/add_restaut" element={<Add_restaut/>} />
  
			</Routes>


		</>	
	);
}

export default App;
