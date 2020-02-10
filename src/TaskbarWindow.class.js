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
				min-width: 10px;
				min-height: 10px;
				background: orange;
				color: white;
				font-smooth: never;
				font-family: 'Pixel Arial 11';
				font-size: 8px;
				border: 1px solid rgb(0,255,0);
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
