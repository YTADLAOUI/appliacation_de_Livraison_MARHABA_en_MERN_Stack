const express = require("express");
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const managerRoutes = require("./routes/managerRoutes");
const roleRoutes = require("./routes/roleRoutes");
const orderRoute = require("./routes/orderRoute");
const swagger = require("./swagger");
const restaurantRoutes = require("./routes/restaurantRoutes");
const OrderController = require("./controllers/OrderControllrt");
const {Server} = require("socket.io")
const http = require("http")

connectDb();

const app = express();
const port = process.env.PORT || 5555;

// swagger
swagger(app);

//New imports
const httpServer = http.Server(app);

const socketIO = new Server(httpServer,{cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }});

app.io = socketIO

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(express.json());
app.use(cookieParser());

// Cors Policy
app.use(cors());

// load routes
app.use("/api/auth", authRoutes);
app.use("/api/user", clientRoutes);
app.use("/api/user", deliveryRoutes);
app.use("/api/user", managerRoutes);
app.use("/api/order", orderRoute);
app.use("/api/role", roleRoutes);

app.use("/api/restaut", restaurantRoutes);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
