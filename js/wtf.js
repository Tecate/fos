var windowCount = document.getElementsByTagName("fos-window").length;
var openWindowCount = 0;


let _w = document.querySelector(`fos-window[name=cola]`);
if( _w ){
	_w.open();
}

function openWindows() {
	var openWindows = [];
	for (i=0;i<windowCount;i++) {
		var thisWindow = document.getElementsByTagName("fos-window")[i];
		var isVisible  = window.getComputedStyle(thisWindow).getPropertyValue('display');

		if (isVisible != "none")
			openWindows.push(thisWindow.name);
	}

	return openWindows;
}


// alert(openWindows());