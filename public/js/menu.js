function __ctxInit() {
	document.querySelector(".ctxmenu").setAttribute("data-ctx", "true");
	for (let i = 0; i < document.querySelectorAll(".ctxmenu .ctxitem").length; i++) {
		var child = document.querySelector(".ctxmenu .ctxitem").children[i];
		child.setAttribute("data-ctx", "true");
		function removeVal(arr, val) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] === val) {
					arr.splice(i, 1);
				}
			}
			return arr;
		}
		child.addEventListener("mousedown", (evt) => {
			var target = evt.target;
			if ((target.innerText == "Pin" || target.innerText == "Unpin") && target.nodeName == "P") {
				var app = window.__selectedApp.innerText.toLowerCase();
				var pinned = JSON.parse(localStorage.getItem("__roguepinned") || JSON.stringify([]));
				if (!pinned.includes(app)) {
					pinned.push(app);
					target.innerText = "Unpin";
				} else {
					if (location.pathname == "/pinned.html") {
						document.querySelector(`.widget[data-game=${app}]`).remove();
					}
					target.innerText = "Pin";
					pinned = removeVal(pinned, app);
				}
				document.querySelector(".ctxmenu").id = "";
				localStorage.setItem("__roguepinned", JSON.stringify(pinned));
			}
		})
	}

	var x = null;
	var y = null;

	document.addEventListener('mousemove', onMouseUpdate, false);
	document.addEventListener('mouseenter', onMouseUpdate, false);

	function onMouseUpdate(e) {
		x = e.pageX;
		y = e.pageY;
	}

	function __getMouseX() {
		return x;
	}

	function __getMouseY() {
		return y;
	}

	document.addEventListener('mouseup', (evt) => {
		if (!(evt.target.getAttribute("data-ctx") == "true")) {
			var ctxmenu = document.querySelector(".ctxmenu");
			if (ctxmenu.id == "active") ctxmenu.id = "";
		}
	}, false)

	function menuHandler(evt) {
		var target = evt.target;
		if (target.className.startsWith("widget game") || target.parentNode.className.startsWith("widget game")) {
			window.__selectedApp = target;
			var ctxmenu = document.querySelector(".ctxmenu");
			ctxmenu.style.setProperty("--ctx-mouse-x", __getMouseX());
			ctxmenu.style.setProperty("--ctx-mouse-y", __getMouseY());
			ctxmenu.id = ctxmenu.id == "" ? "active" : "";
			document.querySelector("#ctxpin p").innerText = JSON.parse(localStorage.getItem("__roguepinned") || JSON.stringify([])).includes(window.__selectedApp.innerText.toLowerCase()) ? "Unpin" : "Pin";
		}
		evt.preventDefault();
	}

	document.addEventListener('contextmenu', menuHandler, false);
}

__ctxInit();