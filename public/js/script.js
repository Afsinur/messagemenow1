const socket = io("/");

var userID1,
  count_userID1 = 0,
  activeIds = [],
  active_name_with_id = [],
  showNames_and_ids = [],
  var_hideHTML_1st_one = null,
  var_activatedLi = null,
  window_innerWidth = window.innerWidth,
  allTypeOfMessagesTxtFormCollection = [];

var _direction,
  this_youAreRPLY_ing = false,
  this_current_eFOR_RPLY;

var acceptConBtnFunc, acceptConFunc;

//-----------------------------

var resizeIfRisized = () => {
  if (window.innerWidth <= 512) {
    var_hideHTML_1st_one = true;
  } else {
    var_hideHTML_1st_one = false;
  }
};

resizeIfRisized();

//---------------------------

const app = {
  data() {
    return {
      showCurrentUsers: [],
      user_name: "",
      mess_ages: "",
      side_Open: false,
      sending_AN_IMG: false,
      sending_AN_IMG1: {},
      sending_AN_AUDIO: false,
      sending_AN_AUDIO1: {},
      activatedLi: null,
      common_li_color_and_background: {
        common_li_color: "#747474",
        common_li_color1: "#ffffff",
        common_li_background: "rgb(174, 57, 239)",
        common_li_box_Shadow: "inset 0 1px 1px 1px rgba(0, 0, 0, 0.25)",
        common_li_box_Shadow1: "inset 0 0 0 0 rgba(0, 0, 0, 0.25)",
      },
      hideHTML_1st_one: null,
      sliderTab: null,
      currentVoiceSendAnimation: null,
      show_date: false,
      show_date_p: false,
      defaultColors: {
        text: "#ffffff",
        background: "#507cf7",
        text1: "#303030",
        background1: "#d9d9d9",
        chatbox: "#ededed",
      },
      defaultColors_edited: {
        text: "#ffffff",
        background: "#507cf7",
        text1: "#303030",
        background1: "#d9d9d9",
        chatbox: "#ededed",
      },
      processing_Prev_users_chats: true,
      isTextTrue: null,
      isCpyTrue: null,
      isTextTrueorFalseCon: false,
      RemovemE: true,
      current_eFOR_cpy: null,
      current_eFOR_RMV: null,
      current_eFOR_RMV1: null,
      current_eFOR_RPLY: null,
      youAreRPLY_ing: false,
      rplyVUEtxts: { name: null, message: null, type: null },
    };
  },

  methods: {
    send_click(e, e1) {
      document.getElementById("message").style.minHeight = "7vh";
      document.getElementById("send").classList.add("image_send_d1");

      var io_id = userID1;
      var nameValue = e || io_id,
        messageValue = e1;

      if (this.youAreRPLY_ing == false) {
        socket.emit("chat", {
          nameValue,
          messageValue,
          io_id,
        });
      } else {
        var current_eFOR_RPLY = this.current_eFOR_RPLY;

        socket.emit("chat", {
          nameValue,
          messageValue,
          io_id,
          current_eFOR_RPLY,
        });
      }

      this.mess_ages = "";
    },

    vueKeyup(e1) {
      var client_width_divide_value_length_of_text_area =
        document.getElementById("message").clientWidth /
        document.getElementById("message").value.length;

      if (client_width_divide_value_length_of_text_area < 4) {
        document.getElementById("message").style.minHeight = "20vh";
      } else if (document.getElementById("message").value.length == 0) {
        document.getElementById("message").style.minHeight = "7vh";
      }

      var e = document.getElementById("message");
      var nameValueBroadcast = e1 || userID1;

      if (e.value != "") {
        socket.emit("typing", nameValueBroadcast);
      } else {
        socket.emit("typing", null);
      }
    },

    vueKeyup1() {
      var e =
        document.getElementById("name").value ||
        document.getElementById("name1").value;

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
      if (document.getElementById("fileinput").value == "") {
        if (this.sending_AN_IMG == false) {
          document.getElementById("fileinput").click();
        } else {
          alert(
            `Please wait, ${
              this.sending_AN_IMG1.mby1 || this.sending_AN_IMG1.mby2
            } is sending an image!`
          );
        }
      } else {
        alert("Please wait, image has not processed yet!");
      }
    },

    tab_slider(e, e1) {
      for (
        let index = 0;
        index < e.target.parentNode.children.length;
        index++
      ) {
        const element = e.target.parentNode.children[index];
        if (element != e.target) {
          element.style.color =
            this.common_li_color_and_background.common_li_color;
          element.style.background = "none";
          element.style.boxShadow =
            this.common_li_color_and_background.common_li_box_Shadow;
        } else {
          this.activatedLi = e.target;

          element.style.color =
            this.common_li_color_and_background.common_li_color1;
          element.style.background =
            this.common_li_color_and_background.common_li_background;
          element.style.boxShadow =
            this.common_li_color_and_background.common_li_box_Shadow1;
        }
      }

      if (var_hideHTML_1st_one == true) {
        var dynamicDivs1 = document.querySelector(
          `#current_users1 #tab_content_container`
        );
      } else {
        var dynamicDivs1 = document.querySelector(`#tab_content_container`);
      }

      //dynamicDivs1
      for (let index = 0; index < dynamicDivs1.children.length; index++) {
        const element = dynamicDivs1.children[index];

        if (element == dynamicDivs1.children[e1]) {
          if (e1 != 0 && e1 != 2) {
            if (element.previousSibling != null) {
              element.previousSibling.style.transform = "translate(-100%)";
            }

            element.style.transform = "translate(0%)";

            if (element.nextSibling != null) {
              element.nextSibling.style.transform = "translate(100%)";
            }
          } else {
            if (e1 == 0) {
              element.style.transform = "translate(0%)";

              element.nextSibling.style.transform = "translate(100%)";

              element.nextSibling.nextSibling.style.transform =
                "translate(200%)";
            } else {
              element.style.transform = "translate(0%)";

              element.previousSibling.style.transform = "translate(-100%)";

              element.previousSibling.previousSibling.style.transform =
                "translate(-200%)";
            }
          }
        }
      }
    },

    changeBackground_and_color(e) {
      if (e.target != this.activatedLi) {
        for (
          let index = 0;
          index < e.target.parentNode.children.length;
          index++
        ) {
          const element = e.target.parentNode.children[index];

          if (element != this.activatedLi) {
            if (element != e.target) {
              element.style.color =
                this.common_li_color_and_background.common_li_color;
              element.style.background = "none";
            } else {
              element.style.color =
                this.common_li_color_and_background.common_li_color1;
              element.style.background =
                this.common_li_color_and_background.common_li_background;
            }
          }
        }
      }
    },

    changeBackground_and_color1() {
      for (
        let index = 0;
        index < this.activatedLi.parentNode.children.length;
        index++
      ) {
        const element = this.activatedLi.parentNode.children[index];

        if (element != this.activatedLi) {
          element.style.color =
            this.common_li_color_and_background.common_li_color;
          element.style.background = "none";
        }
      }
    },

    showDateFunc(e) {
      this.show_date_p = e;

      for (
        let index = 0;
        index < document.querySelector(`#messages`).children.length;
        index++
      ) {
        const element1 = document.querySelector(`#messages`).children[index];

        for (let index = 0; index < element1.children.length; index++) {
          const element2 = element1.children[index];

          if (element2.children.length != 0) {
            for (let index = 0; index < element2.children.length; index++) {
              const element3 = element2.children[index];

              if (element3.className == "show_date_p") {
                if (e == false) {
                  element3.style.display = "none";
                } else {
                  element3.style.display = "block";
                }
              }
            }
          }
        }
      }

      if (e == true) {
        document.querySelector(".checkbox1Div div").style.transform =
          "translate(110%)";

        document.querySelector(".checkbox1Div div").style.background =
          "rgb(41, 96, 249)";

        document.querySelector(
          ".addedClassForCheckboxDiv div"
        ).style.transform = "translate(110%)";

        document.querySelector(
          ".addedClassForCheckboxDiv div"
        ).style.background = "rgb(41, 96, 249)";
      } else {
        document.querySelector(".checkbox1Div div").style.transform =
          "translate(0%)";

        document.querySelector(".checkbox1Div div").style.background =
          "#666666";

        document.querySelector(
          ".addedClassForCheckboxDiv div"
        ).style.transform = "translate(0%)";

        document.querySelector(
          ".addedClassForCheckboxDiv div"
        ).style.background = "#666666";
      }
    },

    color_ul_changed_function(e, e1) {
      //chatbox background
      if (
        document.querySelector(`#messages`).parentNode.id == "msg_Div" &&
        e1 == 5
      ) {
        this.defaultColors_edited.chatbox = e.target.value;

        document.querySelector(`#messages`).parentNode.style.background =
          e.target.value;
      }

      if (e1 == 1) {
        this.defaultColors_edited.text = e.target.value;
      } else if (e1 == 2) {
        this.defaultColors_edited.background = e.target.value;
      } else if (e1 == 3) {
        this.defaultColors_edited.text1 = e.target.value;

        if (document.getElementById("tp_ing") != null) {
          document.getElementById("tp_ing").style.color = e.target.value;
        }
      } else if (e1 == 4) {
        this.defaultColors_edited.background1 = e.target.value;
      }

      //chats color and background
      for (
        let index = 0;
        index < document.querySelector(`#messages`).children.length;
        index++
      ) {
        const element1 = document.querySelector(`#messages`).children[index];

        for (let index = 0; index < element1.children.length; index++) {
          const element2 = element1.children[index];

          //element2.children.length != 0
          if (element2.parentNode.id == "me_Dv" && e1 == 1) {
            element2.style.color = e.target.value;
          } else if (element2.parentNode.id == "me_Dv" && e1 == 2) {
            element2.style.background = e.target.value;
          } else if (element2.parentNode.id == "notme_Dv" && e1 == 3) {
            element2.style.color = e.target.value;
          } else if (
            element2.parentNode.id == "notme_Dv" &&
            e1 == 4 &&
            element2.children.length != 0
          ) {
            element2.style.background = e.target.value;
          }
        }
      }
    },

    setDefaultColor() {
      var newResetClone1 = {
        text: "#ffffff",
        background: "#507cf7",
        text1: "#303030",
        background1: "#d9d9d9",
        chatbox: "#ededed",
      };

      this.defaultColors_edited = newResetClone1;

      document.querySelector(`#messages`).parentNode.style.background =
        this.defaultColors_edited.chatbox;

      (() => {
        var new_loop_arr = [1, 2, 3, 4];
        new_loop_arr.forEach((e1) => {
          //chats color and background
          for (
            let index = 0;
            index < document.querySelector(`#messages`).children.length;
            index++
          ) {
            const element1 =
              document.querySelector(`#messages`).children[index];

            for (let index = 0; index < element1.children.length; index++) {
              const element2 = element1.children[index];

              //element2.children.length != 0
              if (element2.parentNode.id == "me_Dv" && e1 == 1) {
                element2.style.color = this.defaultColors_edited.text;
              } else if (element2.parentNode.id == "me_Dv" && e1 == 2) {
                element2.style.background =
                  this.defaultColors_edited.background;
              } else if (element2.parentNode.id == "notme_Dv" && e1 == 3) {
                element2.style.color = this.defaultColors_edited.text1;
              } else if (
                element2.parentNode.id == "notme_Dv" &&
                e1 == 4 &&
                element2.children.length != 0
              ) {
                element2.style.background =
                  this.defaultColors_edited.background1;
              }
            }
          }
        });
      })();
    },

    e_CurrentCPY(elm1) {
      for (let index = 0; index < elm1.length; index++) {
        const element12 = elm1[index];
        if (element12.nodeName == "PRE") {
          var innerDynText = element12.innerText;
          var inputc = document.body.appendChild(
            document.createElement("input")
          );

          inputc.value = innerDynText;
          inputc.focus();
          inputc.select();

          document.execCommand("copy");

          inputc.parentNode.removeChild(inputc);
          this.isTextTrueorFalseCon = false;
        }
      }
    },

    e_CurrentRMV(e, e1) {
      socket.emit("removeAmessage", e);

      var newArrayAllColl = [];
      allTypeOfMessagesTxtFormCollection.forEach((e_1, e_2) => {
        if (e != e_2) {
          newArrayAllColl.push(e_1);
        }

        if (e_2 + 1 == allTypeOfMessagesTxtFormCollection.length) {
          allTypeOfMessagesTxtFormCollection = newArrayAllColl;
        }
      });

      e1.remove();
      this.isTextTrueorFalseCon = false;
    },

    e_CurrentRPLY(e) {
      document.getElementById("message").focus();

      var PRLYto = {};

      var slicedMessage = `${allTypeOfMessagesTxtFormCollection[
        e
      ].message.slice(0, 35)}..`;

      PRLYto.id = `${allTypeOfMessagesTxtFormCollection[e].id}`;
      PRLYto.date = `${allTypeOfMessagesTxtFormCollection[e].date}`;

      if (allTypeOfMessagesTxtFormCollection[e].showName != "") {
        PRLYto.showName = `${allTypeOfMessagesTxtFormCollection[e].showName}`;
      } else {
        PRLYto.showName = `${allTypeOfMessagesTxtFormCollection[e].id}`;
      }

      PRLYto.slicedMessage = slicedMessage;
      PRLYto.type = `${allTypeOfMessagesTxtFormCollection[e].type}`;

      //------
      this.rplyVUEtxts.name = PRLYto.showName;
      this.rplyVUEtxts.type = allTypeOfMessagesTxtFormCollection[e].type;

      if (allTypeOfMessagesTxtFormCollection[e].type == "chat") {
        this.rplyVUEtxts.message = slicedMessage;
      } else {
        this.rplyVUEtxts.message =
          allTypeOfMessagesTxtFormCollection[e].message;
      }

      //-------
      this.isTextTrueorFalseCon = false;
      this.youAreRPLY_ing = true;

      this_youAreRPLY_ing = this.youAreRPLY_ing;
      this_current_eFOR_RPLY = this.current_eFOR_RPLY;

      setTimeout(() => {
        if (_direction == "down") {
          document.getElementById("typing").scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }, 100);
    },

    e_closeRPLY(e) {
      this.youAreRPLY_ing = false;
    },

    inerValCkForagr() {
      var st1Txt = `
      /*loadAgnAndAgn*/
      #loadAgnAndAgn {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background: rgba(0, 0, 0, 0.35);
        z-index: 4;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      
      #loadAgnAndAgn div {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 90%;
        heigth: 80vh;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 15px;
        border-radius: 5px;
        background: #ededed;
        user-select: none;
      }      
      
      #loadAgnAndAgn div :is(h3, p, label, button) {
        margin: 5px 0;
        max-width: 90%;        
      }

      #loadAgnAndAgn span.pointerCur{
        cursor: pointer;
      }

      #loadAgnAndAgn ul li{
        margin-left: 5px;
      }
      
      #loadAgnAndAgn div input {
        margin-right: 5px;
      }
      
      #loadAgnAndAgn div button {
        align-self: flex-end;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background: #2960f9;
        color: #fff;
        cursor: pointer;
        transition: background 150ms ease-in-out;
      }
      
      #loadAgnAndAgn div button:hover {
        background: #183b99;
      }
      
      #loadAgnAndAgn div button:disabled {
        background: #273f80;
        color: #dedede;
        cursor: default;
      }
      /*------------------*/      
      `;
      var st1 = document.createElement("style");
      st1.appendChild(document.createTextNode(st1Txt));

      var changed = true;

      var commonDostyleFunc = () => {
        document.getElementsByTagName("head")[0].appendChild(st1);

        changed = true;
      };

      commonDostyleFunc();

      var inervaled1 = setInterval(() => {
        var loadAgnAndAgn = document.getElementById("loadAgnAndAgn");
        var loadAgnAndAgn1 = document.querySelector(
          "#loadAgnAndAgn .under_loadAgnAndAgn div"
        );

        document.getElementsByTagName("head")[0].appendChild(st1);

        var dataTxt1 = `
        <div class="under_loadAgnAndAgn">
         <h3>Promise Note</h3>

         <div>
            <b>I promise to Allah that,</b>
            <ul>
              <li>
                I will not add any
                <span class="pointerCur" title="Non-mahram in Islam"
                  ><u>non-mahram</u></span
                >(in Islam) in this group.
              </li>

              <li>
                I will not enter in this group if I am a
                <span class="pointerCur" title="Non-mahram in Islam"
                  ><u>non-mahram</u></span
                >(in Islam).
              </li>

              <li>
                I will not exchange any multimedia message that is not permitted
                by Allah.
              </li>
            </ul>
          </div>

         <label for="acceptCon"
          ><input
            type="checkbox"
            id="acceptCon"
            onchange="acceptConFunc()"
          />Accept</label
         >

         <button id="acceptConBtn" onclick="acceptConBtnFunc(true)" disabled>
           Accept
         </button>
        </div>
        `;

        var dataTxt2 = `
         <b>I promise to Allah that,</b>
         <ul>
           <li> I will not add any <span class="pointerCur" title="Non-mahram in Islam"><u>non-mahram</u></span>(in Islam) in this group.</li>              
         
           <li> I will not enter in this group if I am a <span class="pointerCur" title="Non-mahram in Islam"><u>non-mahram</u></span>(in Islam).</li>              
         
           <li> I will not exchange any multimedia message that is not permitted by Allah.</li> 
         </ul>
        `;

        var cmn_in_null = () => {
          var crtElmnt1 = document.createElement("div");
          crtElmnt1.id = "loadAgnAndAgn";
          crtElmnt1.innerHTML = dataTxt1;

          document.getElementById("app").appendChild(crtElmnt1);

          commonDostyleFunc();
        };

        if (loadAgnAndAgn == null) {
          cmn_in_null();
        } else {
          if (loadAgnAndAgn1 != null) {
            loadAgnAndAgn1.innerHTML = dataTxt2;
          } else {
            window.location.reload();
          }
        }
      }, 1000);

      acceptConBtnFunc = (e) => {
        if (e == true) {
          document.getElementById("loadAgnAndAgn").style.display = "none";

          clearInterval(inervaled1);
        }
      };

      acceptConFunc = () => {
        if (changed == true) {
          document.getElementById("acceptConBtn").removeAttribute("disabled");

          changed = false;
        } else {
          document.getElementById("acceptConBtn").setAttribute("disabled", "");

          changed = true;
        }
      };
    },

    E_after_Load() {
      //DOM
      var messages = document.getElementById("messages"),
        typing = document.getElementById("typing"),
        chatContainer = document.getElementById("msg_Div");

      var showNames_and_ids = [];
      var active_name_with_id = [];
      var activeIds = [];
      var data_with_null = null;

      var matchDataName = [];
      _direction = "down";
      var _top = chatContainer.scrollTop;
      var local_sending_AN_AUDIO = false;
      var forResizeAgain_voice;

      //some window resize functions
      this.hideHTML_1st_one = var_hideHTML_1st_one;

      var sliderTab = () => {
        this.sliderTab.style.transform = "translate(0%)";

        this.sliderTab.nextSibling.style.transform = "translate(100%)";

        this.sliderTab.nextSibling.nextSibling.style.transform =
          "translate(200%)";
      };

      var colorThis = () => {
        this.activatedLi.style.color =
          this.common_li_color_and_background.common_li_color1;

        this.activatedLi.style.background =
          this.common_li_color_and_background.common_li_background;
        this.activatedLi.style.boxShadow =
          this.common_li_color_and_background.common_li_box_Shadow1;

        this.activatedLi.nextSibling.style.color =
          this.common_li_color_and_background.common_li_color;
        this.activatedLi.nextSibling.style.background = "none";
        this.activatedLi.nextSibling.style.boxShadow =
          this.common_li_color_and_background.common_li_box_Shadow;

        this.activatedLi.nextSibling.nextSibling.style.color =
          this.common_li_color_and_background.common_li_color;
        this.activatedLi.nextSibling.nextSibling.style.background = "none";
        this.activatedLi.nextSibling.nextSibling.style.boxShadow =
          this.common_li_color_and_background.common_li_box_Shadow;

        sliderTab();
      };

      var resizeIfRisized = () => {
        if (window.innerWidth <= 512) {
          this.hideHTML_1st_one = true;
          var_hideHTML_1st_one = true;

          this.activatedLi = document.querySelector(
            "#current_users1 #current_users_ul > li:nth-child(1)"
          );

          this.sliderTab = document.querySelector(
            `#current_users1 #tab_content_container div:nth-child(1)`
          );

          colorThis();
        } else {
          this.hideHTML_1st_one = false;
          var_hideHTML_1st_one = false;

          this.activatedLi = document.querySelector(
            "#current_users_ul > li:nth-child(1)"
          );

          this.sliderTab = document.querySelector(
            `#current_users #tab_content_container div:nth-child(1)`
          );

          colorThis();
        }
      };

      setTimeout(() => {
        resizeIfRisized();
      }, 1000);

      window.addEventListener("resize", () => {
        resizeIfRisized();
      });

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

      document.getElementById("file").addEventListener("change", () => {
        document.getElementById("fileinput").click();
      });

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
        var side_bar_javascript = document.getElementById("side_bar"),
          header1 = document.getElementById("header1"),
          current_users1 = document.getElementById("current_users1"),
          current_users1_ul = document.getElementById("current_users1_ul"),
          btnStartDiv = document.getElementById("btnStartDiv"),
          btnStartContainerDiv = document.getElementById(
            "btnStartContainerDiv"
          );

        //copy or remove div
        //side_bar
        if (
          e.target.parentNode.className == "commonCpyRmv" ||
          e.target.id == "isTextTrueorFalse" ||
          e.target.className == "commonCpyRmv"
        ) {
          this.isTextTrueorFalseCon = true;
        } else {
          this.isTextTrueorFalseCon = false;
        }

        //sidebar
        if (
          e.target != side_bar_javascript &&
          e.target.parentNode.parentNode.parentNode != side_bar_javascript &&
          e.target.parentNode.parentNode.parentNode.parentNode !=
            side_bar_javascript &&
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode !=
            side_bar_javascript &&
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode != side_bar_javascript &&
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode != side_bar_javascript &&
          e.target.parentNode != side_bar_javascript &&
          e.target.parentNode != header1 &&
          e.target.parentNode != current_users1 &&
          e.target.parentNode != current_users1_ul &&
          e.target != btnStartDiv &&
          e.target != btnStartDiv &&
          e.target != btnStartContainerDiv &&
          e.target.parentNode != btnStartContainerDiv
        ) {
          this.side_Open = false;
          side_bar_javascript.style.transform = "translate(-100%)";
        }

        //recorder
        if (
          e.target != btnStartDiv &&
          e.target != btnStartContainerDiv &&
          e.target.parentNode != btnStartContainerDiv
        ) {
          btnStartDiv.style.display = "none";
        }
      });

      //mousedown, touchstart Event
      var commonEventHandlerFunc_s_forLoop_again = (elm1, e2) => {
        this.isTextTrueorFalseCon = true;

        for (let index = 0; index < elm1.length; index++) {
          const element = elm1[index];

          if (element.nodeName == "P") {
            allTypeOfMessagesTxtFormCollection.forEach((obj1, i_obj1) => {
              if (obj1.type == "chat") {
                if (obj1.date == element.innerHTML) {
                  this.isCpyTrue = true;

                  if (e2 == "notme_Dv") {
                    this.isTextTrue = true;

                    this.RemovemE = false;
                  } else {
                    this.isTextTrue = true;

                    this.RemovemE = true;
                  }

                  this.current_eFOR_cpy = element.parentNode.children;

                  this.current_eFOR_RMV = i_obj1;

                  this.current_eFOR_RMV1 = element.parentNode;

                  this.current_eFOR_RPLY = i_obj1;
                }
              } else if (obj1.type == "image") {
                if (obj1.date == element.innerHTML) {
                  this.isCpyTrue = false;

                  if (e2 == "notme_Dv") {
                    this.isTextTrue = true;

                    this.RemovemE = false;
                  } else {
                    this.isTextTrue = false;
                  }

                  this.current_eFOR_RMV = i_obj1;

                  this.current_eFOR_RMV1 = element.parentNode;

                  this.current_eFOR_RPLY = i_obj1;
                }
              } else if (obj1.type == "audio") {
                if (obj1.date == element.innerHTML) {
                  this.isCpyTrue = false;

                  if (e2 == "notme_Dv") {
                    this.isTextTrue = true;

                    this.RemovemE = false;
                  } else {
                    this.isTextTrue = false;
                  }

                  this.current_eFOR_RMV = i_obj1;

                  this.current_eFOR_RMV1 = element.parentNode;

                  this.current_eFOR_RPLY = i_obj1;
                }
              }
            });
          }
        }
      };

      var commonEventHandlerFunc_s_forLoop = (ar1, e2) => {
        for (let index = 0; index < ar1.length; index++) {
          const element = ar1[index];
          if (element.nodeName == "DIV") {
            commonEventHandlerFunc_s_forLoop_again(element.children, e2);
          }
        }
      };

      var commonEventHandlerFunc = (e, e1, e2) => {
        var ifAvarUndefinedFilter =
          e.target.parentNode || e.target.parentNode.parentNode;

        if (ifAvarUndefinedFilter.id == `${e1}`) {
          commonEventHandlerFunc_s_forLoop(ifAvarUndefinedFilter.children, e2);
        } else {
          commonEventHandlerFunc_s_forLoop(
            e.target.parentNode.parentNode.children,
            e2
          );
        }
      };

      var commonMouseDownEventForDeleteAndCopyPerpouse = (e) => {
        if (
          e.target.parentNode.parentNode.id == "messages" ||
          e.target.parentNode.parentNode.id == "notme_Dv" ||
          e.target.parentNode.parentNode.id == "me_Dv"
        ) {
          if (
            e.target.parentNode.id == "notme_Dv" ||
            e.target.parentNode.parentNode.id == "notme_Dv"
          ) {
            commonEventHandlerFunc(e, "notme_Dv", "notme_Dv");
          } else if (
            e.target.parentNode.id == "me_Dv" ||
            e.target.parentNode.parentNode.id == "me_Dv"
          ) {
            commonEventHandlerFunc(e, "me_Dv", "me_Dv");
          }
        }
      };

      window.addEventListener(
        "click",
        commonMouseDownEventForDeleteAndCopyPerpouse
      );

      //send Image
      var fileinput = document.getElementById("fileinput");
      var max_width = fileinput.getAttribute("data-maxwidth");
      var max_height = fileinput.getAttribute("data-maxheight");
      var form = document.getElementById("form");

      function processfile(file) {
        if (!/image/i.test(file.type)) {
          alert("File " + file.name + " is not an image.");
          return false;
        }

        // read the files
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function (event) {
          // blob stuff
          var blob = new Blob([event.target.result]); // create blob...
          window.URL = window.URL || window.webkitURL;
          var blobURL = window.URL.createObjectURL(blob); // and get it's URL

          // helper Image object
          var image = new Image();

          image.src = blobURL;
          image.onload = function () {
            // have to wait till it's loaded
            resizeMe(image, file);
          };
        };
      }

      function readfiles(files) {
        // remove the existing canvases and hidden inputs if user re-selects new pics
        var existinginputs = document.getElementsByName("images[]");
        while (existinginputs.length > 0) {
          form.removeChild(existinginputs[0]);
        }

        for (var i = 0; i < files.length; i++) {
          processfile(files[i]);
        }
      }

      // this is where it starts. event triggered when user selects files

      fileinput.onchange = function () {
        if (
          !(window.File && window.FileReader && window.FileList && window.Blob)
        ) {
          alert("The File APIs are not fully supported in this browser.");
          return false;
        }

        if (var_hideHTML_1st_one == true) {
          document
            .querySelectorAll(".image_snd_btn")[1]
            .classList.add("image_send_d1");
        } else {
          document
            .querySelectorAll(".image_snd_btn")[0]
            .classList.add("image_send_d1");
        }

        if (
          this.files[0].type == "image/jpeg" ||
          this.files[0].type == "image/png" ||
          this.files[0].type == "image/jpg"
        ) {
          if (this.files[0].size <= 25000000) {
            socket.emit("clicked_send_img", {
              data1: true,
              data2: {
                mby1:
                  document.querySelector("#name").value ||
                  document.querySelector("#name1").value,
                mby2: userID1,
              },
            });

            readfiles(fileinput.files);
          } else {
            document.getElementById("fileinput").value = "";

            if (var_hideHTML_1st_one == true) {
              document
                .querySelectorAll(".image_snd_btn")[1]
                .classList.remove("image_send_d1");
            } else {
              document
                .querySelectorAll(".image_snd_btn")[0]
                .classList.remove("image_send_d1");
            }

            alert("Maximum file size around 25MB!");
          }
        } else {
          document.getElementById("fileinput").value = "";

          if (var_hideHTML_1st_one == true) {
            document
              .querySelectorAll(".image_snd_btn")[1]
              .classList.remove("image_send_d1");
          } else {
            document
              .querySelectorAll(".image_snd_btn")[0]
              .classList.remove("image_send_d1");
          }

          alert("Please insert a png or jpeg file!");
        }
      };

      // === RESIZE ====
      function resizeMe(img, file) {
        var canvas = document.createElement("canvas");

        var width = img.width;
        var height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > max_width) {
            //height *= max_width / width;
            height = Math.round((height *= max_width / width));
            width = max_width;
          }
        } else {
          if (height > max_height) {
            //width *= max_height / height;
            width = Math.round((width *= max_height / height));
            height = max_height;
          }
        }

        // resize the canvas and draw the image data into it
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        //new_chunk
        if (this_youAreRPLY_ing == false) {
          socket.emit("image", {
            image: canvas.toDataURL("image/jpeg", 0.7),
            type: file.type,
            u_id: userID1,
            user_pic_Name:
              document.querySelector("#name").value ||
              document.querySelector("#name1").value,
            current_eFOR_RPLY: undefined,
          });
        } else {
          var current_eFOR_RPLY = this_current_eFOR_RPLY;

          socket.emit("image", {
            image: canvas.toDataURL("image/jpeg", 0.7),
            type: file.type,
            u_id: userID1,
            user_pic_Name:
              document.querySelector("#name").value ||
              document.querySelector("#name1").value,
            current_eFOR_RPLY,
          });
        }
      }

      //==== Audio section ====
      var audioIN = { audio: true };
      var ProcessStarted = false;
      var startVoiceRcord = false;
      var this_event_ID;

      var commonVoice = () => {
        if (this.sending_AN_AUDIO == false) {
          this_event_ID = this.currentVoiceSendAnimation;
          document.getElementById("btnStartDiv").style.display = "flex";

          if (!ProcessStarted) {
            ProcessStarted = true;

            navigator.mediaDevices
              .getUserMedia(audioIN)

              // 'then()' method returns a Promise
              .then(function (mediaStreamObj) {
                // Connect the media stream to the

                // Start record
                let start = document.getElementById("btnStart");

                // Stop record
                let stop = document.getElementById("btnStop");

                let mediaRecorder = new MediaRecorder(mediaStreamObj);

                // Start event
                var startInerInnerhtml;
                var dynamicObject2 = {
                  background: "none",
                  padding: `0px`,
                };

                var multipleStartEvents = () => {
                  if (local_sending_AN_AUDIO == false) {
                    if (!startVoiceRcord) {
                      var innerHtmlTIMER = 0;
                      startVoiceRcord = true;

                      mediaRecorder.start();

                      startInerInnerhtml = setInterval(() => {
                        innerHtmlTIMER++;

                        var dynamicObject1 = {
                          background: "#f00",
                          padding: `${innerHtmlTIMER * 10}px`,
                        };

                        Object.assign(
                          document.getElementById("btnStartContainerDiv").style,
                          dynamicObject1
                        );
                      }, 1000);
                    }

                    setTimeout(() => {
                      if (startVoiceRcord) {
                        startVoiceRcord = false;

                        stop.click();

                        clearInterval(startInerInnerhtml);

                        Object.assign(
                          document.getElementById("btnStartContainerDiv").style,
                          dynamicObject2
                        );
                      }
                    }, 11000);
                  } else {
                    alert("Please wait a voice message is in process..");
                  }
                };

                start.addEventListener("mousedown", multipleStartEvents);
                start.addEventListener("touchstart", multipleStartEvents);

                var multipleEndEventsFunction = () => {
                  if (startVoiceRcord) {
                    startVoiceRcord = false;

                    stop.click();

                    clearInterval(startInerInnerhtml);

                    Object.assign(
                      document.getElementById("btnStartContainerDiv").style,
                      dynamicObject2
                    );
                  }
                };

                start.addEventListener("mouseleave", multipleEndEventsFunction);
                start.addEventListener("mouseup", multipleEndEventsFunction);
                start.addEventListener("touchend", multipleEndEventsFunction);
                start.addEventListener(
                  "touchcancel",
                  multipleEndEventsFunction
                );

                // Stop event
                stop.addEventListener("click", function () {
                  mediaRecorder.stop();
                });

                mediaRecorder.ondataavailable = function (ev) {
                  if (ev.data.size != 0 && ev.data.size >= 1000) {
                    dataArray.push(ev.data);
                  }
                };

                let dataArray = [];
                mediaRecorder.onstop = function () {
                  if (dataArray != "") {
                    local_sending_AN_AUDIO = true;

                    socket.emit("clicked_send_audio", {
                      data1: true,
                      data2: {
                        mby1:
                          document.querySelector("#name").value ||
                          document.querySelector("#name1").value,
                        mby2: userID1,
                      },
                    });

                    this_event_ID.classList.add("image_send_d1");

                    //current_eFOR_RPLY
                    if (this_youAreRPLY_ing == false) {
                      socket.emit("send_audio", {
                        dataArray,
                        u_id: userID1,
                        user_pic_Name:
                          document.querySelector("#name").value ||
                          document.querySelector("#name1").value,
                      });
                    } else {
                      var current_eFOR_RPLY = this_current_eFOR_RPLY;

                      socket.emit("send_audio", {
                        dataArray,
                        u_id: userID1,
                        user_pic_Name:
                          document.querySelector("#name").value ||
                          document.querySelector("#name1").value,
                        current_eFOR_RPLY,
                      });
                    }

                    dataArray = [];
                  }
                };
              })
              .catch(function (err) {
                console.log(err.name, err.message);
              });
          }
        } else {
          alert("Please wait a voice message is in process..");
        }
      };

      //forResizeAgain_voice;
      forResizeAgain_voice = () => {
        document
          .querySelectorAll(".btnStartUpID")[0]
          .addEventListener("click", () => {
            this.currentVoiceSendAnimation =
              document.querySelectorAll(".btnStartUpID")[0];

            commonVoice(this.currentVoiceSendAnimation);
          });

        document
          .querySelectorAll(".btnStartUpID")[1]
          .addEventListener("click", () => {
            this.currentVoiceSendAnimation =
              document.querySelectorAll(".btnStartUpID")[1];

            commonVoice(this.currentVoiceSendAnimation);
          });
      };

      setTimeout(() => {
        forResizeAgain_voice();
      }, 1000);

      //listen and emit for sockets
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

        //allTypeOfMessagesTxtFormCollection
        if (allTypeOfMessagesTxtFormCollection.length == 0) {
          //sendMeChattings
          socket.emit("sendMeChattings", activeIds.length);
        }
      });

      socket.on("sendMeChattings", (data) => {
        this.processing_Prev_users_chats = false;

        if (allTypeOfMessagesTxtFormCollection.length > 0) {
          socket.emit("okSendingChattings", {
            dataID: userID1,
            dataLength: allTypeOfMessagesTxtFormCollection.length,
            totalUserLen: data,
          });
        }
      });

      var newArr1 = [];
      var newArr1_withData = [];
      var arrived_okSendingChattings = 0;
      var how_manyTimesMaxNumber = 0;
      socket.on(
        "okSendingChattings",
        ({ dataID, dataLength, totalUserLen }) => {
          if (allTypeOfMessagesTxtFormCollection.length <= 0) {
            newArr1.push(dataLength);
            newArr1_withData.push({ dataID, dataLength });
            var maxNumberOfThisArray = Math.max(...newArr1);

            arrived_okSendingChattings++;
            if (arrived_okSendingChattings == totalUserLen - 1) {
              newArr1_withData.forEach((e) => {
                if (
                  e.dataLength == maxNumberOfThisArray &&
                  how_manyTimesMaxNumber < 1
                ) {
                  how_manyTimesMaxNumber++;

                  this.processing_Prev_users_chats = true;

                  socket.emit("getRealDatabase", {
                    data: e.dataID,
                    from: userID1,
                  });
                }
              });
            }
          }
        }
      );

      //getRealDatabase
      socket.on("getRealDatabase", ({ data, from }) => {
        if (data == userID1) {
          //
          //allTypeOfMessagesTxtFormCollection
          for (
            let index = 0;
            index < allTypeOfMessagesTxtFormCollection.length;
            index++
          ) {
            const elm1 = allTypeOfMessagesTxtFormCollection[index];

            socket.emit("okgettingRealDatabase", {
              elm1,
              from,
              elm1Length: allTypeOfMessagesTxtFormCollection.length,
            });
          }
        }
      });

      //
      var countOnce1 = 0;
      socket.on("okgettingRealDatabase", ({ elm1, from, elm1Length }) => {
        if (from == userID1) {
          countOnce1++;

          if (elm1.showName != "") {
            allTypeOfMessagesTxtFormCollection.push(elm1);
          } else {
            elm1.showName = elm1.id;
            allTypeOfMessagesTxtFormCollection.push(elm1);
          }

          if (countOnce1 == elm1Length) {
            allTypeOfMessagesTxtFormCollection.forEach((e, e_12) => {
              //e.type == "chat, image, audio"
              if (e.type == "chat") {
                var inside_Show_dateFuc = (display_e) => {
                  if (e.newReply1) {
                    messages.innerHTML += `<div id="notme_Dv"><span style="color:${this.defaultColors_edited.text1}">${e.showName}</span> <div style="color:${this.defaultColors_edited.text1};background:${this.defaultColors_edited.background1};"><p style="font-size:smaller;">reply to <em>${e.newReply1.name}</em><br>${e.newReply1.message}</p><pre>${e.message}</pre><p class="show_date_p" style="display: ${display_e}; font-size: 14px;">${e.date}</p></div></div>`;
                  } else {
                    messages.innerHTML += `<div id="notme_Dv"><span style="color:${this.defaultColors_edited.text1}">${e.showName}</span> <div style="color:${this.defaultColors_edited.text1};background:${this.defaultColors_edited.background1};"><pre>${e.message}</pre><p class="show_date_p" style="display: ${display_e}; font-size: 14px;">${e.date}</p></div></div>`;
                  }
                };

                //none
                inside_Show_dateFuc("none");
              } else if (e.type == "image") {
                var imgE1 = document.createElement("img");
                imgE1.style = "width: 100%;";
                imgE1.src = `${e.message}`;

                var messages_N = document.querySelector("#messages");

                //date node
                var n_div2_pEl = document.createElement("p");
                n_div2_pEl.setAttribute("class", "show_date_p");
                n_div2_pEl.setAttribute("style", "display:none;font-size:14px");

                var dateTxtNode = document.createTextNode(e.date);
                n_div2_pEl.appendChild(dateTxtNode);

                var n_div3 = document.createElement("div");
                n_div3.id = "notme_Dv";
                var spn_1 = document.createElement("span");
                var ckeck_var = e.showName;

                var txtNode = document.createTextNode(ckeck_var);

                spn_1.appendChild(txtNode);
                spn_1.style = `color:${this.defaultColors_edited.text1}`;

                n_div3.appendChild(spn_1);

                var n_div4 = document.createElement("div");
                n_div4.id = "extra_div_style_for_image";
                n_div4.style = `background:${this.defaultColors_edited.background1}`;

                if (e.newReply1) {
                  var adtextandMore = `<p style="font-size:smaller;">reply to <em>${e.newReply1.name}</em><br>${e.newReply1.message}</p>`;
                  n_div4.innerHTML += adtextandMore;
                }

                n_div4.appendChild(imgE1);
                n_div4.appendChild(n_div2_pEl);
                n_div3.appendChild(n_div4);

                messages_N.appendChild(n_div3);
              } else if (e.type == "audio") {
                var audio = document.createElement("audio");
                audio.src = e.message;
                audio.style = "max-width:100%";
                audio.controls = "controls";

                var messages_N = document.querySelector("#messages");

                var n_div2_pEl = document.createElement("p");
                n_div2_pEl.setAttribute("class", "show_date_p");
                n_div2_pEl.setAttribute("style", "display:none;font-size:14px");

                var dateTxtNode = document.createTextNode(e.date);
                n_div2_pEl.appendChild(dateTxtNode);

                var n_div3 = document.createElement("div");
                n_div3.id = "notme_Dv";
                var spn_1 = document.createElement("span");
                var ckeck_var = e.showName;

                var txtNode = document.createTextNode(ckeck_var);

                spn_1.appendChild(txtNode);
                spn_1.style = `color:${this.defaultColors_edited.text1}`;

                n_div3.appendChild(spn_1);

                var n_div4 = document.createElement("div");
                n_div4.id = "extra_div_style_for_image1";
                n_div4.style = `background:${this.defaultColors_edited.background1}`;

                if (e.newReply1) {
                  var adtextandMore = `<p style="font-size:smaller;">reply to <em>${e.newReply1.name}</em><br>${e.newReply1.message}</p>`;
                  n_div4.innerHTML += adtextandMore;
                }

                n_div4.appendChild(audio);
                n_div4.appendChild(n_div2_pEl);
                n_div3.appendChild(n_div4);

                messages_N.appendChild(n_div3);
              }

              if (e_12 + 1 == allTypeOfMessagesTxtFormCollection.length) {
                setTimeout(() => {
                  scroll_and_sound();
                }, 100);

                //processing_Prev_users_chats
                this.processing_Prev_users_chats = false;
              }
            });
          }
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

        //image
        if (this.sending_AN_IMG1.mby2 == userID) {
          this.sending_AN_IMG = false;
        }

        //audio
        if (this.sending_AN_AUDIO1.mby2 == userID) {
          this.sending_AN_AUDIO = false;
        }
      });

      socket.on("typing", (data) => {
        if (data != null) {
          if (matchDataName.length == 0) {
            typing.innerHTML = `<p id="tp_ing" style="font-weight:500;color:${this.defaultColors_edited.text1}"><em>${data}</em> is tpying a message..</p>`;
            matchDataName.push(data);
          } else {
            if (!matchDataName.includes(data)) {
              typing.innerHTML += `<p id="tp_ing" style="font-weight:500;color:${this.defaultColors_edited.text1}"><em>${data}</em> is tpying a message..</p>`;
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

      //send pictures
      socket.on("clicked_send_img", ({ data1, data2 }) => {
        this.sending_AN_IMG = data1;
        this.sending_AN_IMG1 = data2;
      });

      //send audio
      socket.on("clicked_send_audio", ({ data1, data2 }) => {
        this.sending_AN_AUDIO = data1;
        this.sending_AN_AUDIO1 = data2;

        local_sending_AN_AUDIO = this.sending_AN_AUDIO;
      });

      //removeAmessage
      socket.on("removeAmessage", (data) => {
        var newArrayAllColl = [];
        allTypeOfMessagesTxtFormCollection.forEach((e_1, e_2) => {
          if (data != e_2) {
            newArrayAllColl.push(e_1);
          }

          if (data == e_2) {
            var newQ1 = document.querySelector("#messages").children;

            for (let index = 0; index < newQ1.length; index++) {
              const element = newQ1[index];

              for (let index = 0; index < element.children.length; index++) {
                const element1 = element.children[index];

                for (let index = 0; index < element1.children.length; index++) {
                  const element2 = element1.children[index];

                  if (element2.nodeName == "P") {
                    if (e_1.date == element2.innerText) {
                      element2.parentNode.parentNode.remove();
                    }
                  }
                }
              }
            }
          }

          if (e_2 + 1 == allTypeOfMessagesTxtFormCollection.length) {
            allTypeOfMessagesTxtFormCollection = newArrayAllColl;
          }
        });
      });

      //all type messages

      socket.on(
        "chat",
        ({ nameValue, messageValue, io_id, current_eFOR_RPLY }) => {
          var d = new Date();
          var inside_Show_dateFuc;

          if (current_eFOR_RPLY != undefined) {
            var curtShowNm;
            var slicedMessage;

            if (io_id == userID1) {
              this.youAreRPLY_ing = false;
              this_youAreRPLY_ing = false;
            }

            if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].showName !=
              ""
            ) {
              curtShowNm = `${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].showName}`;
            } else {
              curtShowNm = `${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].id}`;
            }

            if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "chat"
            ) {
              slicedMessage = `${allTypeOfMessagesTxtFormCollection[
                current_eFOR_RPLY
              ].message.slice(0, 35)}..`;
            } else if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "image"
            ) {
              slicedMessage = `<img style="width:50px;" src="${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].message}">`;
            } else if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "audio"
            ) {
              slicedMessage = `<audio style="max-width: 250px;" src="${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].message}" controls>`;
            }

            //curtShowNm, slicedMessage
            var newReply1 = {
              name: curtShowNm,
              message: slicedMessage,
            };

            inside_Show_dateFuc = (e) => {
              var commonDatabaseInputFunc = (dc_1, dc_2) => {
                allTypeOfMessagesTxtFormCollection.push({
                  newReply1,
                  id: dc_1,
                  message: messageValue,
                  type: "chat",
                  showName: dc_2,
                  date: `${d.getFullYear()}/${
                    d.getMonth() + 1
                  }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
                });
              };

              if (io_id != userID1) {
                var matchededio_ID = false;
                this.showCurrentUsers.forEach((e_1, i_1) => {
                  if (e_1.id == io_id) {
                    matchededio_ID = true;

                    commonDatabaseInputFunc(io_id, e_1.showName);
                  }

                  if (i_1 + 1 == this.showCurrentUsers.length) {
                    if (matchededio_ID == false) {
                      allTypeOfMessagesTxtFormCollection.push({
                        id: io_id,
                        message: messageValue,
                        type: "chat",
                        showName: io_id,
                        date: `${d.getFullYear()}/${
                          d.getMonth() + 1
                        }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
                      });
                    }
                  }
                });

                messages.innerHTML += `<div id="notme_Dv"><span style="color:${
                  this.defaultColors_edited.text1
                }">${nameValue}</span> <div style="color:${
                  this.defaultColors_edited.text1
                };background:${
                  this.defaultColors_edited.background1
                };"><p style="font-size:smaller;">reply to <em>${curtShowNm}</em><br>${slicedMessage}</p><pre>${messageValue}</pre><p class="show_date_p" style="display: ${e}; font-size: 14px;">${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})</p></div></div>`;
              } else {
                document
                  .getElementById("send")
                  .classList.remove("image_send_d1");

                var showNameValues1 =
                  document.getElementById("name").value ||
                  document.getElementById("name1").value;

                commonDatabaseInputFunc(userID1, showNameValues1);

                messages.innerHTML += `<div id="me_Dv"><div style="color:${
                  this.defaultColors_edited.text
                };background:${
                  this.defaultColors_edited.background
                };"><p style="font-size:smaller;">reply to <em>${curtShowNm}</em><br>${slicedMessage}</p><pre>${messageValue}</pre><p class="show_date_p" style="display: ${e}; font-size: 14px;">${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})</p></div></div>`;
              }
            };
          } else {
            var commonDatabaseInputFunc = (dc_1, dc_2) => {
              allTypeOfMessagesTxtFormCollection.push({
                id: dc_1,
                message: messageValue,
                type: "chat",
                showName: dc_2,
                date: `${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
              });
            };

            inside_Show_dateFuc = (e) => {
              if (io_id != userID1) {
                var matchededio_ID = false;

                this.showCurrentUsers.forEach((e_1, i_1) => {
                  if (e_1.id == io_id) {
                    matchededio_ID = true;

                    commonDatabaseInputFunc(io_id, e_1.showName);
                  }

                  if (i_1 + 1 == this.showCurrentUsers.length) {
                    if (matchededio_ID == false) {
                      allTypeOfMessagesTxtFormCollection.push({
                        id: io_id,
                        message: messageValue,
                        type: "chat",
                        showName: io_id,
                        date: `${d.getFullYear()}/${
                          d.getMonth() + 1
                        }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
                      });
                    }
                  }
                });

                messages.innerHTML += `<div id="notme_Dv"><span style="color:${
                  this.defaultColors_edited.text1
                }">${nameValue}</span> <div style="color:${
                  this.defaultColors_edited.text1
                };background:${
                  this.defaultColors_edited.background1
                };"><pre>${messageValue}</pre><p class="show_date_p" style="display: ${e}; font-size: 14px;">${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})</p></div></div>`;
              } else {
                document
                  .getElementById("send")
                  .classList.remove("image_send_d1");

                var showNameValues1 =
                  document.getElementById("name").value ||
                  document.getElementById("name1").value;

                commonDatabaseInputFunc(userID1, showNameValues1);

                messages.innerHTML += `<div id="me_Dv"><div style="color:${
                  this.defaultColors_edited.text
                };background:${
                  this.defaultColors_edited.background
                };"><pre>${messageValue}</pre><p class="show_date_p" style="display: ${e}; font-size: 14px;">${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})</p></div></div>`;
              }
            };
          }

          if (this.show_date == false) {
            //none
            inside_Show_dateFuc("none");
          } else {
            //block
            inside_Show_dateFuc("block");
          }

          typing.innerHTML = "";
          matchDataName = [];

          setTimeout(() => {
            scroll_and_sound();
          }, 100);
        }
      );

      socket.on(
        "getImage",
        ({ image, type, u_id, user_pic_Name, current_eFOR_RPLY }) => {
          var curtShowNm;
          var slicedMessage;
          var adtextandMore;

          if (current_eFOR_RPLY != undefined) {
            if (u_id == userID1) {
              this.youAreRPLY_ing = false;
              this_youAreRPLY_ing = false;
            }

            if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].showName !=
              ""
            ) {
              curtShowNm = `${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].showName}`;
            } else {
              curtShowNm = `${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].id}`;
            }

            if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "chat"
            ) {
              slicedMessage = `${allTypeOfMessagesTxtFormCollection[
                current_eFOR_RPLY
              ].message.slice(0, 35)}..`;
            } else if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "image"
            ) {
              slicedMessage = `<img style="width:50px;" src="${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].message}">`;
            } else if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "audio"
            ) {
              slicedMessage = `<audio style="max-width: 250px;" src="${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].message}" controls>`;
            }

            adtextandMore = `<p style="font-size:smaller;">reply to <em>${curtShowNm}</em><br>${slicedMessage}</p>`;
          }

          //curtShowNm, slicedMessage
          var newReply1 = {
            name: curtShowNm,
            message: slicedMessage,
          };

          var commonDatabaseInputFunc = (dc_1, dc_2) => {
            if (current_eFOR_RPLY != undefined) {
              allTypeOfMessagesTxtFormCollection.push({
                newReply1,
                id: dc_1,
                message: image,
                type: "image",
                showName: dc_2,
                date: `${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
              });
            } else {
              allTypeOfMessagesTxtFormCollection.push({
                id: dc_1,
                message: image,
                type: "image",
                showName: dc_2,
                date: `${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
              });
            }
          };

          var d = new Date();
          // create image with
          if (
            type == "image/jpeg" ||
            type == "image/png" ||
            type == "image/jpg"
          ) {
            var imgE1 = document.createElement("img");
            imgE1.style = "width: 100%;";
            imgE1.src = `${image}`;

            var messages_N = document.querySelector("#messages");

            //date node
            var n_div2_pEl = document.createElement("p");
            n_div2_pEl.setAttribute("class", "show_date_p");

            if (this.show_date == false) {
              n_div2_pEl.setAttribute("style", "display:none;font-size:14px");
            } else {
              n_div2_pEl.setAttribute("style", "display:block;font-size:14px");
            }

            var dateTxtNode = document.createTextNode(
              `${d.getFullYear()}/${
                d.getMonth() + 1
              }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`
            );
            n_div2_pEl.appendChild(dateTxtNode);

            if (u_id == userID1) {
              var showNameValues1 =
                document.getElementById("name").value ||
                document.getElementById("name1").value;

              commonDatabaseInputFunc(userID1, showNameValues1);

              socket.emit("clicked_send_img", {
                data1: false,
                data2: {
                  mby1:
                    document.querySelector("#name").value ||
                    document.querySelector("#name1").value,
                  mby2: userID1,
                },
              });

              var n_div1 = document.createElement("div");
              n_div1.id = "me_Dv";
              var n_div2 = document.createElement("div");
              n_div2.id = "extra_div_style_for_image";
              n_div2.style = `background:${this.defaultColors_edited.background}`;

              if (current_eFOR_RPLY != undefined) {
                n_div2.innerHTML += adtextandMore;
              }

              n_div2.appendChild(imgE1);
              n_div2.appendChild(n_div2_pEl);
              n_div1.appendChild(n_div2);

              messages_N.appendChild(n_div1);

              document.getElementById("fileinput").value = "";

              if (var_hideHTML_1st_one == true) {
                document
                  .querySelectorAll(".image_snd_btn")[1]
                  .classList.remove("image_send_d1");
              } else {
                document
                  .querySelectorAll(".image_snd_btn")[0]
                  .classList.remove("image_send_d1");
              }
            } else {
              var matchededio_ID = false;
              this.showCurrentUsers.forEach((e_1, i_1) => {
                if (e_1.id == u_id) {
                  matchededio_ID = true;

                  commonDatabaseInputFunc(u_id, e_1.showName);
                }

                if (i_1 + 1 == this.showCurrentUsers.length) {
                  if (matchededio_ID == false) {
                    allTypeOfMessagesTxtFormCollection.push({
                      id: u_id,
                      message: image,
                      type: "image",
                      showName: u_id,
                      date: `${d.getFullYear()}/${
                        d.getMonth() + 1
                      }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
                    });
                  }
                }
              });

              var n_div3 = document.createElement("div");
              n_div3.id = "notme_Dv";
              var spn_1 = document.createElement("span");
              var ckeck_var = user_pic_Name || u_id;

              var txtNode = document.createTextNode(ckeck_var);

              spn_1.appendChild(txtNode);
              spn_1.style = `color:${this.defaultColors_edited.text1}`;

              n_div3.appendChild(spn_1);

              var n_div4 = document.createElement("div");
              n_div4.id = "extra_div_style_for_image";
              n_div4.style = `background:${this.defaultColors_edited.background1}`;

              if (current_eFOR_RPLY != undefined) {
                n_div4.innerHTML += adtextandMore;
              }

              n_div4.appendChild(imgE1);
              n_div4.appendChild(n_div2_pEl);
              n_div3.appendChild(n_div4);

              messages_N.appendChild(n_div3);
            }

            setTimeout(() => {
              scroll_and_sound();
            }, 100);
          } else {
            alert("Please insert a png or jpeg file!");
          }
        }
      );

      socket.on(
        "send_audio",
        ({ dataArray, u_id, user_pic_Name, current_eFOR_RPLY }) => {
          var curtShowNm;
          var slicedMessage;
          var adtextandMore;

          if (current_eFOR_RPLY != undefined) {
            if (u_id == userID1) {
              this.youAreRPLY_ing = false;
              this_youAreRPLY_ing = false;
            }

            if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].showName !=
              ""
            ) {
              curtShowNm = `${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].showName}`;
            } else {
              curtShowNm = `${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].id}`;
            }

            if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "chat"
            ) {
              slicedMessage = `${allTypeOfMessagesTxtFormCollection[
                current_eFOR_RPLY
              ].message.slice(0, 35)}..`;
            } else if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "image"
            ) {
              slicedMessage = `<img style="width:50px;" src="${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].message}">`;
            } else if (
              allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].type ==
              "audio"
            ) {
              slicedMessage = `<audio style="max-width: 250px;" src="${allTypeOfMessagesTxtFormCollection[current_eFOR_RPLY].message}" controls>`;
            }

            adtextandMore = `<p style="font-size:smaller;">reply to <em>${curtShowNm}</em><br>${slicedMessage}</p>`;
          }

          //curtShowNm, slicedMessage
          var newReply1 = {
            name: curtShowNm,
            message: slicedMessage,
          };

          var commonDatabaseInputFunc = (dc_1, dc_2, dc_3) => {
            if (current_eFOR_RPLY != undefined) {
              allTypeOfMessagesTxtFormCollection.push({
                newReply1,
                id: dc_1,
                message: dc_3,
                type: "audio",
                showName: dc_2,
                date: `${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
              });
            } else {
              allTypeOfMessagesTxtFormCollection.push({
                id: dc_1,
                message: dc_3,
                type: "audio",
                showName: dc_2,
                date: `${d.getFullYear()}/${
                  d.getMonth() + 1
                }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
              });
            }
          };

          var d = new Date();

          const reader = new FileReader();
          var blob1 = new Blob(dataArray, { type: "audio/mp3;" });

          reader.readAsDataURL(blob1);

          reader.onloadend = () => {
            var audio = document.createElement("audio");
            audio.src = reader.result;
            audio.style = "max-width:100%";
            audio.controls = "controls";

            //---------------------------------
            var messages_N = document.querySelector("#messages");

            var n_div2_pEl = document.createElement("p");
            n_div2_pEl.setAttribute("class", "show_date_p");

            if (this.show_date == false) {
              n_div2_pEl.setAttribute("style", "display:none;font-size:14px");
            } else {
              n_div2_pEl.setAttribute("style", "display:block;font-size:14px");
            }

            var dateTxtNode = document.createTextNode(
              `${d.getFullYear()}/${
                d.getMonth() + 1
              }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`
            );

            n_div2_pEl.appendChild(dateTxtNode);

            if (u_id == userID1) {
              var showNameValues1 =
                document.getElementById("name").value ||
                document.getElementById("name1").value;

              commonDatabaseInputFunc(userID1, showNameValues1, reader.result);

              //clicked_send_audio
              this.sending_AN_AUDIO = false;
              local_sending_AN_AUDIO = false;

              socket.emit("clicked_send_audio", {
                data1: false,
                data2: {
                  mby1:
                    document.querySelector("#name").value ||
                    document.querySelector("#name1").value,
                  mby2: userID1,
                },
              });

              if (var_hideHTML_1st_one == true) {
                document
                  .querySelector("#current_users1 #btnStartUp")
                  .classList.remove("image_send_d1");
              } else {
                document
                  .querySelector("#current_users #btnStartUp")
                  .classList.remove("image_send_d1");
              }

              var n_div1 = document.createElement("div");
              n_div1.id = "me_Dv";
              var n_div2 = document.createElement("div");
              n_div2.id = "extra_div_style_for_image1";
              n_div2.style = `background:${this.defaultColors_edited.background}`;

              if (current_eFOR_RPLY != undefined) {
                n_div2.innerHTML += adtextandMore;
              }

              n_div2.appendChild(audio);
              n_div2.appendChild(n_div2_pEl);
              n_div1.appendChild(n_div2);

              messages_N.appendChild(n_div1);
            } else {
              var matchededio_ID = false;

              this.showCurrentUsers.forEach((e_1, i_1) => {
                if (e_1.id == u_id) {
                  matchededio_ID = true;

                  commonDatabaseInputFunc(u_id, e_1.showName, reader.result);
                }

                if (i_1 + 1 == this.showCurrentUsers.length) {
                  if (matchededio_ID == false) {
                    allTypeOfMessagesTxtFormCollection.push({
                      id: u_id,
                      message: reader.result,
                      type: "audio",
                      showName: u_id,
                      date: `${d.getFullYear()}/${
                        d.getMonth() + 1
                      }/${d.getDate()} | ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}(${d.getMilliseconds()})`,
                    });
                  }
                }
              });

              var n_div3 = document.createElement("div");
              n_div3.id = "notme_Dv";
              var spn_1 = document.createElement("span");
              var ckeck_var = user_pic_Name || u_id;

              var txtNode = document.createTextNode(ckeck_var);

              spn_1.appendChild(txtNode);
              spn_1.style = `color:${this.defaultColors_edited.text1}`;

              n_div3.appendChild(spn_1);

              var n_div4 = document.createElement("div");
              n_div4.id = "extra_div_style_for_image1";
              n_div4.style = `background:${this.defaultColors_edited.background1}`;

              if (current_eFOR_RPLY != undefined) {
                n_div4.innerHTML += adtextandMore;
              }

              n_div4.appendChild(audio);
              n_div4.appendChild(n_div2_pEl);
              n_div3.appendChild(n_div4);

              messages_N.appendChild(n_div3);
            }

            setTimeout(() => {
              scroll_and_sound();
            }, 100);
          };
        }
      );
    },
  },

  mounted() {
    this.inerValCkForagr();
    this.E_after_Load();
  },
};

Vue.createApp(app).mount("#app");
