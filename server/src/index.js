const PORT = process.env.PORT || 8001;
const ENV = require("./environment");

const app = require("./application")(ENV);
const server = require("http").Server(app);

const { addMatch } = require("./db_helpers/db_match_helpers.js");
const  { sortUsers } = require("../src/helpers/sort_users_helper");

// const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_CHESS_MOVE_EVENT = "newChessMove";
const RANKED = "RANKED";
const CASUAL = "CASUAL";
const RANKED_ACCEPT = "RANKED_ACCEPT";
const DEQUEUE = "DEQUEUE";
const confirmation = [];

const ranked = [];
const casual = [];

const dequeue = function(Q, userId) {
  Q.forEach( (user, idx) => {
    console.log(user, idx);
    // console.log(user.socketId, socketId);
    if(user.userId === userId) {
      Q.splice(idx, 1);
      console.log(Q);
    }
  })
};

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages and send it to everyone in the room
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
  
  // Listen for new user who queues up
  // data = {userId, elo, socketId}

   // sending to individual socketid (private message)
  //  io.to(socketId).emit("hey", "I just met you");

  socket.on(RANKED, (data) => {
    if (data.socketId && data.userId && data.elo){
      ranked.push(data);
      console.log(ranked);
      if (ranked.length > 1){
        const sortedRanked = sortUsers(ranked);
        const first = sortedRanked.pop();
        const second = sortedRanked.pop(); // [{user} , {opp} ]  [ {opp} ]
        ranked.pop();
        ranked.pop();
        // send a msg back to users  "match found"
        io.to(first.socketId).emit(RANKED, {opponentId: second.userId});
        io.to(second.socketId).emit(RANKED, {opponentId: first.userId});
      }
    }
  });

  socket.on(DEQUEUE, (data) => {
    if (data.socketId && data.userId && data.elo){
      if (data.type === RANKED) {
        console.log('data', data);
        dequeue(ranked, data.userId);
      } else if (data.type === CASUAL) {
        dequeue(casual, data.userId);
      }
      console.log("ranked :", ranked);
      // console.log();
    }
  });
  
  // const pairs = [ { socket1 : null, socket2 : null } ] 
  // when we receive socket1 if true - > change socket1 : true and check if socket2 is null if null keep listening
  // if socket2 not null and is true delete this pair and create match

  // Listen for rank-mode user to accept
  // client side query
  // socketRef.current.emit(RANKED_ACCEPT, {
  //   socketId: socketRef.current.id,
  // });
  socket.on(RANKED_ACCEPT, (data) => {
    confirmation.push(data)
    if (confirmation.length === 2){
      console.log(confirmation);
      const user1 = confirmation.pop();
      const user2 = confirmation.pop();
      if (user1.confirmation && user2.confirmation && user1.userId && user2.userId && user1.userId !== user2.userId){
        console.log(user1, user2);
        // create a match in db
        addMatch("ranked", user1.userId, user2.userId).then((matchId) => {
          // send the matchid back to clients
          io.to(user1.socketId).emit(RANKED_ACCEPT, { matchId });
          io.to(user2.socketId).emit(RANKED_ACCEPT, { matchId });
        })
      } else {
        io.in(roomId).emit(RANKED_ACCEPT, { matchId: null }); // does not match up
      }
    }
  });

  // Listen for new move and send it to your opponent
  socket.on(NEW_CHESS_MOVE_EVENT, (data) => {
    console.log('receive a move!', data)
    socket.to(roomId).emit(NEW_CHESS_MOVE_EVENT, data);
    // io.in(roomId).emit(NEW_CHESS_MOVE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
