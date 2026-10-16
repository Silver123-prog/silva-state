const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Socket.io Real-Time Messaging Connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (listingId) => {
    socket.join(listingId);
    console.log(`User joined listing chat room: ${listingId}`);
  });

  socket.on("send_message", (data) => {
    // Send message to everyone in that property's chat room
    io.to(data.listingId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Silva State Backend API & Socket.io Server is Running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Silva State Server running on port ${PORT}`));