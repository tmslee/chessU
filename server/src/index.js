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

const ENQUEUE = "ENQUEUE";
const MATCH_CONFIRM = "MATCH_CONFIRM";
const DEQUEUE = "DEQUEUE";
const RANKED = "RANKED";
const CASUAL = "CASUAL";

const confirmation = [];

const rankedQ = [];
const casualQ = [];
const matches = {};
const matchConfirmStatus = {};
const userSockets = {};

const dequeue = function(Q, userId) {
  Q.forEach( (user, idx) => {
    if(user.userId === userId) {
      Q.splice(idx, 1);
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

  socket.on(ENQUEUE, (data) => {
    if (data.socketId && data.userId && data.elo){
      let queue;
      if (data.type === RANKED) queue = rankedQ;
      else if (data.type === CASUAL) queue = casualQ;

      queue.push(data);
      console.log("queue: " , queue);

      if (queue.length > 1){
        const sortedQueue = sortUsers(queue);
        const first = sortedQueue.pop();
        const second = sortedQueue.pop(); // [{user} , {opp} ]  [ {opp} ]

        dequeue(queue, first.userId);
        dequeue(queue, second.userId);
        // send a msg back to users  "match found"
        io.to(first.socketId).emit(ENQUEUE, {opponentId: second.userId});
        io.to(second.socketId).emit(ENQUEUE, {opponentId: first.userId});
        
        matches[first.userId] = second.userId;
        matches[second.userId] = first.userId;
        matchConfirmStatus[first.userId] = 0;
        matchConfirmStatus[second.userId] = 0;
        userSockets[first.userId] = first.socketId;
        userSockets[second.userId] = second.socketId;
        console.log("matches: ", matches);
        console.log("confirm status: ", matchConfirmStatus);
        console.log("userSockets: ", userSockets);
      }
    }
  });

  socket.on(DEQUEUE, (data) => {
    if (data.socketId && data.userId && data.elo){
      let queue;
      if (data.type === RANKED) queue = rankedQ;
      else if (data.type === CASUAL) queue = casualQ;
      dequeue(queue, data.userId)
      console.log("queue :", queue);
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
  
  const removeFromMatches = function (matches, userId) {
    const userId2 = matches[userId];
    if(userId2) {
      delete matches[userId];
    }
    if(matches[userId2]) {
      delete matches[userId2];
    }
    console.log("matches: ", matches);
  }

  socket.on(MATCH_CONFIRM, (data) => {
    userSockets[data.userId] = data.socketId; 
    const {userId, type, socketId, confirmation} = data;
    const opponent = matches[userId];
    const opponentStatus = matchConfirmStatus[opponent];

    if (confirmation === -1) { //you have declined
      console.log("you have declined. opponent socket: ", userSockets[opponent]);
      if(opponentStatus !== 0) {
        removeFromMatches(matches, userId);
        io.to(userSockets[userId]).emit(MATCH_CONFIRM, { matchId:null });
        io.to(userSockets[opponent]).emit(MATCH_CONFIRM, { matchId:null });
      } else {
        io.to(userSockets[userId]).emit(MATCH_CONFIRM, { matchId:null });
        matchConfirmStatus[userId] = -1;
      }

    } else if (confirmation === 1) {
      console.log("you have accepted");
      if(opponentStatus === -1) { //opponent declined
        removeFromMatches(matches, userId);
        io.to(userSockets[userId]).emit(MATCH_CONFIRM, { matchId:null });
        io.to(userSockets[opponent]).emit(MATCH_CONFIRM, { matchId:null });
      } else if (opponentStatus === 1) { //opponent accepted{
          removeFromMatches(matches, userId);
          console.log('making match');
          addMatch(type, userId, opponent).then(matchId => {
            io.to(userSockets[data.userId]).emit(MATCH_CONFIRM, { matchId });
            io.to(userSockets[opponent]).emit(MATCH_CONFIRM, { matchId });
          });
      } else { //opponent pending -> just update matchConfirmStatus
        matchConfirmStatus[userId] = 1;
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
