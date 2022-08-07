var channelURL = "https://api.are.na/v2/channels/783951";
// var channelURL = "https://api.are.na/v2/channels/782953"; // random
// var channelURL = "https://api.are.na/v2/channels/783913"; // random example with channels and blocks (no blocks with class == image so nothing renders)
var blockCount = 10;
var urlParams = "per=" + blockCount;
var combinedURL = channelURL;
var channelLength;

function getArena(url) {
  console.log("getarena")
  fetch(url)
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      if (response.ok == false)
        document.getElementById("error").innerText =
          "private block: " + response.status;
      return response.json();
    })
    .then((data) => {
      console.log(data);

      for (var i = 0; i < data.contents.length; i++) {
        if (data.contents[i].class == "Image") {
          var newIconContainer = document.createElement("fos-icon");
          newIconContainer.setAttribute("href", "arena-" + data.contents[i].id);
          var newIcon = document.createElement("img");
          newIcon.src = data.contents[i].image.square.url;
          newIconContainer.appendChild(newIcon);
          var newTitle = document.createTextNode(data.contents[i].id);
          newIconContainer.appendChild(newTitle);
          document.getElementById("desktop").appendChild(newIconContainer);

          var newFoswindow = document.createElement("fos-window");
          newFoswindow.name = "arena-" + data.contents[i].id;
          newFoswindow.icon = "img/favicon.gif";
          newFoswindow.setAttribute("fixedsize", "");
          newFoswindow.setAttribute("fostitle", data.contents[i].title);
          var newFoswindowContent = document.createElement("img");
          newFoswindowContent.src = data.contents[i].image.square.url;
          newFoswindow.appendChild(newFoswindowContent);
          document.getElementById("desktop").appendChild(newFoswindow);
        }
      }
      // if (data.class == "Image") {
      //     document.getElementById("gotImage").src = data.image.original.url;
      // }
      // if (data.class == "Link") {
      //     document.getElementById("gotLink").href = data.source.url;
      //     document.getElementById("gotLink").innerText = data.source.url;
      //     document.getElementById("gotImage").src = data.image.original.url;
      // }
      // if (data.class == "Text") {
      //     document.getElementById("gotImage").innerHTML = data.content_html;
      // }
    });
}

getArena(combinedURL);

var newIconContainer = document.createElement("fos-icon");
newIconContainer.setAttribute("href", "settings");
var newIcon = document.createElement("img");
newIcon.src = "img/coke32.gif";
newIconContainer.appendChild(newIcon);
var newTitle = document.createTextNode("SETTINGS");
newIconContainer.appendChild(newTitle);
document.getElementById("desktop").appendChild(newIconContainer);

var newFoswindow = document.createElement("fos-window");
newFoswindow.name = "settings";
newFoswindow.icon = "img/favicon.gif";
newFoswindow.setAttribute("fixedsize", "");
newFoswindow.setAttribute("fostitle", "Settings");
document.getElementById("desktop").appendChild(newFoswindow);

var textareaChannel = document.createElement("textarea");
newFoswindow.appendChild(textareaChannel);
textareaChannel.innerText = channelURL;
textareaChannel.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log("enter");
    getArena(textareaChannel.value);
  }
});

// var newFoswindowContent = document.createElement("label");
// newFoswindow.appendChild(newFoswindowContent);
// newFoswindowContent.innerText = "Number of blocks: " + blockCount;

var delButton = document.createElement("button");
newFoswindow.appendChild(delButton);
delButton.innerText = "remove icons";
delButton.addEventListener("click", (e) => {
  var windows = document.querySelectorAll("fos-window");
  var icons = document.querySelectorAll("fos-icon");
  for (const [i, w] of windows.entries()) {
    if (w.name !== "settings") {
      if (w.isOpen)
        w.close();
      w.remove();
    }
    if (icons[i].getAttribute("href") !== "settings") {
      console.log("removed: " + icons[i].getAttribute("href"));
      icons[i].remove();
    }
  }
});

var closeAll = document.createElement("button");
newFoswindow.appendChild(closeAll);
closeAll.innerText = "Close All Windows";
closeAll.addEventListener("click", (e) => {
  var windows = document.querySelectorAll("fos-window");
  for (const w of windows) {
    if (w.isOpen && w.name !== "settings")
    w.close();
  }
});


var openAll = document.createElement("button");
newFoswindow.appendChild(openAll);
openAll.innerText = "Open All Windows";
openAll.addEventListener("click", (e) => {
  var windows = document.querySelectorAll("fos-window");
  for (const w of windows) {
    if (w.name !== "settings")
    w.open();
  }
});

// document.addEventListener('keydown', function(e){
//   if(e.key === 'w')
//   var windows = document.querySelectorAll("fos-window");
//   for (const w of windows) {
//     if (w.classList.contains("active"))
//       w.close();
//   }
// })
