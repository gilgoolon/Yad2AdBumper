// Set up an alarm to trigger every 10 minutes
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("autoClick", { periodInMinutes: 60 });
});

// Handle the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "autoClick") {
        // Open the target website
        chrome.tabs.create({ url: "https://www.yad2.co.il/my-ads" }, (tab) => {
            const tabId = tab.id;

            // Wait for the tab to finish loading
            const onUpdatedListener = function (updatedTabId, changeInfo) {
                if (updatedTabId === tabId && changeInfo.status === "complete") {
                    chrome.scripting.executeScript({
                        target: { tabId },
                        files: ["content.js"],
                    }, () => {
                        console.log("Content script executed. Closing tab...");

                        // Close the tab after script execution
                        chrome.tabs.remove(tabId);
                    });

                    // Remove the listener after use
                    chrome.tabs.onUpdated.removeListener(onUpdatedListener);
                }
            };

            chrome.tabs.onUpdated.addListener(onUpdatedListener);
        });
    }
});
