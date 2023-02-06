class Link extends HTMLElement {
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

              iframe {
                width: 100%;
                height: 100%;
                min-width: 640px;
                min-height: 480px;
              }
          </style>`;


      var data = this._data;
      var windowParent = this;

    //   console.log(data.source.url)
      var frame = document.createElement("iframe");
      frame.src = data.source.url;
      this.shadow.appendChild(frame);

      if(frame){
        var iframeWindow = frame.contentWindow;
        iframeWindow.addEventListener('focus', handleIframeFocused);
        iframeWindow.addEventListener('blur', handleIframeBlurred);
      }
      
      function handleIframeFocused(){
        console.log('iframe focused');
        // Additional logic that you need to implement here when focused
      }
      
      function handleIframeBlurred(){
        console.log('iframe blurred');
        // Additional logic that you need to implement here when blurred
      }

    }
  }
  
  customElements.define("arena-link", Link);
  