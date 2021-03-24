DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS action_logs CASCADE;
DROP TABLE IF EXISTS chat_logs CASCADE;
DROP TABLE IF EXISTS friends CASCADE;

-- CREATE EXTENSION IF NOT EXISTS citext;   


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username varchar(255) NOT NULL CHECK (username <> ''),
  email varchar(255) NOT NULL CHECK (email <> ''),
  password varchar(255) NOT NULL CHECK (password <> ''),
  profile_img TEXT DEFAULT 'https://www.w3schools.com/w3images/avatar2.png',
  ranked30 int DEFAULT 1500,
  ranked10 int DEFAULT 1500,
  casual int DEFAULT 1500,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT UC_users UNIQUE (username)
);

CREATE UNIQUE INDEX username_unique_idx on users (LOWER(username)); 

CREATE TABLE "matches" (
  id SERIAL PRIMARY KEY NOT NULL,
  type varchar(255) NOT NULL,
  user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  winner INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL,
  loser INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL,
  white INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL,
  black INTEGER REFERENCES users(id) ON DELETE CASCADE DEFAULT NULL,
  start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP
);

CREATE TABLE "chat_logs" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message varchar(255) NOT NULL
);

CREATE TABLE "action_logs" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  action varchar(1000)
);

CREATE TABLE "friends" (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user2_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
