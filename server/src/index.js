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

const ranked = [];

// const casual = [{ 
//   userId,  
//   elo,  
// }]

// push user data into queue
// sort object by elo
// we check if ranked >= 2
//   pop first 2 users and match them

//what happens if 5 ppl press queue same time -- edge case


// there are two guys ready to play, A and B
// send A with B's userId and A's socket Id
// send B with A's userId and B's socket Id

//const EMPTY_GAME = {
//   type:null,
//   timeLimit:null,
//   difficulty:null,
//   currentUserID: 2,
//   opponentID:null
// };

// const matchesFound = [{
//   user1 : false,
//   user2 : false}
// }]

// const PORT = 8002;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_CHESS_MOVE_EVENT = "newChessMove";
const RANKED = "ranked";
const RANKED_ACCEPT = "ranked_accept";

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
    ranked.push(data);
    console.log(ranked);
    if (ranked.length > 1){
      const sortedRanked = sortUsers(ranked);
      const first = sortedRanked.pop();
      const second = sortedRanked.pop(); // [{user} , {opp} ]  [ {opp} ]  
      // send a msg back to users  "match found"
      io.to(first.socketId).emit(RANKED, {opponentId: second.userId});
      io.to(second.socketId).emit(RANKED, {opponentId: first.userId});
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
  const confirmation = [];
  socket.on(RANKED_ACCEPT, (data) => {
    confirmation.push(data)
    if (confirmation.length === 2){
      const user1 = confirmation[0];
      const user2 = confirmation[1];
      if (user1.confirmation && user2.confirmation){
        // create a match in db
        addMatch("ranked", user1, user2).then((matchId) => {
          // send the matchid back to clients
          io.to(user1.socketId).emit(RANKED_ACCEPT, { matchId });
          io.to(user2.socketId).emit(RANKED_ACCEPT, { matchId });
        })
      } else {
        io.in(roomId).emit(RANKED_ACCEPT, {}); // does not match up
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
