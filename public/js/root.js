// Variables
Object.defineProperty(window, "__games", {
	writable: false,
	value: {
		"roblox": {
			icon: "/images/games/roblox.png",
			url: "https://now.gg/apps/roblox-corporation/5349/roblox.html"
		},
		"stumble": {
			icon: "/images/games/stumble.png",
			url: "https://now.gg/apps/kitka-games/7999/stumble-guys.html"
		},
		"slope": {
			icon: "/images/games/slope.png",
			url: "https://kdata1.com/2020/05/slope/"
		},
		"krunker": {
			icon: "/images/games/krunker.png",
			url: "https://krunker.io/"
		},
		"cookie": {
			icon: "/images/games/cookie.png",
			url: "https://orteil.dashnet.org/cookieclicker/"
		},
		"1v1.lol": {
			icon: "/images/games/roblox.png",
			url: "https://1v1.lol/"
		}
	}
})

// Settings
localStorage.setItem("__rogueconfig", JSON.stringify({
	method: "frame" // frame or page
}));

// Utils
window.__openApp = (uri) => {
	if (new URL(uri).origin == location.origin) {
		location.assign(uri);
	}
	else {
		window.navigator.serviceWorker.register('./sw.js', {
			scope: __uv$config.prefix
		}).then(() => {
			if (JSON.parse(localStorage.getItem("__rogueconfig")).method == "page") {
				if (!(window.self !== window.top)) window.location.assign(__uv$config.prefix + __uv$config.encodeUrl(uri));
				else {
					window.top.location.assign(__uv$config.prefix + __uv$config.encodeUrl(uri));
				}
			} else {
				const IFRAME = `<iframe src="${location.origin + __uv$config.prefix + __uv$config.encodeUrl(uri)}" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
    Your browser doesn't support iframes
</iframe>`;
				window.top.history.replaceState({}, "", "/");
				if (!(window.self !== window.top)) window.document.write(IFRAME);
				else window.top.document.write(IFRAME);
			}
		});
	}
}