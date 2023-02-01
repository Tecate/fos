class Attachment extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this._data = [];
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
          </style>`;


      var data = this._data;

    //   var link = document.createElement("a")
    //   link.href = data.attachment.url;
    //   link.innerHTML = data.title;
    //   this.shadow.appendChild(link)
      this.shadow.innerHTML += `<a href="${data.attachment.url}">${data.title}</a> ${data.attachment.file_size_display}`

    }
  }
  
  customElements.define("arena-attachment", Attachment);
  