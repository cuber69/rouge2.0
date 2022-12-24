window.toggleAddGame = () => {
	function toggleBlur() {
		var elms = document.querySelector(".content").children;
		for (let i = 0; i < elms.length; i++) {
			var className = elms[i].className;
			if (!(className == "add" || className == "addGame"))
				elms[i].setAttribute("data-blur", elms[i].getAttribute("data-blur") == "true" ? "" : "true");
		}
	}
	toggleBlur();
	setTimeout(() => {
		document.querySelector(".addGame").id = "active";
	}, 500);
	window.addEventListener("mouseup", (evt) => {
		if (evt.target.className == "addGame") {
			toggleBlur();
			setTimeout(() => {
				document.querySelector(".addGame").id = "";
			}, 300);
		}
	})
}

async function getResponseTitle(res) {
	var body = await res.text();
	var DOM = new DOMParser().parseFromString(body, "text/html");
	return DOM.title;
}

function capitalizeString(str) {
	let arr = str.split(" ");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
	return arr.join(" ");
}

function createGame(data) {
	let evt = data.name == "Add" ? "window.toggleAddGame();" : "window.__openApp('"+data.data.url+"')";
	let className = location.pathname == "/pinned.html" ? " big" : "";
	let gameElm = document.createElement("div");
	gameElm.innerHTML = `<div data-game="${data.name}" class="widget game${className}" onclick="${evt}"><p>${capitalizeString(data.name)}</p><img src="${location.origin + data.data.icon}"/></div>`;
	document.querySelector("footer .widgets").appendChild(gameElm);
}

function gamePage() {
	var games = Object.keys(window["__games"]);
	var customs = JSON.parse(window.top.localStorage.getItem("__roguecustom"));
	for (let i = 0; i < 12; i++) {
		var gameName = games[i] || Object.keys(customs)[i-9] || "Add";
		var gameObj = window["__games"][games[i]] || customs[gameName] || {
			icon: "/images/add.png",
			url: "https://example.com/"
		}
		createGame({
			name: gameName,
			data: gameObj
		});
	}
}

function pinnedPage() {
	var games = JSON.parse(window.top.localStorage.getItem("__roguepinned") || JSON.stringify([]))
	if (games.length == 0) {
		document.querySelector("footer .widgets").innerHTML = '<h2>Go to play to pin apps!</h2>';
	}
	for (let i = 0; i < games.length; i++) {
		createGame({
			name: games[i],
			data: window["__games"][games[i]]
		});
	}
}

function load() {
	document.querySelector(".addGame .add input").addEventListener("keyup", async (evt) => {
		if (evt.key == "Enter") {
			var url = evt.target.value;
			var games = JSON.parse(window.top.localStorage.getItem("__roguecustom") || JSON.stringify({}));
			var titleRes = await window.__bareClient.fetch(url);
			var titleText = await getResponseTitle(titleRes);
			console.log(`%cAdding game: ${titleText}...`, "font-size:20px;")
			games[titleText.toLowerCase()] = {
				icon: "/images/web.png",
				url: url
			}
			localStorage.setItem("__roguecustom", JSON.stringify(games));
			location.reload(false);
		}
	})

	document.addEventListener("keydown", (evt) => {
		if (evt.key == "Escape") {
			if (document.querySelector(".addGame").id == "active") {
				function toggleBlur() {
					var elms = document.querySelector(".content").children;
					for (let i = 0; i < elms.length; i++) {
						var className = elms[i].className;
						if (!(className == "add" || className == "addGame"))
							elms[i].setAttribute("data-blur", elms[i].getAttribute("data-blur") == "true" ? "" : "true");
					}
				}
				toggleBlur();
				setTimeout(() => {
					document.querySelector(".addGame").id = "";
				}, 300);
				evt.preventDefault();
			}
		}
	})
}

window.onload = () => {
	async function loadBare(){
		window.__bareClient = await createBareClient(location.origin+"/bare/");
	}
	
	if (location.pathname == "/games.html") {
		loadBare();
		gamePage();
		load();
	}
	if (location.pathname == "/pinned.html") pinnedPage();

}