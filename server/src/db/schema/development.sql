INSERT INTO users (username, email, password, ranked30, ranked10, casual) VALUES (
  'alvin', 'alvin@gmail.com', 'password', 1800, 1200, 1700
);
INSERT INTO users (username, email, password, ranked30, ranked10, casual) VALUES (
  'thomas', 'thomas@gmail.com', 'password', 900, 1200, 1800
);
INSERT INTO users (username, email, password, ranked30, ranked10, casual) VALUES (
  'haopeng', 'haopeng@gmail.com', 'password', 1400, 1200, 900
);
INSERT INTO users (username, email, password, ranked30, ranked10, casual) VALUES (
  'user4', 'user4@gmail.com', 'password', 1500, 1600, 1700
);
INSERT INTO users (username, email, password, ranked30, ranked10, casual) VALUES (
  'user5', 'user5@gmail.com', 'password', 3000, 3100, 3200
);
INSERT INTO users (username, email, password, ranked30, ranked10, casual) VALUES (
  'user6', 'user6@gmail.com', 'password', 50, 20, 15
);

-- casual/ranked/ai

-- matches
INSERT INTO matches (type, user1_id, user2_id, winner, loser, white, black, start_time, end_time) VALUES (
  'CASUAL', 1, 2, 1, 2, 1, 2, '2000-11-13 12:12:12', '2000-11-13 12:12:13'
);
INSERT INTO matches (type, user1_id, user2_id, winner, loser, white, black, start_time, end_time) VALUES (
  'AI', 1, null, 1, null, 1, null, '2000-11-13 12:12:12', '2000-11-13 12:13:12'
);
INSERT INTO matches (type, user1_id, user2_id, winner, loser, white, black, start_time, end_time) VALUES (
  'RANKED', 3, 2, 2, 3, 2, 3, '2000-11-13 11:12:12', '2000-11-13 12:12:12'
);
INSERT INTO matches (type, user1_id, user2_id, winner, loser, white, black, start_time, end_time) VALUES (
  'CASUAL', 1, 3, 1, 3, 3, 1, '2000-11-13 10:12:12', '2000-11-13 12:12:12'
);

-- chat logs
-- YYYY-MM-DD HH:MI:SS
INSERT INTO chat_logs (user_id, match_id, created_at, message) VALUES (
  1, 1, '2000-11-13 12:12:12', 'hi'
);
INSERT INTO chat_logs (user_id, match_id, created_at, message) VALUES (
  2, 1, '2000-11-13 12:25:13', 'bye'
);
INSERT INTO chat_logs (user_id, match_id, created_at, message) VALUES (
  3, 2, '2001-11-13 11:25:13', 'ur good!' 
);
INSERT INTO chat_logs (user_id, match_id, created_at, message) VALUES (
  2, 2, '2001-11-13 11:31:12', 'ur bad!'
);
INSERT INTO chat_logs (user_id, match_id, created_at, message) VALUES (
  3, 3, '2001-11-13 12:25:13', 'gg ez'
);
INSERT INTO chat_logs (user_id, match_id, created_at, message) VALUES (
  2, 3, '2001-11-13 12:45:20', 'stfu'
);


-- action logs
-- '{"piece" : "pawn", "from" : "a2", "to" : "a4"}'
INSERT INTO action_logs (user_id, match_id, created_at, action) VALUES (
  1, 1, '2001-11-13 12:45:20', '{"piece" : "pawn", "from" : "a2", "to" : "a4"}' 
);
INSERT INTO action_logs (user_id, match_id, created_at, action) VALUES (
  2, 1, '2001-11-13 12:46:20', '{"piece" : "pawn", "from" : "a7", "to" : "a5"}'
);

INSERT INTO action_logs (user_id, match_id, created_at, action) VALUES (
  1, 2, '2001-11-13 12:45:20', '{"piece" : "knight", "from" : "b1, "to" : "a3"}' 
);
INSERT INTO action_logs (user_id, match_id, created_at, action) VALUES (
  null, 2, '2001-11-13 12:45:21', '{"piece" : "knight", "from" : "b8, "to" : "a6"}' 
);

INSERT INTO action_logs (user_id, match_id, created_at, action) VALUES (
  3, 3, '2001-11-13 12:45:20', '{"piece" : "knight", "from" : "b1, "to" : "a3"}' 
);
INSERT INTO action_logs (user_id, match_id, created_at, action) VALUES (
  2, 3, '2001-11-13 12:46:00', '{"piece" : "knight", "from" : "b1, "to" : "a3"}' 
);

-- friends 
INSERT INTO friends (user1_id, user2_id, created_at) VALUES (
  1, 2, '2001-11-13 12:46:20'
);
INSERT INTO friends (user1_id, user2_id, created_at) VALUES (
  2, 1, '2001-11-13 12:46:20'
);
INSERT INTO friends (user1_id, user2_id, created_at) VALUES (
  3, 2, '2001-11-13 12:46:20'
);
INSERT INTO friends (user1_id, user2_id, created_at) VALUES (
  2, 3, '2001-11-13 12:46:20'
);
INSERT INTO friends (user1_id, user2_id, created_at) VALUES (
  1, 3, '2001-11-13 12:46:20'
);
INSERT INTO friends (user1_id, user2_id, created_at) VALUES (
  3, 1, '2001-11-13 12:46:20'
);

