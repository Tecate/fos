export function buildIcon(id, image, title) {
  var icon = document.createElement("fos-icon");
  icon.setAttribute("href", "arena-" + id);
  var iconImage = document.createElement("img");
  iconImage.src = image;
  icon.appendChild(iconImage);
  if (title == undefined) title = id;
  var iconTitle = document.createElement("span");
  iconTitle.innerHTML = title;
  icon.appendChild(iconTitle);
  document.getElementById("desktop").appendChild(icon);
}

export function buildWindow(obj) {
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

export function buildImage(data, makeIcon) {
    if (makeIcon == undefined)
        makeIcon = false;
    if (makeIcon)
        buildIcon(data.id, data.image.square.url);
  
    var fosWindow = buildWindow({
      id: data.id,
      title: data.title,
      fixedsize: true,
    });
  
    // display using custom arena-image element
    var newImage = document.createElement("arena-image");
    newImage._data = data;
    fosWindow.appendChild(newImage);
    return fosWindow;
  }

  
export function buildText(data, makeIcon) {
    if (makeIcon == undefined)
    makeIcon = false;
    if (makeIcon)
        buildIcon(data.id, "img/textblock.png");
  
    var fosWindow = buildWindow({
      id: data.id,
      title: data.title,
      fixedsize: true,
    });
  
    // display using custom arena-text element
    var newText = document.createElement("arena-text");
    newText._data = data;
    fosWindow.appendChild(newText);
    return fosWindow;
  }
  
  export function buildLink(data, makeIcon) {
    if (makeIcon == undefined)
    makeIcon = false;
    if (makeIcon) {
        buildIcon(
        data.id,
        "img/linkblock.png",
        data.generated_title
        );
    }
  
    var fosWindow = buildWindow({
      id: data.id,
      title: data.title,
      fixedsize: true,
    });
  
    // display using custom arena-link element
    var newLink = document.createElement("arena-link");
    newLink._data = data;
    fosWindow.appendChild(newLink);
    return fosWindow;
  }
  
  export function buildMedia(data, makeIcon) {
    if (makeIcon == undefined)
    makeIcon = false;
    if (makeIcon) {
        buildIcon(
        data.id,
        "img/mediablock.png",
        data.generated_title
        );
    }
  
    var fosWindow = buildWindow({
      id: data.id,
      title: data.title,
      fixedsize: true,
    });
  
    // display using custom arena-media element
    var newMedia = document.createElement("arena-media");
    newMedia._data = data;
    fosWindow.appendChild(newMedia);
    return fosWindow;
  }
  
  export function buildAttachment(data, makeIcon) {
    if (makeIcon == undefined)
    makeIcon = false;
    if (makeIcon) {
        buildIcon(
        data.id,
        "img/attachmentblock.png",
        data.generated_title
        );
    }
  
    var fosWindow = buildWindow({
      id: data.id,
      title: data.title,
      fixedsize: true,
    });
  
    // display using custom arena-image element
    var newAttachment = document.createElement("arena-attachment");
    newAttachment._data = data;
    fosWindow.appendChild(newAttachment);
    return fosWindow;
  }

  export function buildChannel(data, makeIcon, blockCount) {
    var pageCount = Math.ceil(data.length / blockCount);

    if (makeIcon == undefined)
    makeIcon = false;
    if (makeIcon) {
        buildIcon(
        data.id,
        "img/postit32.png",
        data.title
        );
    }
  
    var fosWindow = buildWindow({
      id: data.id,
      title: `Channel: ${data.title}, ${pageCount} pages`,
      fixedsize: true,
    });
  
    // display using custom arena-channel element
    var newChannel = document.createElement("fos-channel");
    newChannel._data = data;
    fosWindow.appendChild(newChannel);
    return fosWindow;
  }