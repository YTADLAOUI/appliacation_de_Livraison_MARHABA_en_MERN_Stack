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
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const restaurantRoutes = require("./routes/restaurantRoutes");
const OrderController = require("./controllers/OrderControllrt");
const {Server} = require("socket.io")
const http = require("http")
const mongoose = require("mongoose");
const Location = require('./models/Location');

connectDb();

const app = express();
const port = process.env.PORT || 1111;

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

  socket.on('updateLocation', async (data) => {
    console.log("recieve", data);
    const location = new Location({
      orderUserId: data.orderUserId,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    await location.save();

    socket.emit('locationUpdated', {
      orderUserId: data.orderUserId,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


app.use(express.json());
app.use(cookieParser());

// Cors Policy
app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for the API endpoints',
    },
    servers: [
      {
        url: 'http://localhost:1111/',
      },
    ],
  },
  apis: ['routes/orderRoute.js', 'routes/authRoute.js', 'routes/restaurantRoute.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// load routes
app.use("/api/auth", authRoutes);
app.use("/api/user", clientRoutes);
app.use("/api/user", deliveryRoutes);
app.use("/api/user", managerRoutes);
app.use("/api/order", orderRoute);
app.use("/api/role", roleRoutes);

app.use("/api/restaut", restaurantRoutes);

app.use('/api/restaut', restaurantRoutes);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
