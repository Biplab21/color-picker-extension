let color = 'red';

chrome.runTime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({ color });
})