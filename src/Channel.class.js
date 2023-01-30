class Channel extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this._data = [];
    }
  
    loadChannel(url, element) {
        //only run this when window is opened and data == []
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
            this._data = data;
            for (var i = 0; i < data.contents.length; i++) {
                var row = document.createElement("div");
                row.classList.add("channel-row")
                if (data.contents[i].class == "Image"){
                    row.innerHTML += '<img src="img/channel-row-image.png" alt="Image">'
                    row.onclick = function() {
                        console.log("runs", data.title, i)
                        var newFoswindow = document.createElement("fos-window");
                        newFoswindow.name = "arena-" + data.contents[i].id;
                        newFoswindow.icon = "img/favicon.gif";
                        newFoswindow.setAttribute("fixedsize", "");
                        newFoswindow.setAttribute("fostitle", data.contents[i].title);
                        var newImage = document.createElement("arena-image");
                        newImage._data = data.contents[i];
                        console.log("arena-image _data:", newImage._data);
                        newFoswindow.appendChild(newImage)
                        document.getElementById("desktop").appendChild(newFoswindow);
                    }
                }
                else if (data.contents[i].class == "Channel"){
                    row.innerHTML += '<img src="img/arena-small.png" alt="Channel">'
                }
                else {
                    row.innerHTML += `<span class="class">${data.contents[i].class}</span>`;
                }
                row.innerHTML += ` <span class="id">${data.contents[i].id}</span>`;
                row.innerHTML += ` <span class="title">${data.contents[i].title}</span>`;

                element.appendChild(row);
            }
            console.log(this._data)
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
                  /*display: flex;
                  flex-flow: row wrap;
                  align-items: center;
                  justify-content: center;*/
                  display: block;
                  width: 100%;
                  height: 100%;
                  color: black;
                  font-smooth: never;
                  font-family: 'Pixel Arial 11';
                  font-size: 8px;
                  border: 1px solid grey;
                  box-sizing: border-box;
              }

              #channel-header {
                font-family: serif;
                font-size: 20px;
              }
              #channel-contents {
                margin: 2px;
                padding: 4px;
                max-height: 400px;
                overflow-y: scroll;
                box-shadow: rgb(255, 255, 255) -1px -1px 0px 0px inset, rgb(128, 128, 128) 1px 1px 0px 0px inset, rgb(223, 223, 223) -2px -2px 0px 0px inset, rgb(10, 10, 10) 2px 2px 0px 0px inset;
              }

              .channel-row {
              }
          </style>
          <div id="channel-header">${this._data.title} <a href="https://are.na/${this._data.owner_slug}/${this._data.slug}"><img src="img/arena-small.png"></a></div>
          <slot></slot>
      `;
      var blockCount = 20;
      var pageCount = Math.ceil(this._data.length / blockCount);
      var loadButton = document.createElement("button");
      var contents = document.createElement("div");
      contents.id = "channel-contents";
      this.shadow.appendChild(contents);

      var page = 1;
      loadButton.innerText = `Load page ${page}/${pageCount}`;
      var channelURL = "https://api.are.na/v2/channels/" + this._data.id;
      this.appendChild(loadButton);
    
      loadButton.onclick = function() {
        this.parentElement.loadChannel(channelURL + "?page=" + page, contents);
        if (page < pageCount) {
          page += 1;
          loadButton.innerText = `Load page ${page}/${pageCount}`;
        } else {
          loadButton.innerText = "nothing more to load";
          loadButton.onclick = function() {}
        }
      }
    }
  }
  
  customElements.define("fos-channel", Channel);
  