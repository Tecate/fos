var channelURL = "https://api.are.na/v2/channels/783951?per=100"

fetch(channelURL)
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
    // console.log(data);
    // document.getElementById("gotTitle").innerText = data.class + ": " + data.title;
    // document.getElementById("gotId").innerText = data.id;

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
newFoswindow.setAttribute("fostitle", "settings fostitle");
var newFoswindowContent = document.createElement("div");
newFoswindowContent.innerText = "are.na channel: " + channelURL;
newFoswindow.appendChild(newFoswindowContent);
document.getElementById("desktop").appendChild(newFoswindow);