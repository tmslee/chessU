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

const LOGIN = "LOGIN";
const SOCKET_INIT ="SOCKET_INIT";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const NEW_CHESS_MOVE_EVENT = "newChessMove";

const ENQUEUE = "ENQUEUE";
const MATCH_CONFIRM = "MATCH_CONFIRM";
const DEQUEUE = "DEQUEUE";
const RANKED = "RANKED"
const CASUAL = "CASUAL";

const RESIGN ="RESIGN";
const GET_OPPONENT_STATUS = "GET_OPPONENT_STATUS"
const OPPONENT_STATUS = "OPPONENT_STATUS"
const GAME_INVITE = "GAME_INVITE";

const confirmation = [];

// const rankedQ = [];
const rankedQ10 = [];
const rankedQ30 = [];
const casualQ = [];
const casualQ10 = [];
const casualQ30 = [];

const userIdInQueue = [];

const matches = {};
const matchConfirmStatus = {};
const userSockets = {};

const dequeue = function(Q, id) {
  if(Q !== undefined && Q.length > 0){
    Q.forEach( (data, idx) => {
      if(data.currentUser.id === id) {
        Q.splice(idx, 1);
      }
    })
    
    userIdInQueue.forEach((qId, idx) => {
      if(qId === id) {
        userIdInQueue.splice(idx, 1);
      }
    })
  }
};

const inqueue = function (opponent) {
  return userIdInQueue.includes(opponent.id);
};

const inPendingMatch = function (opponent) {
  return Object.keys(matches).includes(opponent.id);
};

const initializeMatchConfirm = function (firstUser, secondUser, firstSocket, secondSocket) {
  matches[firstUser.id] = secondUser.id;
  matches[secondUser.id] = firstUser.id;
  matchConfirmStatus[firstUser.id] = 0;
  matchConfirmStatus[secondUser.id] = 0;
  userSockets[firstUser.id] = firstSocket;
  userSockets[secondUser.id] = secondSocket;
}

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on(LOGIN, (data) => {
    const {currentUser, socketId} = data;
    userSockets[currentUser.id] = socketId;
    console.log(`socket id for ${currentUser.username}: ${socketId}`);

  });

  // Listen for new messages and send it to everyone in the room
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Listen for resign info
  socket.on(RESIGN, (data) => {
    io.in(roomId).emit(RESIGN, data);
  });
  
  // Listen for new user who queues up
  // data = {userId, elo, socketId}

  // sending to individual socketid (private message)
  //  io.to(socketId).emit("hey", "I just met you");

  socket.on(ENQUEUE, (data) => {
    if (data.socketId && data.currentUser){
      let queue;
      if (data.type === RANKED) {
        if (data.timeLimit === 10){
          queue = rankedQ10;
        } else if (data.timeLimit === 30){
          queue = rankedQ30;
        // } else {
        //   queue = rankedQ;
        }
      }
      else if (data.type === CASUAL) {
        if (data.timeLimit === 10){
          queue = casualQ10;
        } else if (data.timeLimit === 30){
          queue = casualQ30;
        } else {
          queue = casualQ;
        }
      }

      queue.push(data);
      userIdInQueue.push(data.currentUser.id);

      console.log("queue: " , queue);
      if (queue.length > 1){
        const matchups = sortUsers(queue, data.type, data.timeLimit);
        console.log(matchups, "MATCHUPS")
        while (matchups.length !== 0) {
          const match = matchups.pop();
          const first = match[0];
          const second = match[1];
          const firstUser = first.currentUser;
          const secondUser = second.currentUser;
          const matchType = first.type;
          dequeue(queue, firstUser.id);
          dequeue(queue, secondUser.id);
          io.to(first.socketId).emit(ENQUEUE, {opponent: secondUser, matchType});
          io.to(second.socketId).emit(ENQUEUE, {opponent: firstUser, matchType});
          initializeMatchConfirm(firstUser, secondUser, first.socketId, second.socketId);
        }
      }
    }
  });

  socket.on(DEQUEUE, (data) => {
    if (data.socketId && data.currentUser){
      let queue;
      if (data.type === RANKED){
        if (data.timeLimit === 10){
          queue = rankedQ10;
        } else if (data.timeLimit === 30){
          queue = rankedQ30;
        } 
      }
      else if (data.type === CASUAL) {
        if (data.timeLimit === 10){
          queue = casualQ10;
        } else if (data.timeLimit === 30){
          queue = casualQ30;
        } 
        else {
          queue = casualQ;
        }
      };
      dequeue(queue, data.currentUser.id)
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
  }
  
  socket.on(MATCH_CONFIRM, (data) => {
    const {currentUser, type, socketId, confirmation, timeLimit} = data;
    const userId = currentUser.id;

    userSockets[userId] = socketId; 
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
          console.log(`making match for: `);
          console.log(currentUser);
          console.log(opponent);
          // const white = userId;
          // const black = opponent;
          const colors = { white : userId, black : opponent };
          addMatch(type, colors.white, colors.black).then(match => {
            io.to(userSockets[userId]).emit(MATCH_CONFIRM, { matchId: match.id, colors, timeLimit, type });
            io.to(userSockets[opponent]).emit(MATCH_CONFIRM, { matchId: match.id, colors, timeLimit, type });
          });
      } else { //opponent pending -> just update matchConfirmStatus
        matchConfirmStatus[userId] = 1;
      }
    }    
  });

  ////////////////////////////////// opponent status for inviting ////////////////////////////////////

  socket.on(SOCKET_INIT, data => {
    userSockets[data.userId] = data.socketId;
    console.log(`listener socket id for :${data.name}` , data.socketId);
  })

  socket.on(GET_OPPONENT_STATUS, data => {
    console.log('getting opponent status');
    const {currentUser, opponent, socketId, gameOptions} = data;
    const opponentSocket = userSockets[opponent.id];

    console.log("socketId: ", opponentSocket);
    console.log("inqueue? ", inqueue(opponent));
    console.log("in pending match? " , inPendingMatch(opponent));
    if(opponentSocket && !inqueue(opponent) && !inPendingMatch(opponent)) {
      initializeMatchConfirm(currentUser, opponent, socketId, opponentSocket);
      //beacuse by sending this invite you have already accepted. only need opponent to confirm to go into match
      matchConfirmStatus[currentUser.id] = 1; 

      io.to(socketId).emit(OPPONENT_STATUS, {status: true});
      io.to(opponentSocket).emit(GAME_INVITE, {gameOptions});
      console.log("invite sending out to: ", opponentSocket);
      // console.log(Object.keys(io.of('/').connected));
    } else {
      io.to(socketId).emit(OPPONENT_STATUS, {status: false});
    }
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////


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
