class Window extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.isMoving = false;
    this.lastTop = this.lastLeft = this.lastWidth = this.lastHeight = null;
    this.index = 900;
    this.isOpen = false;
    this.windowStack = 1000;
  }

  mouseUp() {
    this.isMoving = false;
  }

  mouseDown() {
    this.isMoving = true;
  }

  open() {
    // create panel icon here
    if (this.hasAttribute("minimized")) {
      this.removeAttribute("minimized");
    } else if (
      document.querySelector(`fos-taskbarwindow[href=${this.name}] `) == null
    ) {
      let _b = document.querySelector(`fos-bar`);
      const windowButton = document.createElement("fos-taskbarwindow");
      windowButton.setAttribute("href", this.name);
      if (this.hasAttribute("icon")) {
        const winIcon = document.createElement("img");
        // winIcon.id = 'winIcon'
        winIcon.src = this.icon;
        winIcon.classList.add("taskIcon");
        windowButton.appendChild(winIcon);
      }
      var buttonTitle = document.createTextNode(this.fostitle);
      windowButton.appendChild(buttonTitle);
      // windowButton.textContent = this.fostitle;
      _b.appendChild(windowButton);
    }

    this.isOpen = true;
    this.style.display = "block";
    this.bringFront();
  }

  minimize() {
    this.isOpen = false;
    this.style.display = "none";
    this.setAttribute("minimized", true);
    document
      .querySelector(`fos-taskbarwindow[href=${this.name}] `)
      .classList.remove("active");
    document
      .querySelector(`fos-window[name=${this.name}] `)
      .classList.remove("active");
  }

  maximize() {
    if (this.lastTop) {
      this.style.top = this.lastTop + "px";
      this.style.left = this.lastLeft + "px";
      this.style.width = this.lastWidth + "px";
      this.style.height = this.lastHeight + "px";
      this.lastTop = this.lastLeft = this.lastWidth = this.lastHeight = null;
    } else {
      let r = this.getBoundingClientRect();
      this.lastTop = r.top;
      this.lastLeft = r.left;
      this.lastWidth = r.width;
      this.lastHeight = r.height;
      this.style.top = 0;
      this.style.left = 0;
      this.style.width = innerWidth + "px";
      this.style.height = innerHeight + "px";
    }
  }

  close() {
    this.isOpen = false;
    this.style.display = "none";
    document.querySelector(`fos-taskbarwindow[href=${this.name}] `).remove();
    // closed windows are still stored in windowStack but I guess it doesn't matter
  }

  bringFront() {
    // z-index logic goes here

    // window stack is stored here:
    var windowStack = document.getElementById("desktop").windowStack;

    const _windows = document.querySelectorAll("fos-window");

    // update desktop window stack
    if (windowStack.indexOf(this.name) !== -1) {
      windowStack.unshift(windowStack.splice(windowStack.indexOf(this.name), 1)[0]);
    } else {
      windowStack.unshift(this.name);
    }

    // console.log(windowStack);

    for (const w of _windows) {
      // set z-index according to desktop window stack
      if (windowStack.indexOf(w.name) !== -1) { 
        w.style.zIndex = windowStack.length - windowStack.indexOf(w.name) + 100;
      }

      if (
        document.querySelector(
          `fos-taskbarwindow[href=${w.getAttribute("name")}] `
        ) != null
      ) {
        document
          .querySelector(`fos-taskbarwindow[href=${w.getAttribute("name")}] `)
          .classList.remove("active");
        document
          .querySelector(`fos-window[name=${w.getAttribute("name")}] `)
          .classList.remove("active");
      }
    }

    if (
      document.querySelector(
        `fos-taskbarwindow[href=${this.getAttribute("name")}] `
      ) != null
    ) {
      document
        .querySelector(`fos-taskbarwindow[href=${this.name}] `)
        .classList.add("active"); // TODO: check if exists
      document
        .querySelector(`fos-window[name=${this.name}] `)
        .classList.add("active");
    }
    this.render();
  }

  static get observedAttributes() {
    return ["name", "fostitle", "icon", "fixedsize"];
  }

  get name() {
    return this.hasAttribute("name") ? this.getAttribute("name") : null;
  }

  set name(val) {
    if (val) this.setAttribute("name", val);
    else this.removeAttribute("name");
  }

  get fostitle() {
    return this.hasAttribute("fostitle") ? this.getAttribute("fostitle") : null;
  }

  set fostitle(val) {
    if (val) this.setAttribute("fostitle", val);
    else this.removeAttribute("fostitle");
  }

  get icon() {
    return this.hasAttribute("icon") ? this.getAttribute("icon") : null;
  }

  set icon(val) {
    if (val) this.setAttribute("icon", val);
    else this.removeAttribute("icon");
  }

  get fixedsize() {
    return this.hasAttribute("fixedsize") ? "none" : "both";
  }

  get minimized() {
    return this.hasAttribute("minimized") ? true : false;
  }

  set minimized(val) {
    if (val) this.setAttribute("minimized", val);
    else this.removeAttribute("minimized");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    // SET SPAWN POSITION HERE
    const howMany = document.querySelectorAll("fos-window").length || 1; // calculate how many possible windows

    this.top = 60;
    this.left = 120;

    // oirginal values
    // this.top = innerHeight * 0.2 * howMany / 5 + 60
    // this.left = innerWidth * 0.1 * howMany / 5

    this.render();
  }

  render() {
    this.shadow.innerHTML = "";

    const style = document.createElement("style");

    const _window = document.createElement("div");
    _window.id = "window";

    // click events go here
    _window.addEventListener("mousedown", (e) => {
      var path = e.path || (e.composedPath && e.composedPath()); // fix for firefox
      if (path[1].id == "close") {
        this.close();
      } else if (path[1].id == "collapse") {
        this.minimize();
      } else if (path[1].id == "maximize") {
        this.maximize();
      } else {
        this.bringFront();
      }
    });

    const top = document.createElement("div");
    top.id = "top";
    top.addEventListener("mousedown", () => {
      this.mouseDown();
    });
    top.addEventListener("mouseup", () => {
      this.mouseUp();
    });
    top.addEventListener("touchstart", () => {
      this.mouseDown();
    });
    top.addEventListener("touchend", () => {
      this.mouseUp();
    });

    if (this.hasAttribute("icon")) {
      const winIcon = document.createElement("img");
      winIcon.id = "winIcon";
      winIcon.src = this.icon;
      top.appendChild(winIcon);
    }

    if (this.hasAttribute("fostitle")) {
      const fosTitle = document.createElement("div");
      fosTitle.id = "fosTitle";
      fosTitle.innerText = this.fostitle;
      top.appendChild(fosTitle);
    }

    const buttons = document.createElement("div");
    buttons.id = "buttons";

    const collapse = document.createElement("button");
    collapse.id = "collapse";
    const collapseIcon = document.createElement("img");
    collapseIcon.src = "img/collapse-icon.png";
    collapse.appendChild(collapseIcon);
    buttons.appendChild(collapse);

    if (!this.hasAttribute("fixedsize")) {
      // no maximize button for fixedsize windows
      const _max = document.createElement("button");
      _max.id = "maximize";
      const maxIcon = document.createElement("img");
      maxIcon.src = "img/max-icon.png";
      _max.appendChild(maxIcon);
      buttons.appendChild(_max);
    }

    const close = document.createElement("button");
    close.id = "close";
    const closeIcon = document.createElement("img");
    closeIcon.src = "img/close-icon.png";
    close.appendChild(closeIcon);
    buttons.appendChild(close);
    top.appendChild(buttons);

    const content = document.createElement("div");
    content.id = "content";
    const slot = document.createElement("slot");
    content.appendChild(slot);

    const border = document.createElement("div");
    border.id = "border";

    _window.appendChild(top);
    _window.appendChild(content);
    _window.appendChild(border);

    this.shadow.appendChild(style);

    this.shadow.appendChild(_window);

    style.innerText = `
			:host{
				position: fixed;
				top: ${this.top}px;
				left: ${this.left}px;
				width: ${this.width}px;
				height: ${this.height}px;
				z-index: ${this.index};
				min-width: 320px;
				min-height: 34px;
        background: repeating-conic-gradient(#FF00FF 0% 25%, #000000 0% 50%) 50% / 20px 20px;
				display: none;
				border: solid 2px #666;
				box-shadow: 4px 4px 0px rgba(0,0,0,0.5);
				resize: ${this.fixedsize};
				overflow: auto;
			}

			#buttons{
				background-color: #4C5844;
			}

			button {
				width: 14px;
				box-sizing: border-box;
				background: #bbbbbb;
				border: 1px outset #dadada;
				box-shadow: 1px 1px 0px black;
				padding: 0px;
				margin-left: 2px;
			}

			button img {
				position: relative;
				top: 0px;
				right: 0px;
				bottom: 0px;
				left: 0px;
				margin: auto;
			}

			#window{
				display: flex;
				flex-flow: column;
				height: 100%;
				background: #dadada;
			}

			#top{
				display: flex;
				align-items: center;
				/*width: 100%;*/
				height: 18px;
				background-color: #4C5844;
				color: #fff;
				cursor: cursor;
				position: relative;
				box-sizing: border-box;
        overflow: hidden;
				-webkit-touch-callout: none; /* iOS Safari */
			    -webkit-user-select: none; /* Safari */
			     -khtml-user-select: none; /* Konqueror HTML */
			       -moz-user-select: none; /* Old versions of Firefox */
			        -ms-user-select: none; /* Internet Explorer/Edge */
			            user-select: none;
			}

			#top > div > button {
				width: 16px;
				height: 14px;
			}

			#fosTitle {
				margin-left: 5px;
				cursor: inherit;
				display: inline-block;
        flex-grow: 1;
        white-space: nowrap; 
        width: 0px;
			}

			#winIcon {
			}

			#content{
				flex: 1;
				overflow: auto;
				position: relative;
				background: #DFDFDF;
			}

			#border{
				height: 16px;
				display: ${
          this.fixedsize //lol it works for now};
        }  
  	`;
  }
}

customElements.define("fos-window", Window);
