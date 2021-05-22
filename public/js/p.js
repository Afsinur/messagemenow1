var fileinput = document.getElementById("fileinput");

var max_width = fileinput.getAttribute("data-maxwidth");
var max_height = fileinput.getAttribute("data-maxheight");

var preview = document.getElementById("preview");

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
    //preview.appendChild(image); // preview commented out, I am using the canvas instead
    image.onload = function () {
      // have to wait till it's loaded
      resizeMe(image, file);
      //var resized = resizeMe(image); // send it to canvas

      //var newinput = document.createElement("img");
      //newinput.style = "width:100px";
      //newinput.src = resized; // put result from canvas into new hidden input
      //newinput
      //form.appendChild(newinput);
    };
  };
}

function readfiles(files) {
  // remove the existing canvases and hidden inputs if user re-selects new pics
  var existinginputs = document.getElementsByName("images[]");
  var existingcanvases = document.getElementsByTagName("canvas");
  while (existinginputs.length > 0) {
    // it's a live list so removing the first element each time
    // DOMNode.prototype.remove = function() {this.parentNode.removeChild(this);}
    form.removeChild(existinginputs[0]);
    preview.removeChild(existingcanvases[0]);
  }

  for (var i = 0; i < files.length; i++) {
    processfile(files[i]); // process each file at once
  }
  //fileinput.value = ""; //remove the original files from fileinput
  // TODO remove the previous hidden inputs if user selects other files
}

// this is where it starts. event triggered when user selects files
fileinput.onchange = function () {
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    alert("The File APIs are not fully supported in this browser.");
    return false;
  }
  document.querySelector(".image_snd_btn").classList.add("image_send_d1");

  if (
    this.files[0].type == "image/jpeg" ||
    this.files[0].type == "image/png" ||
    this.files[0].type == "image/jpg"
  ) {
    if (this.files[0].size <= 25000000) {
      socket.emit("clicked_send_img", {
        data1: true,
        data2: {
          mby1: document.querySelector("#inputDiv #name").value,
          mby2: userID1,
        },
      });

      /*socket.emit("image", {
              image: this.files[0],
              type: this.files[0].type,
              u_id: userID1,
              user_pic_Name: this_user_for_image_Name.value,
              fileName: this.files[0].name,
            });*/

      readfiles(fileinput.files);
    } else {
      document.getElementById("fileinput").value = "";

      document
        .querySelector(".image_snd_btn")
        .classList.remove("image_send_d1");

      alert("Maximum file size around 25MB!");
    }
  } else {
    document.getElementById("fileinput").value = "";

    document.querySelector(".image_snd_btn").classList.remove("image_send_d1");

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
  socket.emit("image", {
    image: canvas.toDataURL("image/jpeg", 0.7),
    type: file.type,
    u_id: userID1,
    user_pic_Name: document.querySelector("#inputDiv #name").value,
    fileName: file.name,
  });
  //preview.appendChild(canvas); // do the actual resized preview

  //return canvas.toDataURL("image/jpeg", 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)
}
