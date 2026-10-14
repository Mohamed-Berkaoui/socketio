const express = require("express");
const connectToDb = require("./utils/connecttodb");
const messageModel = require("./models/message.model");
const SuccessRes = require("./views/Success");
const ErrorRes = require("./views/Error");
const FailRes = require("./views/Fail");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on('connection',(socket)=>{
  console.log("socket connected",socket.id)
})

app.use(express.json());
app.use(cors());

app.get("/api/messages", async function (req, res) {
  try {
    const messages = await messageModel.find();
io.emit()
    res.json(new SuccessRes(messages));
  } catch (error) {
    res.status(500).json(new ErrorRes(error));
  }
});

app.post("/api/messages", async function (req, res) {
  try {
    const { message, user } = req.body;
    if (!message || !user) {
      return res.json(new FailRes("user and message are required"));
    }
    const newMessage = await messageModel.insertOne({ message, user });
    res.json(new SuccessRes(newMessage));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorRes(error));
  }
});

httpServer.listen(3000, function () {
  connectToDb();
  console.log("server running on port 3000");
});
