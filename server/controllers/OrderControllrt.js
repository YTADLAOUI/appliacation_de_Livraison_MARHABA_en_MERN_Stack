const Dishe = require("../models/Dishe");
const Order = require("../models/Order");
// const Restaurant = require("../models/Restaurant");
const UserModel = require("../models/User");

class OrderController {
  static insertOrder = async(req, res) => {
    try {
      const { position, products, restaurant_id, total, user_id } = req.body;
      const order = new Order({
        user_id: user_id,
        restaurant_id: restaurant_id,
        menus: [
          {
            _id: "65633425d0709fd95d532d70",
            quantity: "3",
          },
        ],
        total_price: total,
        trk: position,
      });
      order.save();
       

            
       const user = await UserModel.findOne({ _id: user_id });
       try {
        const manager = '6563151e82298b67df6af7a3';
       req.app.io.emit("order-was-placed", {
         message: `New order placed by ${user.name}`,
         order: order,
         user:user,
         manager:manager
        }
       );}catch(err){
        console.log(err)
       }
      return res.status(200).json("Order en panding");
    } catch (err) {
      console.log(err);
    }
  };
  static getOrder=async(req,res)=>{
    try {

      const orders = await Order.find({})
        .populate('restaurant_id')
        .populate('user_id')
        .populate({
          path: 'menus._id',
          model: 'Dish',
        });
      return res.status(200).json(orders)
    } catch (error) {
      console.log(error)
    }
  }
  static livreurOrder= async(req,res)=>{
      const {orderId}=req.body

      const result = await Order.updateOne(
        { _id: orderId },
        { $set: { status: 'accepted' } }
      );

    req.app.io.emit("order-to-livreur", {
      message: `New order placed by`,
    });
    console.log(req.body)
    return res.status(200).json("livreur")
  }

  static getAcceptedOrder = async(req,res)=>{
    try {
      const orders = await Order.find({ 'status': { $in: ['accepted', 'inprogress', 'done'] } })
        .populate('restaurant_id')
        .populate('user_id')
        .populate({
          path: 'menus._id',
          model: 'Dish',
        });
      return res.status(200).json(orders)
    } catch (error) {
      console.log(error)
    }
}

static changeOrderStatus = async(req,res)=>{

  const orderId = req.body.orderId
  console.log(orderId);
  await Order.updateOne(
    { _id: orderId },
    { $set: { status: 'inprogress' } }
  );

  return res.status(200).json("Order inprogress")
}

static getUserRestoPosition = async (req, res) => {
  const userId = req.params.userId; // Assuming you pass the user ID as a parameter
  // console.log(userId);
  try {
    const orders = await Order.find({ 'status': 'inprogress', 'user_id': userId })
      .populate('restaurant_id')
      .populate('user_id')
      .populate({
        path: 'menus._id',
        model: 'Dish',
      });
    
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

static orderStatusToDone = async(req,res)=>{

  const orderId = req.body.orderId
  console.log(orderId);
  await Order.updateOne(
    { _id: orderId },
    { $set: { status: 'done' } }
  );

  return res.status(200).json("Order inprogress")
}

static getUserOrders = async (req, res) => {
  const userId = req.params.userId; // Assuming you pass the user ID as a parameter
  // console.log(userId);
  try {
    const orders = await Order.find({ 'status': { $in: ['inprogress', 'done'] }, 'user_id': userId })
      .populate('restaurant_id')
      .populate('user_id')
      .populate({
        path: 'menus._id',
        model: 'Dish',
      });
    
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

}

module.exports = OrderController;
