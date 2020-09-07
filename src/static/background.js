/*
Capture the button click on our extension in the toolbar 
and execute the script in the context of the page:
*/
chrome.browserAction.onClicked.addListener(() => chrome.tabs.executeScript({file: "contentscript.js"}));