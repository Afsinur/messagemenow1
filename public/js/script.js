const socket = io("/");

var userID1;
var count_userID1 = 0;
var activeIds = [];
var active_name_with_id = [];
var showNames_and_ids = [];

//---------------------------

const app = {
  data() {
    return {
      showCurrentUsers: [],
      user_name: "",
      mess_ages: "",
      side_Open: false,
    };
  },

  methods: {
    send_click(e, e1) {
      var io_id = userID1;
      var nameValue = e || io_id,
        messageValue = e1;

      socket.emit("chat", {
        nameValue,
        messageValue,
        io_id,
      });

      this.mess_ages = "";
    },

    vueKeyup(e1) {
      var e = document.getElementById("message");
      var nameValueBroadcast = e1 || userID1;

      if (e.value != "") {
        socket.emit("typing", nameValueBroadcast);
      } else {
        socket.emit("typing", null);
      }
    },

    vueKeyup1() {
      var e = document.getElementById("name").value;

      var nameValueBroadcast_1 = {
        userName: e,
        userID1,
      };
      var nameValueBroadcast_2 = {
        userName: null,
        userID1,
      };

      if (e != "") {
        socket.emit("typing_name", nameValueBroadcast_1);
      } else {
        socket.emit("typing_name", nameValueBroadcast_2);
      }
    },

    copyToClipboard() {
      var inputc = document.body.appendChild(document.createElement("input"));
      inputc.value = window.location.href;
      inputc.focus();
      inputc.select();
      document.execCommand("copy");
      inputc.parentNode.removeChild(inputc);
      alert("URL Copied.");
    },

    active_side(e) {
      var side_bar_javascript = document.getElementById("side_bar");

      if (e == false) {
        this.side_Open = true;
        side_bar_javascript.style.transform = "none";
      } else {
        this.side_Open = false;
        side_bar_javascript.style.transform = "translate(-100%)";
      }
    },

    playSound(url) {
      const audio = new Audio(url);
      audio.play();
    },

    clicked_on_send_image_vue() {
      if (document.getElementById("file").value == "") {
        document.getElementById("file").click();
      } else {
        alert("Please wait, image not sent yet!");
      }
    },
  },

  mounted() {
    //DOM
    var messages = document.getElementById("messages"),
      typing = document.getElementById("typing"),
      chatContainer = document.getElementById("chatContainer");

    var showNames_and_ids = [];
    var active_name_with_id = [];
    var activeIds = [];
    var data_with_null = null;

    var matchDataName = [];
    var _direction = "down";
    var _top = chatContainer.scrollTop;
    //---------------------------------

    const scroll_and_sound = () => {
      if (_direction == "down") {
        typing.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }

      if (document.hidden == true) {
        this.playSound("sounds/message_beep.mp3");
      }
    };

    //---------------------------------

    //send pictures
    document.getElementById("file").addEventListener(
      "change",
      function () {
        document.querySelector(".image_snd_btn").classList.add("image_send_d1");

        var this_user_for_image_Name =
          document.querySelector("#inputDiv #name");

        if (
          this.files[0].type == "image/jpeg" ||
          this.files[0].type == "image/png" ||
          this.files[0].type == "image/jpg"
        ) {
          socket.emit("image", {
            image: this.files[0],
            type: this.files[0].type,
            u_id: userID1,
            user_pic_Name: this_user_for_image_Name.value,
          });
        } else {
          alert("Please insert a png or jpeg file!");
        }
      },
      false
    );

    // Client side
    socket.on("image", ({ image, type, u_id, user_pic_Name }) => {
      // create image with
      if (type == "image/jpeg" || type == "image/png" || type == "image/jpg") {
        const img = new Image();

        // change image type to whatever you use, or detect it in the backend
        // and send it if you support multiple extensions
        img.src = `data:image/jpg;base64,${image}`;

        // Insert it into the DOM
        var imgE1 = document.createElement("img");
        imgE1.style = "width: 100%;";
        imgE1.src = img.src;

        var messages_N = document.querySelector("#messages");

        if (u_id == userID1) {
          var n_div1 = document.createElement("div");
          n_div1.id = "me_Dv";
          var n_div2 = document.createElement("div");
          n_div2.id = "extra_div_style_for_image";

          n_div2.appendChild(imgE1);

          n_div1.appendChild(n_div2);

          messages_N.appendChild(n_div1);

          document.getElementById("file").value = "";

          document
            .querySelector(".image_snd_btn")
            .classList.remove("image_send_d1");
        } else {
          //<div id="notme_Dv"><span>${nameValue}</span> <div><pre>${messageValue}</pre></div></div>`;
          var n_div3 = document.createElement("div");
          n_div3.id = "notme_Dv";
          var spn_1 = document.createElement("span");
          var ckeck_var = user_pic_Name || u_id;

          var txtNode = document.createTextNode(ckeck_var);

          spn_1.appendChild(txtNode);

          n_div3.appendChild(spn_1);

          var n_div4 = document.createElement("div");
          n_div4.id = "extra_div_style_for_image";

          n_div4.appendChild(imgE1);

          n_div3.appendChild(n_div4);

          messages_N.appendChild(n_div3);
        }

        setTimeout(() => {
          scroll_and_sound();
        }, 100);
      } else {
        console.log("Please insert a png or jpeg file!");
      }
    });

    //---------------------------------
    //scroll function
    chatContainer.addEventListener("scroll", () => {
      var _cur_top = chatContainer.scrollTop;

      if (_top < _cur_top) {
        _direction = "down";
      } else {
        _direction = "up";
      }
      _top = _cur_top;
    });

    //click to close
    window.addEventListener("mouseup", (e) => {
      var side_bar_javascript = document.getElementById("side_bar");
      var header1 = document.getElementById("header1");
      var current_users1 = document.getElementById("current_users1");
      var current_users1_ul = document.getElementById("current_users1_ul");

      if (
        e.target != side_bar_javascript &&
        e.target.parentNode != side_bar_javascript &&
        e.target.parentNode != header1 &&
        e.target.parentNode != current_users1 &&
        e.target.parentNode != current_users1_ul
      ) {
        this.side_Open = false;
        side_bar_javascript.style.transform = "translate(-100%)";
      }
    });
    //listen for socket
    //---------------------------------
    socket.emit("join-room", ROOM_ID);

    socket.on("user-connected", ({ sockets, userID }) => {
      for (const key in sockets) {
        if (Object.hasOwnProperty.call(sockets, key)) {
          if (!activeIds.includes(key)) {
            activeIds.push(key);
          }
        }
      }

      active_name_with_id = [];

      activeIds.forEach((ac_id_w_nm, i) => {
        var name_in_Ar = {
          name: null,
          id: ac_id_w_nm,
        };

        active_name_with_id.push(name_in_Ar);

        if (i + 1 == activeIds.length) {
          var tmp_array_start = [];

          if (showNames_and_ids.length > 0) {
            var tmp_array_start_1 = [];

            active_name_with_id.forEach((item, i) => {
              showNames_and_ids.forEach((it, i) => {
                if (it.id == item.id) {
                  tmp_array_start_1.push(it.id);
                }
              });

              if (i + 1 == active_name_with_id.length) {
                var tmp_array_start_12 = [];

                active_name_with_id.forEach((it, i) => {
                  if (tmp_array_start_1.includes(it.id)) {
                    var very_sml = it.id;

                    showNames_and_ids.forEach((it, i) => {
                      if (it.id == very_sml) {
                        tmp_array_start_12.push({
                          showName: it.showName,
                          id: it.id,
                        });
                      }
                    });
                  } else {
                    tmp_array_start_12.push({ showName: it.id, id: it.id });
                  }

                  if (i + 1 == active_name_with_id.length) {
                    this.showCurrentUsers = tmp_array_start_12;
                  }
                });
              }
            });
          } else {
            active_name_with_id.forEach((item, i) => {
              if (item.name == null) {
                tmp_array_start.push({ showName: item.id, id: item.id });
              } else {
                tmp_array_start.push({ showName: item.name, id: item.id });
              }

              if (i + 1 == active_name_with_id.length) {
                this.showCurrentUsers = tmp_array_start;
              }
            });
          }
        }
      });

      if (count_userID1 < 1) {
        count_userID1++;
        userID1 = userID;
      }

      if (showNames_and_ids.length <= 0) {
        var name_in_Ar_21 = {
          showName: userID1,
          id: userID1,
        };

        socket.emit("get_userNames", {
          curr_usr: showNames_and_ids,
          extra: name_in_Ar_21,
        });
      } else {
        socket.emit("get_userNames", {
          curr_usr: this.showCurrentUsers,
          extra: null,
        });
      }
    });

    socket.on("leaved", (userID) => {
      var temp_array_ofDel = [];
      typing.innerHTML = "";

      this.showCurrentUsers.forEach((it, i) => {
        if (it.id != userID) {
          temp_array_ofDel.push(it);
        }

        if (i + 1 == this.showCurrentUsers.length) {
          this.showCurrentUsers = temp_array_ofDel;

          var temp_array_ofDel_1 = [];
          activeIds.forEach((it, i) => {
            if (it != userID) {
              temp_array_ofDel_1.push(it);
            }

            if (i + 1 == activeIds.length) {
              activeIds = temp_array_ofDel_1;

              var temp_array_ofDel_2 = [];
              active_name_with_id.forEach((it, i) => {
                if (it.id != userID) {
                  temp_array_ofDel_2.push(it);
                }

                if (i + 1 == active_name_with_id.length) {
                  active_name_with_id = temp_array_ofDel_2;

                  var temp_array_ofDel_3 = [];
                  showNames_and_ids.forEach((it, i) => {
                    if (it.id != userID) {
                      temp_array_ofDel_3.push(it);
                    }

                    if (i + 1 == showNames_and_ids.length) {
                      showNames_and_ids = temp_array_ofDel_3;
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    //-------------------------------------
    socket.on("chat", ({ nameValue, messageValue, io_id }) => {
      if (io_id != userID1) {
        messages.innerHTML += `<div id="notme_Dv"><span>${nameValue}</span> <div><pre>${messageValue}</pre></div></div>`;
      } else {
        messages.innerHTML += `<div id="me_Dv"><div><pre>${messageValue}</pre></div></div>`;
      }

      typing.innerHTML = "";
      matchDataName = [];

      setTimeout(() => {
        scroll_and_sound();
      }, 100);
    });

    socket.on("typing", (data) => {
      if (data != null) {
        if (matchDataName.length == 0) {
          typing.innerHTML = `<p id="tp_ing"><em>${data}</em> is tpying a message..</p>`;
          matchDataName.push(data);
        } else {
          if (!matchDataName.includes(data)) {
            typing.innerHTML += `<p id="tp_ing"><em>${data}</em> is tpying a message..</p>`;
            matchDataName.push(data);
          }
        }
      } else {
        typing.innerHTML = "";
        matchDataName = [];
      }

      if (_direction == "down") {
        typing.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    });

    socket.on("typing_name", (data) => {
      var tempArray_1 = [];

      active_name_with_id.forEach((ac_ids, i) => {
        if (ac_ids.id == data.userID1) {
          var name_in_Ar_1 = {
            name: data.userName,
            id: data.userID1,
          };

          tempArray_1.push(name_in_Ar_1);
        } else {
          tempArray_1.push(ac_ids);
        }

        if (i + 1 == active_name_with_id.length) {
          active_name_with_id = tempArray_1;
          var tempArray_2 = [];

          active_name_with_id.forEach((item, i) => {
            if (item.name == null) {
              tempArray_2.push({ showName: item.id, id: item.id });
            } else {
              tempArray_2.push({ showName: item.name, id: item.id });
            }

            if (i + 1 == active_name_with_id.length) {
              showNames_and_ids = tempArray_2;

              this.showCurrentUsers = showNames_and_ids;
            }
          });
        }
      });
    });

    socket.on("get_userNames", (data) => {
      if (data.extra != null) {
        if (data_with_null != null) {
          var new_Array_temp = data_with_null.curr_usr;

          this.showCurrentUsers = new_Array_temp;

          var temp_array_for_showName_to_name = [];
          this.showCurrentUsers.forEach((it, i) => {
            temp_array_for_showName_to_name.push({
              name: it.showName,
              id: it.id,
            });

            if (i + 1 == this.showCurrentUsers.length) {
              active_name_with_id = temp_array_for_showName_to_name;
            }
          });
        }
      } else {
        data_with_null = data;
      }
    });
  },
};

Vue.createApp(app).mount("#app");
