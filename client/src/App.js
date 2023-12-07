import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import '../src/style.css'
import './components/sign.css'


import Signup from "./components/signup";
import Login from "./components/login";
import ClientWelcomePage from "./components/client/welcome";
import DeliveryWelcomePage from "./components/delivery/welcome";
import ManagerWelcomePage from "./components/manager/welcome";
import AddRestaurantForm from "./components/manager/add_restaut";
import EmailVerify from "./components/verifyemail/index";
import ForgotPassword from "./components/forgotPassword";
import PasswordReset from "./components/PasswordReset";
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
import Map from "./components/tracking/Map";
import ClientOrders from "./components/client/ClientOrders";



function App() {

	return (
		<>
			<Routes>
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/api/user/client/me" exact element={<ClientWelcomePage />} />
				<Route path="/api/user/delivery/me" exact element={<DeliveryWelcomePage />} />
				<Route path="/api/user/manager/me" exact element={<ManagerWelcomePage />} />
				<Route path="/active-email/:token" element={<EmailVerify />} />
				<Route path="/send-reset-password-email" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<PasswordReset />} />
				<Route path="/home" element={<HomeScreen/>} />
				<Route path="/restaurants/:id/dishesHome" element={<HomeScreen/>} />
				<Route path="/restaurants/:id/dishesHome" element={<Product/>} />
				<Route path="//cartShopping" element={<CartShopping/>} />
				<Route path="/add_restaut" element={<AddRestaurantForm/>} />
				<Route path="/Dashboard" element={<Dashboard/>} />
				<Route path="/table" element={<Content/>} />
				<Route path="/add_dishe" element={<AddDishForm/>} />
				<Route path="/restaurants/:id/dishes" element={<RestaurantDishes/>} />
				<Route path="/restaurants" element={<HomeRestaut/>} />
				<Route path="/ClientOrders" element={<ClientOrders/>} />
				<Route path="/trackOrder" element={<Map/>} />
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/checkOut" element={<CheckOut/>} />
				<Route path="/no" element={<ManagerNontification/>} />
			</Routes>
		</>	
	);
	
}

export default App;
