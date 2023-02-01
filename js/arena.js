// var channelURL = "https://api.are.na/v2/channels/783951"; // floats-my-boat
var channelURL = "https://api.are.na/v2/channels/1691884"; // 1 of each block type
var blockCount = 20;
var urlParams = "?per=" + blockCount;
var combinedURL = channelURL + urlParams;
var channelLength;

function buildDesktop(url) {
  console.log("buildDesktop");
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
      console.log("API call:", data);

      if (data.base_class == "Channel") {
        // make sure that the request is for a channel
        for (var i = 0; i < data.contents.length; i++) {
          if (data.contents[i].class == "Image") {
            buildImage(data, i);
          } else if (data.contents[i].class == "Channel") {
            buildChannel(data, i);
          } else if (data.contents[i].class == "Text") {
            buildText(data, i);
          } else if (data.contents[i].class == "Link") {
            buildLink(data, i);
          } else if (data.contents[i].class == "Media") {
            buildMedia(data, i);
          } else if (data.contents[i].class == "Attachment") {
            buildAttachment(data, i);
          }
        }
      } else {
        console.log("you are not requesting a channel");
      }
    });
}

buildDesktop(combinedURL);

function buildIcon(id, image, title) {
  var icon = document.createElement("fos-icon");
  icon.setAttribute("href", "arena-" + id);
  var iconImage = document.createElement("img");
  iconImage.src = image;
  icon.appendChild(iconImage);
  if (title == undefined) title = id;
  var iconTitle = document.createTextNode(title);
  icon.appendChild(iconTitle);
  document.getElementById("desktop").appendChild(icon);
}

function buildWindow(obj) {
  /* parameters
  {
    id: mandatory, must be unique,
    title: optional,
    favicon: optional,
    fixedsize: optional
  }
  */

  // defaults
  if (obj.title == undefined) obj.title = "";
  if (obj.fixedsize == undefined) obj.fixedsize = false;
  if (obj.favicon == undefined) obj.favicon = "img/favicon.gif";

  if (obj.id == undefined) {
    alert("you must specify an id when creating a window");
    return;
  }

  var fosWindow = document.createElement("fos-window");
  fosWindow.name = "arena-" + obj.id;
  fosWindow.icon = obj.favicon;
  if (obj.fixedsize) fosWindow.setAttribute("fixedsize", "");
  fosWindow.setAttribute("fostitle", obj.title);

  document.getElementById("desktop").appendChild(fosWindow);
  return fosWindow;
}

function buildImage(data, i) {
  buildIcon(data.contents[i].id, data.contents[i].image.square.url);

  var fosWindow = buildWindow({
    id: data.contents[i].id,
    title: data.contents[i].title,
    fixedsize: true,
  });

  // display using custom arena-image element
  var newImage = document.createElement("arena-image");
  newImage._data = data.contents[i];
  fosWindow.appendChild(newImage);
}

function buildText(data, i) {
  buildIcon(data.contents[i].id, "img/textblock.png");

  var fosWindow = buildWindow({
    id: data.contents[i].id,
    title: data.contents[i].title,
    fixedsize: true,
  });

  // display using custom arena-text element
  var newText = document.createElement("arena-text");
  newText._data = data.contents[i];
  fosWindow.appendChild(newText);
}

function buildLink(data, i) {
  buildIcon(
    data.contents[i].id,
    "img/linkblock.png",
    data.contents[i].generated_title
  );

  var fosWindow = buildWindow({
    id: data.contents[i].id,
    title: data.contents[i].title,
    fixedsize: true,
  });

  // display using custom arena-link element
  var newLink = document.createElement("arena-link");
  newLink._data = data.contents[i];
  fosWindow.appendChild(newLink);
}

function buildMedia(data, i) {
  buildIcon(
    data.contents[i].id,
    "img/mediablock.png",
    data.contents[i].generated_title
  );

  var fosWindow = buildWindow({
    id: data.contents[i].id,
    title: data.contents[i].title,
    fixedsize: true,
  });

  // display using custom arena-media element
  var newMedia = document.createElement("arena-media");
  newMedia._data = data.contents[i];
  fosWindow.appendChild(newMedia);
}

function buildAttachment(data, i) {
  buildIcon(
    data.contents[i].id,
    "img/attachmentblock.png",
    data.contents[i].generated_title
  );

  var fosWindow = buildWindow({
    id: data.contents[i].id,
    title: data.contents[i].title,
    fixedsize: true,
  });

  // display using custom arena-image element
  var newAttachment = document.createElement("arena-attachment");
  newAttachment._data = data.contents[i];
  fosWindow.appendChild(newAttachment);
}

function buildChannel(data, i) {
  var pageCount = Math.ceil(data.contents[i].length / blockCount);

  buildIcon(data.contents[i].id, "img/postit32.png", data.contents[i].title);

  var fosWindow = buildWindow({
    id: data.contents[i].id,
    title: `Channel: ${data.contents[i].title}, ${pageCount} pages`,
    fixedsize: true,
  });

  // display using custom arena-channel element
  var newChannel = document.createElement("fos-channel");
  newChannel._data = data.contents[i];
  fosWindow.appendChild(newChannel);
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
