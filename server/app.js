const express = require("express");
const connectDb = require("./config/connectDb")
const dotenv = require('dotenv').config();
const cors = require("cors")
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoutes")
const clientRoutes = require("./routes/clientRoutes")
const deliveryRoutes = require("./routes/deliveryRoutes")
const managerRoutes = require("./routes/managerRoutes")
const roleRoutes = require("./routes/roleRoutes")
const swagger = require("./swagger")
const restaurantRoutes = require('./routes/restaurantRoutes');
const {createServer} = require('http');
const {Server} = require('socket.io');

connectDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});


const port = process.env.PORT || 1111;

// swagger
swagger(app);

app.use(express.json());
app.use(cookieParser());


// Cors Policy
app.use(cors());

// load routes
app.use("/api/auth", authRoutes);
app.use("/api/user", clientRoutes);
app.use("/api/user", deliveryRoutes);
app.use("/api/user", managerRoutes)

app.use("/api/role", roleRoutes)

app.use('/api/restaut', restaurantRoutes);

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("error", (err) => {
        console.error("Socket error:", err);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
})