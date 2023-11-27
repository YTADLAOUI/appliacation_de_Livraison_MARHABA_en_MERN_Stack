import React, { useEffect } from 'react'
import io from 'socket.io-client';

const ManagerNontification = () => {
  useEffect(() => {
    const socket = io('http://localhost:1111'); 

   console.log(socket)
    socket.on('order-was-placed', (data) => {
      console.log(data,'here socket')

      
      const managerId = "";
      console.log(data.order) ;
      console.log(data.manger,'why')
      if (data && data.order && data.order.manager === managerId) {
       
        console.log(data.message);
        console.log(data.order);
      }
    });

    return () => {
      socket.disconnect();
    };
  },[]);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default ManagerNontification