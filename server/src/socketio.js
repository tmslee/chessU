const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 8002;

// run when a client connects
io.on('connection', socket => {
  console.log('New connection...');

  // join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // listen for new message
  socket.on('newChatMessage', data => {
    io.in(roomId).emit('newChatMessage', data);
  })

  // leave the room if the user closes the socket
  socket.on('disconnect', () => {
    socket.leave(roomId);
  })
})


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})