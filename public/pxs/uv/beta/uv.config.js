/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/~uv/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/pxs/uv/beta/uv.handler.js',
    client: '/pxs/uv/beta/uv.client.js',
    bundle: '/pxs/uv/beta/uv.bundle.js',
    config: '/pxs/uv/beta/uv.config.js',
    sw: '/pxs/uv/bare/uv.sw.js',
};
