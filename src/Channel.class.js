class Channel extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
 
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  
    connectedCallback() {
      this.render();
    }
  
    static get observedAttributes() {
      return ["title", "id"];
    }
  
    get control() {
      return this.hasAttribute("title") ? this.getAttribute("title") : null;
    }
  
    set control(val) {
      if (val) this.setAttribute("title", val);
      else this.removeAttribute("title");
    }

    get control() {
        return this.hasAttribute("id") ? this.getAttribute("id") : null;
    }
    
    set control(val) {
        if (val) this.setAttribute("id", val);
        else this.removeAttribute("id");
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
                  color: white;
                  font-smooth: never;
                  font-family: 'Pixel Arial 11';
                  font-size: 8px;
                  background: #000;
              }
          </style>
          <div id="channel-header">${this.title}</div>
          <div>some text</div>
          <button>this is a button</button>
          <slot></slot>
      `;
    }
  }
  
  customElements.define("fos-channel", Channel);
  