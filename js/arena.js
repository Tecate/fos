// var channelURL = "https://api.are.na/v2/channels/783951"; // floats-my-boat
var channelURL = "https://api.are.na/v2/channels/1691884"; // 1 of each block type
// var channelURL = "https://api.are.na/v2/channels/782953"; // random
// var channelURL = "https://api.are.na/v2/channels/783913"; // random example with channels and blocks (no blocks with class == image so nothing renders)
var blockCount = 20;
var urlParams = "?per=" + blockCount;
var combinedURL = channelURL + urlParams;
var channelLength;
// var perPage;

function buildDesktop(url) {
  console.log("buildDesktop")
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
      // channelLength = data.length;
      // perPage = Math.floor(channelLength/data.contents.length);
      // console.log(perPage);

      if (data.base_class == "Channel") { // make sure that the request is for a channel
        for (var i = 0; i < data.contents.length; i++) {
          if (data.contents[i].class == "Image") {
            buildImage(data, i)
          } else if (data.contents[i].class == "Channel") {
            buildChannel(data, i)
          } else if (data.contents[i].class == "Text") {
            buildText(data, i)
          } else if (data.contents[i].class == "Link") {
            buildLink(data, i)
          } else if (data.contents[i].class == "Media") {
            buildMedia(data, i)
          } else if (data.contents[i].class == "Attachment") {
            buildAttachment(data, i)
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
    } else {
      console.log("you are not requesting a channel")
    }
    });
}

buildDesktop(combinedURL);

function buildImage(data, i) {
  var iconContainer = document.createElement("fos-icon");
  iconContainer.setAttribute("href", "arena-" + data.contents[i].id);
  var newIcon = document.createElement("img");
  newIcon.src = data.contents[i].image.square.url;
  iconContainer.appendChild(newIcon);
  var newTitle = document.createTextNode(data.contents[i].id);
  iconContainer.appendChild(newTitle);
  document.getElementById("desktop").appendChild(iconContainer);

  var newFoswindow = document.createElement("fos-window");
  newFoswindow.name = "arena-" + data.contents[i].id;
  newFoswindow.icon = "img/favicon.gif";
  newFoswindow.setAttribute("fixedsize", "");
  newFoswindow.setAttribute("fostitle", data.contents[i].title);
  // display using image element
  // var newFoswindowContent = document.createElement("img");
  // newFoswindowContent.src = data.contents[i].image.square.url;
  // newFoswindow.appendChild(newFoswindowContent);

  // display using custom arena-image element
  var newImage = document.createElement("arena-image");
  newImage._data = data.contents[i];
  // console.log("arena-image _data:", newImage._data);
  newFoswindow.appendChild(newImage)

  document.getElementById("desktop").appendChild(newFoswindow);
}

function buildText(data, i) {
  var iconContainer = document.createElement("fos-icon");
  iconContainer.setAttribute("href", "arena-" + data.contents[i].id);
  var newIcon = document.createElement("img");
  newIcon.src = "img/textblock.png";
  iconContainer.appendChild(newIcon);
  var newTitle = document.createTextNode(data.contents[i].id);
  iconContainer.appendChild(newTitle);
  document.getElementById("desktop").appendChild(iconContainer);

  var newFoswindow = document.createElement("fos-window");
  newFoswindow.name = "arena-" + data.contents[i].id;
  newFoswindow.icon = "img/favicon.gif";
  newFoswindow.setAttribute("fixedsize", "");
  newFoswindow.setAttribute("fostitle", data.contents[i].title);

  // display using custom arena-image element
  var newText = document.createElement("arena-text");
  newText._data = data.contents[i];
  // console.log("arena-image _data:", newText._data);
  newFoswindow.appendChild(newText)

  document.getElementById("desktop").appendChild(newFoswindow);
}

function buildLink(data, i) {
  var iconContainer = document.createElement("fos-icon");
  iconContainer.setAttribute("href", "arena-" + data.contents[i].id);
  var newIcon = document.createElement("img");
  newIcon.src = "img/linkblock.png";
  iconContainer.appendChild(newIcon);
  var newTitle = document.createTextNode(data.contents[i].generated_title);
  iconContainer.appendChild(newTitle);
  document.getElementById("desktop").appendChild(iconContainer);

  var newFoswindow = document.createElement("fos-window");
  newFoswindow.name = "arena-" + data.contents[i].id;
  newFoswindow.icon = "img/favicon.gif";
  newFoswindow.setAttribute("fixedsize", "");
  newFoswindow.setAttribute("fostitle", data.contents[i].title);

  // display using custom arena-image element
  var newLink = document.createElement("arena-link");
  newLink._data = data.contents[i];
  // console.log("arena-image _data:", newLink._data);
  newFoswindow.appendChild(newLink)

  document.getElementById("desktop").appendChild(newFoswindow);
}

