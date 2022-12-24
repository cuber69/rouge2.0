function loadTheme(theme) {
	if (theme) {
		function handle(node) {
			node.setAttribute("data-theme", theme);
		}

		var elms = document.querySelectorAll("*");
		for (let i = 0; i < elms.length; i++) {
			handle(elms[i]);
		}
	}
}

loadTheme(JSON.parse(localStorage.getItem("__rogueconfig")).theme);