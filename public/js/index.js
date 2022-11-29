function toggleSearch() {
	function toggleBlur() {
		var elms = document.querySelector(".content").children;
		for (let i = 0; i < elms.length; i++) {
			var className = elms[i].className;
			if (!(className == "bar" || className == "searchbar"))
				elms[i].setAttribute("data-blur", elms[i].getAttribute("data-blur") == "true" ? "" : "true");
		}
	}
	toggleBlur();
	setTimeout(() => {
		document.querySelector(".searchbar").id = "active";
	}, 500);

	window.addEventListener("mouseup", (evt) => {
		if (evt.target.className == "searchbar") {
			toggleBlur();
			setTimeout(() => {
				document.querySelector(".searchbar").id = "";
			}, 300);
		}
	})
}

function loaders() {
	function proxyURL(uri) {
		if (uri.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) == null) {
			uri = "https://google.com/search?q=" + encodeURIComponent(uri);
		} else {
			if (!uri.startsWith("http://") && !uri.startsWith("https://")) {
				uri = location.protocol + "//" + uri;
			}
		}
		window.navigator.serviceWorker.register('./sw.js', {
			scope: __uv$config.prefix
		}).then(() => {
			window.location.assign(__uv$config.prefix + __uv$config.encodeUrl(uri));
		});
	}

	document.querySelector(".searchbar .bar input").addEventListener("keyup", (evt) => {
		if (evt.key == "Enter") {
			var query = evt.target.value;
			proxyURL(query);
		}
	})

	document.addEventListener("keydown", (evt) => {
		if (evt.key == "Escape") {
			if (document.querySelector(".searchbar").id == "active") {
				function toggleBlur() {
					var elms = document.querySelector(".content").children;
					for (let i = 0; i < elms.length; i++) {
						var className = elms[i].className;
						if (!(className == "bar" || className == "searchbar"))
							elms[i].setAttribute("data-blur", elms[i].getAttribute("data-blur") == "true" ? "" : "true");
					}
				}
				toggleBlur();
				setTimeout(() => {
					document.querySelector(".searchbar").id = "";
				}, 300);
				evt.preventDefault();
			}
		}
	})

	document.querySelector(".searchbar .bar img").addEventListener("mouseup", (evt) => {
		proxyURL(document.querySelector(".searchbar .bar input").value);
	})
}

function redirectHandler() {
	var elms = document.querySelectorAll("*[data-redirect]");
	for (let i = 0; i < elms.length; i++) {
		elms[i].addEventListener("click", (evt) => {
			location.assign(elms[i].getAttribute("data-redirect"));
		})
	}
}

window.onload = () => {
	loaders();
	redirectHandler();
}