const express = require("express");
const passport = require("passport");
const users = require("./routes/users");
const port = process.env.PORT || 5000;
const app = express();
const path = require("path");

app.use(express.json());

// comment below require line if you dont want to use MongoDB Database
require("./mongodb/database/mongodb_connection");

// uncomment below require line if you want to use Mysql Database
// require("./mysql/database/mysqldb_connection").connection();
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api", users);

// production configuration
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.senFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
