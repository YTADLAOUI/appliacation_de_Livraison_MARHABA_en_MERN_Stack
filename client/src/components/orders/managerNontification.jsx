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
const label = { inputProps: { 'aria-label': 'Switch demo' } };

 
const ManagerNontification = () => {
  const [orders,setOrder]=useState([]);
  const [checked, setChecked] = useState(false);
  const[datas,setDatas]=useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    const response = axios.post("http://localhost:1111/api/order/livreur",datas).then((response)=>{console.log(response.data)}).catch(console.log)
  };
  useEffect(() => {
    const socket = io('http://localhost:1111'); 

  //  console.log(socket)

  const obj = JSON.parse(localStorage.getItem('token'));
    socket.on('order-was-placed', (data) => {
      
      if (data && data.order && obj.role == "manager" && data.manger==obj.user._id)
       {
        console.log('entre')
        console.log(data.message);
        console.log(data);
        setDatas([...datas,data])
        setOrder([...orders,data.order]);
        }
    });
    
    // return () => {
      //   socket.disconnect();
      // };
    },[]);
    
    console.log(orders,'hello')
    // const ordersArr=Array.from(orders)
    // console.log(ordersArr,"arr")
  return (
    <>
    {
      orders ? (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">Fat&nbsp;</TableCell>
            <TableCell align="right">Carbs&nbsp;</TableCell>
            <TableCell align="right">accepte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.status}
              </TableCell>
              <TableCell align="right">{order.total_price}</TableCell>
               <TableCell align="right">{order.restaurant_id}</TableCell>
              <TableCell align="right">{order._id}</TableCell>
              <TableCell align="right">
                {checked? 
                <TableCell><Switch {...label} disabled/></TableCell>  :(
              <Switch
                  checked={checked}
                  onChange={handleChange}
                />)}
                </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>):(<p>Loading ...</p>)
    
}
    </>
  );
}

export default ManagerNontification