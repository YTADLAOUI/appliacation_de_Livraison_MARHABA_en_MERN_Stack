import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/main";
import Signup from "./components/signup";
import Login from "./components/login";
import ClientWelcomePage from "./components/client/welcome";
import DeliveryWelcomePage from "./components/delivery/welcome";
import ManagerWelcomePage from "./components/manager/welcome";
import Add_restaut from "./components/manager/add_restaut";
import EmailVerify from "./components/verifyemail/index";
import ForgotPassword from "./components/forgotPassword";
import PasswordReset from "./components/PasswordReset";
// import Navbar from "./components/header/navbar";
import 'bootstrap/dist/css/bootstrap.css'
import '../src/style.css'
import './components/sign.css'
import HomeScreen from "./components/add_a_Panies/HomeScreen";
import Product from "./components/add_a_Panies/Product";
import CartShopping from "./components/add_a_Panies/cartShopping"
import Map from "./components/tracking/Map";
import CheckOut from "./components/add_a_Panies/checkOut";
import ManagerNontification from "./components/orders/managerNontification";
import ClientOrders from "./components/client/ClientOrders";

function App() {
	// const user = localStorage.getItem("token");

	return (
		<>
		    {/* <Navbar /> */}
			<Routes>
				{/* {user && <Route path="/" exact element={<Main />} />} */}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/api/user/client/me" exact element={<ClientWelcomePage />} />
				<Route path="/api/user/delivery/me" exact element={<DeliveryWelcomePage />} />
				<Route path="/api/user/manager/me" exact element={<ManagerWelcomePage />} />
				<Route path="/active-email/:token" element={<EmailVerify />} />
				<Route path="/send-reset-password-email" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<PasswordReset />} />
				<Route path="/home" element={<HomeScreen/>} />
				<Route path="/prod" element={<Product/>} />
				<Route path="//cartShopping" element={<CartShopping/>} />
				<Route path="/trackOrder" element={<Map/>} />
				<Route path="/clientOrders" element={<ClientOrders/>} />
				<Route path="/add_restaut" element={<Add_restaut/>} />



				<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/checkOut" element={<CheckOut/>} />
			<Route path="/no" element={<ManagerNontification/>} />
			</Routes>


		</>	
	);
}

export default App;
