function saveOptions(e) {
    console.log('calling save');
  chrome.storage.local.set({
    colour: document.querySelector("#colour").value
  });
}

function loadSwappingText() {
  chrome.storage.local.get('selectedText', (res) => {
    console.log(res);

console.log($('#selected_colour_num'));
    $('#selected_colour_num').val(res.selectedText);
    // document.querySelector("#colour").value = res.selectedText || 'Firefox red';
  });
}

$(document).ready(loadSwappingText);
$('#saveBtn').click(saveOptions)
//document.addEventListener('DOMContentLoaded', restoreOptions);
//document.querySelector("form").addEventListener("submit", saveOptions);


// var myPort = chrome.runtime.connect({name:"port-from-options"});


// myPort.onMessage.addListener((m) => {
//   console.log("In opions script, received message from background script: ", m);
//   console.log(m);
  
// });
