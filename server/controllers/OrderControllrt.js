const Order = require("../models/Order")



class OrderController{
static insertOrder=(req,res)=>{
try{
   const {position,products,restaurant_id,total,user_id}=req.body;
  console.log(req.body,"hrrr")
  console.log(products,'jjj')
const order=new Order({
  user_id:user_id,
  restaurant_id:restaurant_id,
  menus:[{
    _id:'65633425d0709fd95d532d70',
    quantity:'3'
  }],
  total_price:total,
  trk:position
})
console.log(order,'yassir')
 order.save();
return res.status(200).json("Order en panding")
}catch(err){
  console.log(err)
}
}
}

module.exports=OrderController