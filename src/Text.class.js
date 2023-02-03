class Text extends HTMLElement {
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

              #content {
                background: #fff;
                width: 640px;
                box-shadow: rgb(255, 255, 255) -1px -1px 0px 0px inset, rgb(128, 128, 128) 1px 1px 0px 0px inset;
                margin: 2px;
                padding: 20px;
              }
          </style>`;


      var data = this._data;

      var text = document.createElement("div")
      text.id = "content";
      text.innerHTML = data.content_html;
      this.shadow.appendChild(text)
    }
  }
  
  customElements.define("arena-text", Text);
  