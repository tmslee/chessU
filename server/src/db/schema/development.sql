INSERT INTO users (username, email, password) VALUES (
  'alvin', 'alvin@gmail.com', 'password'
);
INSERT INTO users (username, email, password) VALUES (
  'thomas', 'thomas@gmail.com', 'password'
);
INSERT INTO users (username, email, password) VALUES (
  'haopeng', 'haopeng@gmail.com', 'password'
);

-- casual/ranked/ai

-- matches
INSERT INTO matches (type, user1_id, user2_id, winner, loser) VALUES (
  'casual', 1, 2, 1, 2
);
INSERT INTO matches (type, user1_id, user2_id, winner, loser) VALUES (
  'ai', 1, null, 1, null
);
INSERT INTO matches (type, user1_id, user2_id, winner, loser) VALUES (
  'ranked', 3, 2, 2, 3
);
INSERT INTO matches (type, user1_id, user2_id, winner, loser) VALUES (
  'casual', 1, 3, 1, 3
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

