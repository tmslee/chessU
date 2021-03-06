const fs = require("fs");
const path = require("path");

const cookieSession = require('cookie-session');
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

const db = require("./db");

// const days = require("./routes/days");
// const appointments = require("./routes/appointments");
// const interviewers = require("./routes/interviewers");

const users = require("./routes/users");
const action = require("./routes/actions");
const matches = require("./routes/matches");
const chatLogs = require("./routes/chatLogs");
const stats = require("./routes/stats");
const leaderboards = require("./routes/leaderboards");
const community = require("./routes/community");

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(
  ENV,
  // actions = { updateAppointment: () => {} }
) {
  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  }));
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  // app.use("/api", days(db));
  // app.use("/api", appointments(db, actions.updateAppointment));
  // app.use("/api", interviewers(db));
  app.use("/api", users(db));
  app.use("/api", action(db));
  app.use("/api", matches(db));
  app.use("/api", chatLogs(db));
  app.use("/api", stats(db));
  app.use("/api", leaderboards(db));
  app.use("/api", community(db));
  
  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function() {
    return db.end();
  };

  return app;
};