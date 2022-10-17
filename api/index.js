const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");
const conversationRoute = require("./routes/conversation.route");
const User = require("./models/user.model");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credential: true,
  },
});

onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    try {
      const senderSocket = onlineUsers.get(data.sender);
      let recieverId = await User.find({ username: data.receiver });
      recieverId = JSON.stringify(recieverId[0]._id);
      recieverId = recieverId.substring(1, recieverId.length - 1);
      const recieverSocket = onlineUsers.get(recieverId);
      // if (recieverSocket) {
      //   socket.to(recieverSocket).emit("msg-recieve", data.msg);
      // }
      // if (senderSocket) {
      //   socket.to(senderSocket).emit("msg-recieve");
      // }
      socket.emit("msg-recieve");
    } catch (err) {
      console.log(err);
    }
  });
});
