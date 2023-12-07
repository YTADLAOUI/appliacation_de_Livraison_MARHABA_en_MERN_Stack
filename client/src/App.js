import React from "react";
import { Route, Routes } from "react-router-dom";
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
import  MiddlewareLogin from "./components/middlewares/MiddlewareLogin"
import  MiddlewareDelivery from "./components/middlewares/middlewaresDelivery"
import  MiddlewareManager from "./components/middlewares/MiddlewareManager"
import  MiddlewareLogOut from "./components/middlewares/MiddlewareLogOut"
function App() {

	return (
		<>
			<Routes>
				
				<Route path="/api/user/manager/me" exact element={<MiddlewareManager><ManagerWelcomePage /></MiddlewareManager>} />
				<Route path="/add_restaut" element={<MiddlewareManager><AddRestaurantForm/></MiddlewareManager>} />
				<Route path="/manager/orders" element={<MiddlewareManager><ManagerNontification/></MiddlewareManager>} />
				<Route path="/add_dishe" element={ <MiddlewareManager><AddDishForm/></MiddlewareManager>} />
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<MiddlewareLogOut><Login /></MiddlewareLogOut>} />
				<Route path="/" exact element={<MiddlewareLogOut><Login /></MiddlewareLogOut>} />
				<Route path="/active-email/:token" element={<EmailVerify />} />
				<Route path="/reset-password" element={<PasswordReset />} />
				<Route path="/send-reset-password-email" element={<ForgotPassword />} />
				<Route path="/api/user/client/me" exact element={ <MiddlewareLogin><ClientWelcomePage /></MiddlewareLogin>} />
				<Route path="/api/user/delivery/me" exact element={<MiddlewareDelivery><DeliveryWelcomePage /></MiddlewareDelivery>} />
				<Route path="/restaurants/:id/dishesHome" element={<MiddlewareLogin><HomeScreen/></MiddlewareLogin>} />
				<Route path="/restaurants/:id/dishesHome" element={<MiddlewareLogin><Product/></MiddlewareLogin>} />
				<Route path="//cartShopping" element={<MiddlewareLogin><CartShopping/></MiddlewareLogin>} />
				<Route path="/Dashboard" element={<MiddlewareManager><Dashboard/></MiddlewareManager>} />
				<Route path="/table" element={<Content/>} />
				<Route path="/restaurants/:id/dishes" element={<MiddlewareLogin><RestaurantDishes/></MiddlewareLogin>} />
				<Route path="/restaurants" element={<MiddlewareLogin><HomeRestaut/></MiddlewareLogin>} />
				<Route path="/ClientOrders" element={<MiddlewareLogin><ClientOrders/></MiddlewareLogin>} />
				<Route path="/trackOrder" element={<MiddlewareLogin><Map/></MiddlewareLogin>} />
			<Route path="/checkOut" element={<MiddlewareLogin><CheckOut/></MiddlewareLogin>} />
			<Route path="/permition" element={<h1>404 - DON'T HAVE ACCESS TO THIS PAGE</h1>} />
			
			
			</Routes>
		</>	
	);
}

export default App;
