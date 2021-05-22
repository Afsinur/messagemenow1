const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const fs = require("fs");

const portNum = process.env.PORT || "1000";
const offline = true;
var alter_ip = "192.168.1.4";
var userID;

app.set("view engine", "ejs");
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(socket.handshake.time);

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
      console.log(fileName + " recieved!!");

      var rendomFileName = `${uuidV4()}${fileName}`;
      console.log(rendomFileName + " renamed!!");

      var writeStream = fs.createWriteStream(
        __dirname + "/public/writes/" + rendomFileName + ".txt"
      );

      writeStream.write(image, () => {
        var ReadStream = fs.createReadStream(
          __dirname + "/public/writes/" + rendomFileName + ".txt"
        );

        var chunks = [];
        ReadStream.on("data", (cnk) => {
          chunks.push(cnk);

          io.to(roomId).emit("getImage", {
            image: cnk.toString("binary"),
          });
        });

        ReadStream.on("end", () => {
          io.to(roomId).emit("getImage1", {
            cnkFromServer1: chunks.length,
            type,
            u_id,
            user_pic_Name,
          });
          //chunks

          if (
            fs.existsSync(
              __dirname + "/public/writes/" + rendomFileName + ".txt"
            )
          ) {
            fs.unlink(
              __dirname + "/public/writes/" + rendomFileName + ".txt",
              (err) => {
                if (err) throw err;
                console.log(`${rendomFileName}.txt deleted!`);
              }
            );
          }
        });
      });
      //--------------------------------------
      /*io.to(roomId).emit("image", {
        image: image.toString("binary"),
        type,
        u_id,
        user_pic_Name,
      });*/
    });

    //clicked_send_img
    socket.on("clicked_send_img", (data) => {
      socket.to(roomId).broadcast.emit("clicked_send_img", data);
    });

    //-------------------------------------
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
