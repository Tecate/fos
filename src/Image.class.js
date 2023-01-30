class Image extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this._data = [];
    }
  
    loadChannel(url, element) {
 
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
      this.shadow.innerHTML = 
          `<style>
              :host{
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
              }

              img {
                object-fit: scale-down;
              }

              #status-bar {
                display: flex;
                width: 100%;
                cursor: default;
              }

              .status-bar-item {
                display: inline-block;
                box-shadow: rgb(255, 255, 255) -1px -1px 0px 0px inset, rgb(128, 128, 128) 1px 1px 0px 0px inset;
                padding: 2px;
                margin: 2px;
              }

              #status-bar-filesize {
                margin-left: auto;
                order: 2;
              }

              .button {
                box-shadow: inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf;
              }
          </style>`;



      var statusBar = document.createElement("div");
      statusBar.id = "status-bar";
      this.shadow.appendChild(statusBar)

      var image = document.createElement("img");
      image.src = this._data.image.square.url;
      this.shadow.appendChild(image);
      
      var parentWindow = this.parentElement;
      image.onload = function() {
        parentWindow.bringInbounds(); 
      }

      var statusBarOriginalUrl = document.createElement("div");
      statusBarOriginalUrl.classList.add("status-bar-item");
      statusBarOriginalUrl.id = "status-bar-originalurl";
      statusBarOriginalUrl.classList.add("button");
      statusBarOriginalUrl.innerHTML = "Original size";
      var url = this._data.image.original.url;
      statusBarOriginalUrl.onclick = function() {
        window.open(url, '_blank')
      };
      statusBar.appendChild(statusBarOriginalUrl);

      var statusBarSave = document.createElement("div");
      statusBarSave.classList.add("status-bar-item");
      statusBarSave.id = "status-bar-save";
      statusBarSave.classList.add("button");
      statusBarSave.innerHTML = "Save to desktop";
      statusBarSave.onclick = function() {
        // todo
      };
      statusBar.appendChild(statusBarSave);

      var statusBarFilesize = document.createElement("div");
      statusBarFilesize.id = "status-bar-filesize";
      statusBarFilesize.classList.add("status-bar-item");
      statusBarFilesize.innerHTML = this._data.image.original.file_size_display;
      statusBar.appendChild(statusBarFilesize);

    }
  }
  
  customElements.define("arena-image", Image);
  