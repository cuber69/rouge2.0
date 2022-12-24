importScripts('/pxs/uv/beta/uv.bundle.js');
importScripts('/pxs/uv/beta/uv.config.js');
importScripts('/pxs/uv/beta/uv.sw.js');
importScripts("/pxs/ratic/ratic.sw.js");
importScripts("/pxs/ratic/ratic.config.js");

const Ratic = new self.__ratic$client(self.__ratic$config.prefix);
const UV = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith(location.origin + self.__uv$config.prefix))
		event.respondWith(UV.fetch(event));
	else if (event.request.url.startsWith(location.origin + self.__ratic$config.prefix)) 
		event.respondWith(Ratic.FetchEvent(event.request));
});