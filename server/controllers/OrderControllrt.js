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
    
       req.app.io.emit("order-was-placed", {
         message: `New order placed by ${user.name}`,
         order: order,
         menuComplet:menuComplet,
         user:user
        }
       );
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
       

         const manager = '6563151e82298b67df6af7a3';
      
       req.app.io.emit("order-was-placed", {
         message: `New order placed by`,
         orders: orders,
         manger:manager,
        }
       );
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
}

module.exports = OrderController;
