import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
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
const label = { inputProps: { 'aria-label': 'Switch demo' } };

 
const ManagerNontification = () => {
  const [orders,setOrder]=useState([]);
  const [checked, setChecked] = useState(false);
  const[datas,setDatas]=useState([]);
   const [user,setUser]=useState([]);
   const [product,setProduct]=useState([]);
   const [restaurant,setRestaurant]=useState([]);
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
    {
      orders ? (
        <TableContainer component={Paper} className='container d-flex justify-content-center align-items-center mt-5'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell></TableCell> */}
            <TableCell>name</TableCell>
            <TableCell align="">prodact</TableCell>
            <TableCell align="">status</TableCell>
            <TableCell align="">price</TableCell>
            <TableCell align="">accepte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{order.user_id.name}</TableCell>
              <TableCell align=""><Button onClick={() => handleOpen(order)}>product</Button></TableCell>
              <TableCell component="th" scope="row">
                {order.status}
              </TableCell>
              <TableCell align="">{order.total_price}</TableCell>
              <TableCell align="">
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
     <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product ---- Qté
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentOrder &&
              currentOrder.menus.map((item) => (
                <div key={item._id}>
                  <span>{item._id.name}</span> - <span>{item.quantity}</span>
                </div>
              ))}
          </Typography>
        </Box>
  </Modal>
    </>
  );
}

export default ManagerNontification