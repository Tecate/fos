export function buildIcon(id, image, title) {
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