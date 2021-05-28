const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

const portNum = process.env.PORT || "1000";
const offline = false;
var alter_ip = "localhost"; //192.168.1.4
var userID;

app.set("view engine", "ejs");
app.use(express.static("public"));

io.on("connection", (socket) => {
  //---------------------------------

  //---------------------------------

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

    socket.on("send_audio", (data) => {
      io.to(roomId).emit("send_audio", data);
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

    //-------------------------------------
    socket.on("image", ({ image, type, u_id, user_pic_Name, fileName }) => {
      io.to(roomId).emit("getImage", {
        image: image.toString("binary"),
        type,
        u_id,
        user_pic_Name,
      });
    });

    //clicked_send_img
    socket.on("clicked_send_img", (data) => {
      socket.to(roomId).broadcast.emit("clicked_send_img", data);
    });

    //clicked_send_audio
    socket.on("clicked_send_audio", (data) => {
      socket.to(roomId).broadcast.emit("clicked_send_audio", data);
    });

    //-------------------------------------
    //sendMeChattings
    socket.on("sendMeChattings", (data) => {
      io.to(roomId).emit("sendMeChattings", data);
    });

    //okSendingChattings
    socket.on("okSendingChattings", (data) => {
      io.to(roomId).emit("okSendingChattings", data);
    });

    //getRealDatabase
    socket.on("getRealDatabase", (data) => {
      socket.to(roomId).broadcast.emit("getRealDatabase", data);
    });

    //okgettingRealDatabase
    socket.on("okgettingRealDatabase", (data) => {
      socket.to(roomId).broadcast.emit("okgettingRealDatabase", data);
    });
  });
});

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:index", (req, res) => {
  res.render("index", { roomId: req.params.index });
});

//

if (offline) {
  server.listen(portNum, alter_ip, () => {
    console.log(`${alter_ip}:${portNum}`);
  });
} else {
  server.listen(portNum, () => {
    console.log(`localhost:${portNum}`);
  });
}
