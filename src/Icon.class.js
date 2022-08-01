class Icon extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    const howMany = document.querySelectorAll("fos-icon").length;

    const x = Math.floor(innerWidth / (64 + 8));

    const offset =
      parseInt(document.querySelector("fos-desktop").iconOffset) || 0;

    this.top = 8 + Math.floor(howMany / x) * (64 + 8) + offset;

    this.left = 8 + (64 + 8) * (howMany % x);

    this.dblClick = () => {
      if (this.control != "") {
        let _w = document.querySelector(`fos-window[name=${this.control}] `);

        if (_w) {
          _w.open();
        }
      } else {
        alert("error: no fos-window for fos-icon");
      }
    };

    this.addEventListener("dblclick", this.dblClick);

    this.tapedTwice = false;

    this.addEventListener("touchstart", (e) => {
      if (!this.tapedTwice) {
        this.tapedTwice = true;

        setTimeout(() => {
          this.tapedTwice = false;
        }, 300);

        return false;
      }

      e.preventDefault();

      this.dblClick();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["href"];
  }

  get control() {
    return this.hasAttribute("href") ? this.getAttribute("href") : null;
  }

  set control(val) {
    if (val) this.setAttribute("href", val);
    else this.removeAttribute("href");
  }

  render() {
    this.shadow.innerHTML = `
		<style>
			:host{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: fixed;
				top: ${this.top}px;
				left: ${this.left}px;
				width: 64px;
				height: 64px;
				color: white;
				font-smooth: never;
				font-family: 'Pixel Arial 11';
				font-size: 8px;
				/*border: 1px solid rgb(0,255,0);*/
				-webkit-touch-callout: none;
					-webkit-user-select: none;
					 -khtml-user-select: none;
						 -moz-user-select: none;
							-ms-user-select: none;
							    user-select: none;
			}
		</style>
		<slot></slot>
	`;
  }
}

customElements.define("fos-icon", Icon);
