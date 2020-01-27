class Window extends HTMLElement {

	constructor(){
	
		super()
	
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.isMoving = false
		
		this.lastTop = this.lastLeft = this.lastWidth = this.lastHeight = null
		
		this.index = 900
			
	}
	
	mouseUp(){
	
		this.isMoving = false
	
	}
	
	mouseDown(){
		
		this.isMoving = true
		
	}
	
	maximize(){

		if( this.lastTop ){
		
			this.style.top = this.lastTop + "px"
			
			this.style.left = this.lastLeft + "px"
			
			this.style.width = this.lastWidth + "px"
			
			this.style.height = this.lastHeight + "px"
			
			this.lastTop = this.lastLeft = this.lastWidth = this.lastHeight = null
		
		}else{
		
			let r = this.getBoundingClientRect()
			
			this.lastTop = r.top
			
			this.lastLeft = r.left
			
			this.lastWidth = r.width
			
			this.lastHeight = r.height

			this.style.top = 0
			
			this.style.left = 0
			
			this.style.width = innerWidth + "px"
			
			this.style.height = innerHeight + "px"
			
		}

	}
	
	close(){

		this.style.display = "none"
	
	}
	
	bringFront(){
		
		const _windows = document.querySelectorAll("fos-window")
		
		for(const w of _windows){
		
			w.style.zIndex = 900
			
		}
		
		this.style.zIndex = 999
		
		this.render()
		
	}
	
	static get observedAttributes() {
	
    return ['name', 'title', 'icon']
    
  }
  
  get name() {
  
    return this.hasAttribute('name') ? this.getAttribute('name') : null
    
  }
  
  set name(val) {
  
    if (val)
    
      this.setAttribute('name', val)
      
    else
    
      this.removeAttribute('name')
    
  }

  get title() {
  
    return this.hasAttribute('title') ? this.getAttribute('title') : null
    
  }
  
  set title(val) {
  
    if (val)
    
      this.setAttribute('title', val)
      
    else
    
      this.removeAttribute('title')
    
  }

  get icon() {
    return this.hasAttribute('icon') ? this.getAttribute('icon') : null
  }
  
  set icon(val) {
    if (val)
      this.setAttribute('icon', val)
    else
      this.removeAttribute('icon')
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
  
		this.render()
  
  }
  
  connectedCallback() {
  
  	const howMany = document.querySelectorAll('fos-window').length || 1
  
  	this.top = innerHeight * 0.2 * howMany / 5 + 60
  	
  	this.left = innerWidth * 0.1 * howMany / 5
  	
  	this.render()
  	
  }
  
  render(){
  
  	this.shadow.innerHTML = ""
  
  	const style = document.createElement('style')
  	
  	style.innerText = `
			:host{
				position: fixed;
				top: ${this.top}px;
				left: ${this.left}px;
				width: ${this.width}px;
				height: ${this.height}px;
				z-index: ${this.index};
				min-width: 320px;
				min-height: 240px;
				background-color: white;
				display: none;
				border: solid 2px #666;
				box-shadow: 4px 4px 0px rgba(0,0,0,0.5);
				resize: both;
				overflow: auto;
			}
			#buttons{
				position: absolute;
				right: 0;
				top: 0;
			}
			#window{
				display: flex;
				flex-flow: column;
				height: 100%;
			}
			#top{
				flex: 0 1 auto;
				width: 100%;
				background-color: #4C5844;
				color: #fff;
				cursor: move;
				position: relative;
			}
			#top > div > button {
				height: 18px;
			}
			#winTitle{
				margin-left: 5px;
				line-height: 18px;
				cursor: inherit;
				display: inline-block;
				background: rgb(0,255,0);
			}
			#winIcon {
				background: rgb(255,0,0)
			}
			#content{
				flex: 1 1 auto;
				overflow: auto;
				position: relative;
			}
			#border{
				height: 10px;
				flex: 0 0 auto;
			}  	
  	`;
  
  	const _window = document.createElement('div')
  	_window.id = 'window'
  	_window.addEventListener('click', () => { this.bringFront() } )
  	
  	const top = document.createElement('div')
  	top.id = 'top'
  	top.addEventListener('mousedown', () => { this.mouseDown()  } )
  	top.addEventListener('mouseup', () => { this.mouseUp() } )
  	top.addEventListener('touchstart', () => { this.mouseDown()  } )
  	top.addEventListener('touchend', () => { this.mouseUp() } )
  
  	if (this.hasAttribute('icon')) {
	  	const winIcon = document.createElement('img')
	  	winIcon.id = 'winIcon'
	  	winIcon.src = this.icon
  		top.appendChild( winIcon )
	}

	if (this.hasAttribute('title')) {
	  	const winTitle = document.createElement('div')
	  	winTitle.id = 'winTitle'
	  	winTitle.innerText = this.title
	  	top.appendChild( winTitle )
  	}
  	
  	const buttons = document.createElement('div')
  	buttons.id = 'buttons'
  	
  	const _max = document.createElement('button')
  	_max.innerText = "[]"
  	_max.addEventListener('click', () => { this.maximize() } )
  	
  	const close = document.createElement('button')
  	close.innerText = "x"
  	close.addEventListener('click', () => { this.close() } )
  	
  	buttons.appendChild( _max )
  	buttons.appendChild( close )
  	
  	top.appendChild( buttons )
  	
  	const content = document.createElement('div')
  	content.id = 'content'
  	
  	const slot = document.createElement('slot')
  	
  	content.appendChild( slot )
  	
  	const border = document.createElement('div')
  	border.id = 'border'
  	
  	_window.appendChild( top )
  	_window.appendChild( content )
  	_window.appendChild( border )
  
  	this.shadow.appendChild( style )
  	
  	this.shadow.appendChild( _window )
		
  }
  
}

customElements.define('fos-window', Window);
