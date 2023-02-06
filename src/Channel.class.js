import {
  buildImage,
  buildChannel,
  buildText,
  buildLink,
  buildMedia,
  buildAttachment,
} from "../js/helpers.js";

class Channel extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._data = [];
    this.firstRun = true;
    this.blockCount = 20;
  }

  loadChannel(url, element) {
    element.querySelectorAll('.channel-row').forEach(function(row) {
      row.style.visibility = "hidden";
    });
    var loading = document.createElement("div");
    loading.id = "loading";
    loading.innerHTML = "Loading...";
    element.appendChild(loading);
    
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
        element.innerHTML = ""; // clear loading element
        this._data = data;
        var blockCount = this.blockCount;
        for (var i = 0; i < data.contents.length; i++) {
          var row = document.createElement("div");
          row.classList.add("channel-row");
          row._data = data.contents[i];

          if (data.contents[i].class == "Image") {
            row.innerHTML +=
              '<span><img src="img/16x16/camera.png" alt="Image"></span>';
            row.ondblclick = function () {
              if (
                document.querySelector(
                  `fos-window[name="arena-${this._data.id}"]`
                ) == undefined
              ) {
                var fosWindow = buildImage(this._data, false);
                fosWindow.open();
              } else {
                document
                  .querySelector(`fos-window[name="arena-${this._data.id}"]`)
                  .open();
              }
            };
          } else if (data.contents[i].class == "Channel") {
            row.innerHTML +=
              '<span><img src="img/16x16/folder.png" alt="Channel"></span>';
            row.ondblclick = function () {
              if (
                document.querySelector(
                  `fos-window[name="arena-${this._data.id}"]`
                ) == undefined
              ) {
                var fosWindow = buildChannel(this._data, false, blockCount);
                fosWindow.open();
              } else {
                document
                  .querySelector(`fos-window[name="arena-${this._data.id}"]`)
                  .open();
              }
            };
          } else if (data.contents[i].class == "Text") {
            row.innerHTML +=
              '<span><img src="img/16x16/text.png" alt="Text"></span>';
            row.ondblclick = function () {
              if (
                document.querySelector(
                  `fos-window[name="arena-${this._data.id}"]`
                ) == undefined
              ) {
                var fosWindow = buildText(this._data, false);
                fosWindow.open();
              } else {
                document
                  .querySelector(`fos-window[name="arena-${this._data.id}"]`)
                  .open();
              }
            };
          } else if (data.contents[i].class == "Link") {
            row.innerHTML +=
              '<span><img src="img/16x16/link.png" alt="Link"></span>';
            row.ondblclick = function () {
              if (
                document.querySelector(
                  `fos-window[name="arena-${this._data.id}"]`
                ) == undefined
              ) {
                var fosWindow = buildLink(this._data, false);
                fosWindow.open();
              } else {
                document
                  .querySelector(`fos-window[name="arena-${this._data.id}"]`)
                  .open();
              }
            };
          } else if (data.contents[i].class == "Media") {
            row.innerHTML +=
              '<span><img src="img/16x16/media2.png" alt="Media"></span>';
            row.ondblclick = function () {
              if (
                document.querySelector(
                  `fos-window[name="arena-${this._data.id}"]`
                ) == undefined
              ) {
                var fosWindow = buildMedia(this._data, false);
                fosWindow.open();
              } else {
                document
                  .querySelector(`fos-window[name="arena-${this._data.id}"]`)
                  .open();
              }
            };
          } else if (data.contents[i].class == "Attachment") {
            row.innerHTML +=
              '<span><img src="img/arena-small.png" alt="Attachment"></span>';
            row.ondblclick = function () {
              if (
                document.querySelector(
                  `fos-window[name="arena-${this._data.id}"]`
                ) == undefined
              ) {
                var fosWindow = buildAttachment(this._data, false);
                fosWindow.open();
              } else {
                document
                  .querySelector(`fos-window[name="arena-${this._data.id}"]`)
                  .open();
              }
            };
          } else {
            row.innerHTML += `<span class="class">${data.contents[i].class}</span>`;
          }
          // row.innerHTML += ` <span class="id">${data.contents[i].id}</span>`;
          if (data.contents[i].title == "")
            row.innerHTML += ` <span class="title">Untitled</span>`;
          else
            row.innerHTML += ` <span class="title">${data.contents[i].title}</span>`;
          row.innerHTML += ` <button class="button-save"><img src="img/16x16/briefcase-1.png"></span>`;

          element.appendChild(row);
        }
        this.parentElement.bringInbounds();
        console.log("API call:", this._data);
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  // static get observedAttributes() {
  //   return ["title", "id"];
  // }

  // get title() {
  //   return this.hasAttribute("title") ? this.getAttribute("title") : null;
  // }

  // set title(val) {
  //   if (val) this.setAttribute("title", val);
  //   else this.removeAttribute("title");
  // }

  // get id() {
  //     return this.hasAttribute("id") ? this.getAttribute("id") : null;
  // }

  // set id(val) {
  //     if (val) this.setAttribute("id", val);
  //     else this.removeAttribute("id");
  // }

  set data(value) {
    this._data = value;
  }

  get data() {
    return this._data;
  }

  render() {
    this.shadow.innerHTML = `
          <style>
              :host{
                  display: block;
                  width: 100%;
                  height: 100%;
                  border: 1px solid grey;
                  box-sizing: border-box;
                  /*color: black;
                  font-smooth: never;
                  font-family: 'Pixel Arial 11';
                  font-size: 8px;*/
              }

              .inset {
                box-shadow: rgb(255, 255, 255) -1px -1px 0px 0px inset, rgb(128, 128, 128) 1px 1px 0px 0px inset;
                margin: 2px;
                padding: 2px;
              }

              select {
                padding: 3px 4px;
                border: none;
                box-shadow: inset -1px -1px #ffffff,
                  inset 1px 1px #808080, inset -2px -2px #DFDFDF,
                  inset 2px 2px #0A0A0A;
                background-color: #ffffff;
                box-sizing: border-box;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                position: relative;
                padding-right: 32px;
                background-image: url("img/16x16/button-down.svg");
                background-position: top 2px right 2px;
                background-repeat: no-repeat;
                border-radius: 0;
                }

              select:focus {
                outline: none;
              }

              #channel-header {
                display: flex;
              }

              #footer {
                display: flex;
                align-items: center;
                height: 19px;
              }

              #footer span {flex-grow: 1}

              .button {
                display: inline-block;
                box-shadow: inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf;
                border: 0px solid black;
                padding: 2px;
              }

              #channel-contents {
                margin: 2px;
                padding: 4px;
                width: 350px;
                min-height: 200px;
                overflow-y: scroll;
                box-shadow: rgb(255, 255, 255) -1px -1px 0px 0px inset, rgb(128, 128, 128) 1px 1px 0px 0px inset, rgb(223, 223, 223) -2px -2px 0px 0px inset, rgb(10, 10, 10) 2px 2px 0px 0px inset;
              }

              .channel-row .title {
                overflow-wrap: break-word;
                word-break: break-all;
              }

              .channel-row {
                display: flex;
              }

              .channel-row span {
                margin-right: 5px;
              }

              .channel-row:hover {
                background: lightgrey;
              }

              .button-save {
                order: 2;
                padding: 0px;
                margin-left: auto;
                border: 0px solid black;
                background: none;
              }

              #loading {
                position: absolute;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                margin: auto;
                width: 80px;
                height: 50px;
              }

              #page-view {
                line-height: 25px;
                padding: 0px 5px;
                width: 30px;
                text-align: center;
                background: #fff;
              }
          </style>
          <slot></slot>
      `;

    var channelElement = this;
    var data = this._data;
    var page = 1;
    var channelURL = "https://api.are.na/v2/channels/" + this._data.id;
    var pageCount = Math.ceil(this._data.length / this.blockCount);
    var header = document.createElement("div");
    var viewSelector = document.createElement("select");
    var sortSelector = document.createElement("select");
    var buttonArenaLink = document.createElement("div");
    var pageView = document.createElement("div");
    pageView.id = "page-view";
    pageView.classList.add("inset");
    var contents = document.createElement("div");
    var footer = document.createElement("div");


    // header.innerHTML = `${this._data.title} <a href="https://are.na/${this._data.owner_slug}/${this._data.slug}"><img src="img/arena-small.png"></a>`
    header.id = "channel-header";
    this.shadow.appendChild(header);

    // viewSelector.innerHTML = `<option value="both">Both</option>
    //   <option value="channels">Channels</option>
    //   <option value="blocks">Blocks</option>`;
    // header.appendChild(viewSelector);


    // sortSelector.innerHTML = `<option value="desc">descending</option>
    //   <option value="position">position</option>`;
    // header.appendChild(sortSelector);

    contents.id = "channel-contents";
    this.shadow.appendChild(contents);

    if (this.firstRun) {
      this.loadChannel(channelURL + "?page=" + page + "&sort=position&direction=desc", contents);
      pageView.innerText = `${page}/${pageCount}`;
      // page += 1;
      this.firstRun = false;
    }

    var prevButton = document.createElement("img");
    prevButton.src = "img/16x16/button-left.svg";
    header.appendChild(prevButton);

    // pageView.classList.add("button");
    header.appendChild(pageView);

    var nextButton = document.createElement("img");
    nextButton.src = "img/16x16/button-right.svg";
    header.appendChild(nextButton);

    nextButton.onclick = function () {
      if (page+1 <= pageCount) {
        page += 1;
        pageView.innerText = `${page}/${pageCount}`;
        channelElement.loadChannel(channelURL + "?page=" + page + "&sort=position&direction=desc", contents);
      }
    };

    prevButton.onclick = function () {
      if (page-1 >= 1) {
        page -= 1;
        pageView.innerText = `${page}/${pageCount}`;
        channelElement.loadChannel(channelURL + "?page=" + page + "&sort=position&direction=desc", contents);
      }
    };

    // buttonArenaLink.classList.add("button");
    // buttonArenaLink.innerHTML = '<img src="img/arena-small.png">';
    // buttonArenaLink.onclick = function () {
    //   window.open(
    //     "https://are.na/" + data.owner_slug + "/" + data.slug,
    //     "_blank"
    //   );
    // };
    // footer.appendChild(buttonArenaLink);

    footer.id = "footer";
    footer.innerHTML += `<span class="inset">${data.length} object(s)</span>
      <span class="inset">owner: ${data.owner_slug}</span>`;
    this.shadow.appendChild(footer);
  }
}

customElements.define("fos-channel", Channel);
