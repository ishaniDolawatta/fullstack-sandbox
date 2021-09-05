const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3001;

// set up express app
const app = express();
app.use(cors());

// connect to mongodb
const url = `mongodb+srv://sellpy_user:123@sellpy.aod8g.mongodb.net/todos?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//READ Request Handlers
app.get("/", (req, res) => {
  res.send("Welcome to Sellpy todo application!");
});

//support to serve static files
app.use(express.static("public"));

//parse the data sent or received from the database
app.use(express.json());

// initialize routes
app.use("/api", require("./routes/api"));

// error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || PORT, function () {
  console.log("Ready to Go!");
});
