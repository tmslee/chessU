DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS action_logs CASCADE;
DROP TABLE IF EXISTS chat_logs CASCADE;
DROP TABLE IF EXISTS queues CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username varchar(255) NOT NULL CHECK (username <> ''),
  email varchar(255) NOT NULL CHECK (email <> ''),
  password varchar(255) NOT NULL CHECK (password <> ''),
  profile_img TEXT DEFAULT NULL,
  elo int DEFAULT 1500,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT UC_users UNIQUE (username)
);

CREATE TABLE "matches" (
  id SERIAL PRIMARY KEY NOT NULL,
  type varchar(255) NOT NULL,
  user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  winner INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL,
  loser INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL
);

CREATE TABLE "chat_logs" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message varchar(255) NOT NULL
);

CREATE TABLE "action_logs" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  action varchar(1000)
);


CREATE TABLE "queues" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  username varchar(255),
  elo INT DEFAULT 1500,
  game_type varChar(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);