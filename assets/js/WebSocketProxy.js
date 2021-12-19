if(window) {
    const WebSocketProxy = new Proxy(window.WebSocket, {
        construct: function(target, args) {
            const instance = new target(...args);

            // Immediately close the socket when it's opened.
            const openHandler = function(e) {
                window.postMessage('openConnection');
                instance.close();
            };
            
            // Clean up on closing.
            const closeHandler = function(e) {
                instance.removeEventListener('open', openHandler);
            };

            // Set up all event listeners.
            instance.addEventListener('open', openHandler);
            instance.addEventListener('close', closeHandler);

            return instance;
        }
    });

    // Replace the WebSocket object with our proxy.
    window.WebSocket = WebSocketProxy;
};