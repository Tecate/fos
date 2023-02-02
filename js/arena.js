import { buildIcon, buildWindow, buildImage, buildText, buildLink, buildMedia, buildAttachment } from "./helpers.js";

// var channelURL = "https://api.are.na/v2/channels/783951"; // floats-my-boat
var channelURL = "https://api.are.na/v2/channels/1691884"; // 1 of each block type
var blockCount = 20;
var urlParams = "?per=" + blockCount;
var combinedURL = channelURL + urlParams;
var channelLength;

function buildDesktop(url) {
  fetch(url)
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      if (response.ok == false)
        console.log("private block: " + response.status);
      return response.json();
    })
    .then((data) => {
      console.log("API call:", data);

      if (data.base_class == "Channel") {
        // make sure that the request is for a channel
        for (var i = 0; i < data.contents.length; i++) {
          if (data.contents[i].class == "Image") {
            buildImage(data.contents[i], true);
          } else if (data.contents[i].class == "Channel") {
            buildChannel(data.contents[i], true);
          } else if (data.contents[i].class == "Text") {
            buildText(data.contents[i], true);
          } else if (data.contents[i].class == "Link") {
            buildLink(data.contents[i], true);
          } else if (data.contents[i].class == "Media") {
            buildMedia(data.contents[i], true);
          } else if (data.contents[i].class == "Attachment") {
            buildAttachment(data.contents[i], true);
          }
        }
      } else {
        console.log("you are not requesting a channel");
      }
    });
}

buildDesktop(combinedURL);


function buildChannel(data) {
  var pageCount = Math.ceil(data.length / blockCount);

  buildIcon(data.id, "img/postit32.png", data.title);

  var fosWindow = buildWindow({
    id: data.id,
    title: `Channel: ${data.title}, ${pageCount} pages`,
    fixedsize: true,
  });

  // display using custom arena-channel element
  var newChannel = document.createElement("fos-channel");
  newChannel._data = data;
  fosWindow.appendChild(newChannel);
  fosWindow.open(); // auto open for testing
}

// create settings window
buildIcon("settings", "img/coke32.gif", "SETTINGS");
var fosWindow = buildWindow({
  id: "settings",
  title: "Settings",
});

var textareaChannel = document.createElement("textarea");
fosWindow.appendChild(textareaChannel);
textareaChannel.innerText = channelURL;
textareaChannel.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log("enter");
    buildDesktop(textareaChannel.value);
  }
});

var delButton = document.createElement("button");
fosWindow.appendChild(delButton);
delButton.innerText = "remove icons";
delButton.addEventListener("click", (e) => {
  var windows = document.querySelectorAll("fos-window");
  var icons = document.querySelectorAll("fos-icon");
  for (const [i, w] of windows.entries()) {
    if (w.name !== "settings") {
      if (w.isOpen) w.close();
      w.remove();
    }
    if (icons[i].getAttribute("href") !== "settings") {
      console.log("removed: " + icons[i].getAttribute("href"));
      icons[i].remove();
    }
  }
});

var closeAll = document.createElement("button");
fosWindow.appendChild(closeAll);
closeAll.innerText = "Close All Windows";
closeAll.addEventListener("click", (e) => {
  var windows = document.querySelectorAll("fos-window");
  for (const w of windows) {
    if (w.isOpen && w.name !== "settings") w.close();
  }
});

var openAll = document.createElement("button");
fosWindow.appendChild(openAll);
openAll.innerText = "Open All Windows";
openAll.addEventListener("click", (e) => {
  var windows = document.querySelectorAll("fos-window");
  for (const w of windows) {
    if (w.name !== "settings") w.open();
  }
});

// close top window with w key
document.addEventListener("keydown", function (e) {
  if (e.key === "w") {
    document
      .querySelector(
        `fos-window[name=${document.getElementById("desktop").windowStack[0]}] `
      )
      .close();
  }
});
