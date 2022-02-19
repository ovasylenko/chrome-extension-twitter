// chrome.browserAction.onClicked.addListener(function (tab) {})

chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.sendMessage(tab.id, "toggle")
})
