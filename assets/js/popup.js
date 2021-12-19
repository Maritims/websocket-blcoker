chrome.storage.sync.get(['openConnectionTotal'], function(response) {
    document.getElementById('openConnectionTotal').innerText = response.openConnectionTotal || 0;
});

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    chrome.action.getBadgeText({
        tabId: tabs[0].id
    }, function(badgeText) {
        document.getElementById('connectionsBlockedOnThisPage').innerText = badgeText;
    });
});