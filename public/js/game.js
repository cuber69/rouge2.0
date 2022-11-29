function capitalizeString(str) {
	let arr = str.split(" ");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
	return arr.join(" ");
}

function createGame(data) {
	let className = location.pathname == "/pinned.html" ? " big" : "";
	let gameElm = document.createElement("div");
	gameElm.innerHTML = `<div data-game="${data.name}" class="widget game${className}" onclick="window.__openApp('${data.data.url}');"><p>${capitalizeString(data.name)}</p><img src="${location.origin + data.data.icon}"/></div>`
	document.querySelector("footer .widgets").appendChild(gameElm);
}

function gamePage() {
	var games = Object.keys(window["__games"]);
	for (let i = 0; i < games.length; i++) {
		createGame({
			name: games[i],
			data: window["__games"][games[i]]
		});
	}
}

function pinnedPage() {
	var games = JSON.parse(window.top.localStorage.getItem("__roguepinned")||JSON.stringify([])).reverse();
	
	for (let i = 0; i < games.length; i++) {
		createGame({
			name: games[i],
			data: window["__games"][games[i]]
		});
	}
}

window.onload = () => {
	if (location.pathname == "/games") gamePage();
	if (location.pathname == "/pinned.html") pinnedPage();
}