function saveOptions(e) {
  chrome.storage.local.set({
    colour: document.querySelector("#colour").value
  });
}

function restoreOptions() {
  chrome.storage.local.get('selectedText', (res) => {
    console.log(res);
    document.querySelector("#colour").value = res.selectedText || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


// var myPort = chrome.runtime.connect({name:"port-from-options"});


// myPort.onMessage.addListener((m) => {
//   console.log("In opions script, received message from background script: ", m);
//   console.log(m);
  
// });
