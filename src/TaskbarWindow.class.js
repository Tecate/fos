class TaskbarWindow extends HTMLElement {

	constructor(){
	
		super()
			
		this.shadow = this.attachShadow({mode: 'open'})
		
		const howMany = document.querySelectorAll('fos-taskbarwindow').length
		
		
		this.click = () => {
			console.log("clicked");

			let parent = document.querySelector(`fos-window[name=${this.control}] `)
			
			// check if window is already mininized
			if (parent.hasAttribute("minimized")) {
				parent.open();
			} else if (parent.style.zIndex != 999) {
				parent.bringFront();
			} else {
				parent.minimize();
			}
				
		}
		
		this.addEventListener('click', this.click )

		this.tapedTwice = false
		
		this.addEventListener("touchstart", e=>{
		
			if(!this.tapedTwice) {
			
		      this.tapedTwice = true
		      
		      setTimeout( ()=>{ this.tapedTwice = false; }, 300 )
		      
		      return false
		  }
		  
		  e.preventDefault()
		  
		  this.click()
		  
		})
		
	}
	
	attributeChangedCallback(name, oldValue, newValue) {

		this.render()
  
  }
  
  connectedCallback() {
  
  	this.render()
  	
  }
	
	static get observedAttributes() {
	
    return ['href']
    
  }
  
  get control() {
  
    return this.hasAttribute('href') ? this.getAttribute('href') : null
    
  }
  
  set control(val) {
  
    if (val)
    
      this.setAttribute('href', val)
      
    else
    
      this.removeAttribute('href')
      
  }

	render(){

		this.shadow.innerHTML = `
		<style>
			:host{
				display: flex;
				align-items: center;
				width: 140px;
				height: 22px;
				box-sizing: border-box;
				padding: 2px;
				margin-left: 3px;
				background: #D4D0C8;
				color: black;
				font-smooth: never;
				font-family: 'Pixel Arial 11';
				font-size: 8px;
				white-space: nowrap; /*overflow stuff gets ignored when displayed as flex*/
				overflow: hidden;
				text-overflow: ellipsis;
				border: 1px solid rgb(0,255,0);
				border-color: #E8E7E4 #808080 #808080 #E8E7E4;
				box-shadow: 1px 1px 0px #404040;
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

customElements.define('fos-taskbarwindow', TaskbarWindow)
