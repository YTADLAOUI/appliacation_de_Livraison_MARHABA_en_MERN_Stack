const Dishe = require("../models/Dishe");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
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
       
       const restaurant = await Restaurant.findOne({ _id: restaurant_id });
        console.log(restaurant,'herrrr')
        const manager = '6563151e82298b67df6af7a3';

       const user = await UserModel.findOne({ _id: user_id });
       console.log(user,'user')
       const menuComplet = await Promise.all(
        order.menus.map(async (menu) => {
          const product = await Dishe.findOne({ _id: menu._id });
          return {
            _id: menu._id,
            name: product ? product.name : 'Unknown Product',
            quantity: menu.quantity,
          };
        })
      );
      console.log(menuComplet,'good')
       req.app.io.emit("order-was-placed", {
         message: `New order placed by ${user.name}`,
         order: order,
         menuComplet:menuComplet,
         manger:manager,
         restaurant:restaurant,
         user:user
        }
       );
      return res.status(200).json("Order en panding");
    } catch (err) {
      console.log(err);
    }
  };
  static livreurOrder= async(req,res)=>{
    //  const {}=req.body
    req.app.io.emit("order-to-livreur", {
      message: `New order placed by`,
    });
    console.log(req.body)
    return res.status(200).json("livreur")
  }
}

module.exports = OrderController;
