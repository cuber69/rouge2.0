const enabled = false;

let inFrame

try {
	inFrame = window !== top
} catch (e) {
	inFrame = true
}

if (enabled == true) {
	if (!inFrame && !navigator.userAgent.includes("Firefox")) {
		const popup = open("about:blank", "_blank")
		if (!popup || popup.closed) {
			alert("Popups are disabled! Enable them to hide history!")
		} else {
			const doc = popup.document
			const iframe = doc.createElement("iframe")
			const style = iframe.style
			const link = doc.createElement("link")

			doc.title = "Classes"
			link.rel = "icon";
			link.href = "https://ssl.gstatic.com/classroom/favicon.png";
			iframe.src = location.href
			style.position = "fixed"
			style.top = style.bottom = style.left = style.right = 0
			style.border = style.outline = "none"
			style.width = style.height = "100%"

			doc.body.appendChild(iframe);
			doc.head.appendChild(link);
			location.replace("https://classroom.google.com")
		}
	}
}