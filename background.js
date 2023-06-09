// This file will run in the service Worker.

let color = 'red';

// Using Storage api

chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.sync.set({ color });
});

// We can get this value in the other files.