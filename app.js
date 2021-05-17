const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
var userID;

app.set("view engine", "ejs");
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(socket.handshake.time);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    var room = io.sockets.adapter.rooms[`${roomId}`];
    userID = socket.conn.id;

    io.to(roomId).emit("user-connected", {
      sockets: room.sockets,
      userID,
    });

    socket.on("get_userNames", (data) => {
      io.to(roomId).emit("get_userNames", data);
    });

    socket.on("chat", (data) => {
      io.to(roomId).emit("chat", data);
    });

    socket.on("typing", (data) => {
      socket.to(roomId).broadcast.emit("typing", data);
    });

    socket.on("typing_name", (data) => {
      io.to(roomId).emit("typing_name", data);
    });

    socket.on("disconnecting", () => {
      userID = socket.conn.id;
      socket.to(roomId).broadcast.emit("leaved", userID);
    });
  });
});

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:index", (req, res) => {
  res.render("index", { roomId: req.params.index });
});

server.listen(1000, "localhost", () => {
  console.log("localhost:1000");
});
