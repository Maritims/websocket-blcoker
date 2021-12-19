function getTabId() {
    return new Promise(async (resolve, reject) => {
        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });
        resolve(tabs[0].id);
    });
};

function getBadgeText(tabId) {
    return new Promise(async function(resolve, reject) {
        resolve(await chrome.action.getBadgeText({ tabId: tabId }));
    });
};

chrome.runtime.onMessage.addListener(async function(message) {
    if(message.text == 'openConnection') {
        const response = await chrome.storage.sync.get(['openConnectionTotal']);
        await chrome.storage.sync.set({ openConnectionTotal: response.openConnectionTotal + 1 });

        const tabId = await getTabId();
        const badgeText = await getBadgeText(tabId);
        const count = (badgeText ? parseInt(badgeText) : 0) + 1;

        chrome.action.setBadgeText({
            text: count.toString(),
            tabId: tabId
        });
    }
});