function buildMedia(data, i) {
  var iconContainer = document.createElement("fos-icon");
  iconContainer.setAttribute("href", "arena-" + data.contents[i].id);
  var newIcon = document.createElement("img");
  newIcon.src = "img/mediablock.png";
  iconContainer.appendChild(newIcon);
  var newTitle = document.createTextNode(data.contents[i].generated_title);
  iconContainer.appendChild(newTitle);
  document.getElementById("desktop").appendChild(iconContainer);

  var newFoswindow = document.createElement("fos-window");
  newFoswindow.name = "arena-" + data.contents[i].id;
  newFoswindow.icon = "img/favicon.gif";
  newFoswindow.setAttribute("fixedsize", "");
  newFoswindow.setAttribute("fostitle", data.contents[i].title);

  // display using custom arena-image element
  var newMedia = document.createElement("arena-media");
  newMedia._data = data.contents[i];
  // console.log("arena-image _data:", newMedia._data);
  newFoswindow.appendChild(newMedia)

  document.getElementById("desktop").appendChild(newFoswindow);
}

function buildAttachment(data, i) {
  var iconContainer = document.createElement("fos-icon");
  iconContainer.setAttribute("href", "arena-" + data.contents[i].id);
  var newIcon = document.createElement("img");
  newIcon.src = "img/attachmentblock.png";
  iconContainer.appendChild(newIcon);
  var newTitle = document.createTextNode(data.contents[i].generated_title);
  iconContainer.appendChild(newTitle);
  document.getElementById("desktop").appendChild(iconContainer);

  var newFoswindow = document.createElement("fos-window");
  newFoswindow.name = "arena-" + data.contents[i].id;
  newFoswindow.icon = "img/favicon.gif";
  newFoswindow.setAttribute("fixedsize", "");
  newFoswindow.setAttribute("fostitle", data.contents[i].title);

  // display using custom arena-image element
  var newAttachment = document.createElement("arena-attachment");
  newAttachment._data = data.contents[i];
  // console.log("arena-image _data:", newAttachment._data);
  newFoswindow.appendChild(newAttachment)

  document.getElementById("desktop").appendChild(newFoswindow);
}

function buildChannel(data, i) {
  var pageCount = Math.ceil(data.contents[i].length / blockCount);

  var iconContainer = document.createElement("fos-icon");
  iconContainer.setAttribute("href", "arena-" + data.contents[i].id);

  var newIcon = document.createElement("img");
  newIcon.src = "img/postit32.png";
  iconContainer.appendChild(newIcon);

  var newTitle = document.createTextNode(data.contents[i].title);
  iconContainer.appendChild(newTitle);
  document.getElementById("desktop").appendChild(iconContainer);

  var newFoswindow = document.createElement("fos-window");
  newFoswindow.name = "arena-" + data.contents[i].id;
  newFoswindow.icon = "img/favicon.gif";
  newFoswindow.setAttribute("fixedsize", "");
  newFoswindow.setAttribute("fostitle", `Channel: ${data.contents[i].title}, ${pageCount} pages`);



  // var arenaLink = `https://are.na/${data.contents[i].owner_slug}/${data.contents[i].slug}`
  // var arenaLinkEl = document.createElement("a");
  // arenaLinkEl.href = arenaLink;
  // arenaLinkEl.innerText = arenaLink;
  // arenaLinkEl.target = "_blank";
  // arenaLinkEl.style.display = "block";
  // newFoswindow.appendChild(arenaLinkEl)

  var newChannel = document.createElement("fos-channel");
  newChannel._data = data.contents[i];
  // console.log(newChannel._data);
  newFoswindow.appendChild(newChannel)

  // var loadButton = document.createElement("button");
  // var page = 1;
  // loadButton.innerText = `Load page ${page}/${pageCount} to desktop`;
  // var channelURL = "https://api.are.na/v2/channels/" + data.contents[i].id;
  // newFoswindow.appendChild(loadButton);

  // loadButton.onclick = function() {
  //   buildDesktop(channelURL + "?page=" + page);
  //   if (page < pageCount) {
  //     page += 1;
  //     loadButton.innerText = `Load page ${page}/${pageCount} to desktop`;
  //   } else {
  //     loadButton.innerText = "nothing more to load";
  //     loadButton.onclick = function() {}
  //   }
  // }

  document.getElementById("desktop").appendChild(newFoswindow);
}

var iconContainer = document.createElement("fos-icon");
iconContainer.setAttribute("href", "settings");
var newIcon = document.createElement("img");
newIcon.src = "img/coke32.gif";
iconContainer.appendChild(newIcon);
var newTitle = document.createTextNode("SETTINGS");
iconContainer.appendChild(newTitle);
document.getElementById("desktop").appendChild(iconContainer);

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
    buildDesktop(textareaChannel.value);
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

// close top window with w key
document.addEventListener('keydown', function(e){
  if(e.key === 'w') {
    document.querySelector(`fos-window[name=${document.getElementById("desktop").windowStack[0]}] `).close();
  }
})
