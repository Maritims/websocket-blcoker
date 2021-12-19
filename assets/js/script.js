window.addEventListener('message', (e) => {
    if(e.data === 'openConnection') {
        chrome.runtime.sendMessage({
            text: e.data
        });
    }
}, false);

// Inject WebSocketProxy script into current page.
const scriptTag = document.createElement('script');
scriptTag.src = chrome.runtime.getURL('assets/js/WebSocketProxy.js');
(document.head || document.documentElement).append(scriptTag);
scriptTag.onload = function() {
    scriptTag.parentNode.removeChild(scriptTag);
};