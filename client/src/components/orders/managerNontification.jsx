import React, { useEffect, useState } from 'react'
// import io from 'socket.io-client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Sidebar from '../sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Navbar from '../header/navbar';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const loginUser = localStorage.getItem("token");
    let parsedUser;
    if (loginUser) {
    parsedUser = JSON.parse(loginUser);
    }
    const userName = parsedUser?.user?.name
const dashboardStyle = {
      overflow: 'hidden'
    };

 
const ManagerNontification = () => {
  const [orders,setOrder]=useState([]);
  const [checked, setChecked] = useState(false);
  const[datas,setDatas]=useState([]);
   const [open, setOpen] = useState(false);
   const [currentOrder, setCurrentOrder] = useState(null);
  //  const [dataSent, setDataSent] = useState(() => {
  //   // Load the value from localStorage or default to false
  //   const storedValue = localStorage.getItem('dataSent');
  //   return storedValue ? JSON.parse(storedValue) : false;
  // });
  const [dataSentMap, setDataSentMap] = useState(() => {
    // Load the value from localStorage or default to an empty map
    const storedValue = localStorage.getItem('dataSentMap');
    return storedValue ? new Map(JSON.parse(storedValue)) : new Map();
  });
  
  
   const handleOpen = (order) => {
    setOpen(true);
    setCurrentOrder(order);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentOrder(null);
  };
  const handleChange = async (orderId, event) => {
    if (!dataSentMap.get(orderId)) {
      setChecked((prevChecked) => ({
        ...prevChecked,
        [orderId]: event.target.checked,
      }));
      const order = orders.find((o) => o._id === orderId);
      const sendData = {
        orderId: order._id,
        user: order.user_id,
        menus:order.menus,
        position:order.trk,
        prix:order.total_price,
        restaurant:order.restaurant_id
      };
      console.log("rrrrrrrrrrrrrrr",sendData);
      try {
        const response = await axios.post("http://localhost:1111/api/order/livreur", sendData);
        console.log(response.data);

        setDataSentMap((prevMap) => {
          const newMap = new Map(prevMap);
          newMap.set(orderId, true);
          return newMap;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    localStorage.setItem('dataSentMap', JSON.stringify(Array.from(dataSentMap.entries())));
  }, [dataSentMap]);
    useEffect(()=>{
      try{
        const fetchData = async () => {
        const respons= await axios.post("http://localhost:1111/api/order/Order")
        console.log(respons.data,'data')
        setOrder(...orders,respons.data)
        setDatas(...datas,respons.data)
      
      }
        fetchData()
      }catch(error){
        console.log(error)
      }
       

},[])
 
  return (
    <>
    <Navbar></Navbar>
   

  <div className="container-fluid" id="dashboard" style={dashboardStyle}>
      <div className="row vh-100">
        <div className="col-2 col-md-3 col-lg-2 px-sm-2 px-0 shadow bg-dark">
          <div id="toTop">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 mt-5 text-white">
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item mb-4 mt-5">
                  <Link to="/home" className="nav-link align-middle px-0 text-light">
                    <i className="bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <hr />
                <li className="mb-5">
                  <Link to="" className="nav-link px-0 align-middle text-light">
                    <i className="bi bi-grid-3x3-gap"></i> <span className="ms-1 d-none d-sm-inline">All Orders</span>
                  </Link>
                </li>
                <li className="mb-5">
                  <Link to="/dashboard" className="nav-link px-0 align-middle text-light">
                    <i className="bi bi-grid-3x3-gap"></i> <span className="ms-1 d-none d-sm-inline">Add New</span>
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
            <p className="fw-bold ms-4">This is your personalized dashboard as a Manager.</p>
            <p className="fw-bold mb-0 fs-4">Orders List</p>
          </div>
          
          <div >

          {
        orders ? (
        <TableContainer component={Paper} className='container d-flex bg-warning justify-content-center align-items-center mt-5'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell></TableCell> */}
            <TableCell>name</TableCell>
            <TableCell >prodact</TableCell>
            <TableCell >status</TableCell>
            <TableCell >price</TableCell>
            <TableCell >accepte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className=''
            >
              <TableCell className='text-secondary'>{order.user_id.name}</TableCell>
              <TableCell ><Button onClick={() => handleOpen(order)} className='text-secondary'>product</Button></TableCell>
              <TableCell component="th" scope="row" className='text-secondary'>
                {order.status}
              </TableCell>
              <TableCell className='text-secondary'>{order.total_price}</TableCell>
              <TableCell className='text-secondary'>
              <Switch
                      checked={checked[order._id] || false}
                      onChange={(event) => handleChange(order._id, event)}
                      disabled={dataSentMap.get(order._id)}
                    />
                </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>):(<p>Loading ...</p>)
}
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
     <Box sx={style} className='border rounded border-warning bg-warning'>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Details
          </Typography> */}
          <TableHead>
          <TableRow>
            <TableCell id="modal-modal-title" variant="h6" component="h2" className='fs-3'>Product Details</TableCell>
          </TableRow>
        </TableHead>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentOrder &&
              currentOrder.menus.map((item) => (
                <div key={item._id}>
                  <p>Order name : {item._id.name}</p> 
                  <p>Order Quantity : {item.quantity}</p>
                </div>
              ))}
          </Typography>
        </Box>
  </Modal>
          
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default ManagerNontification