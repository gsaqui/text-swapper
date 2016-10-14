

/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
    console.log('click');
    chrome.runtime.sendMessage({"type": "dom-parsing2", "dom" :"hello world"});
  var target = e.target;
  while ((target.tagName != "A" || !target.href) && target.parentNode) {
    target = target.parentNode;
  }
  if (target.tagName != "A")
    return;

  console.log("content script sending message");
  //chrome.runtime.sendMessage({"url": target.href});
}

function sendPageDom() {
    console.log('sending page dom');
    chrome.runtime.sendMessage({"type": "dom-parsing", "dom" :document.body});
}

/*
Add notifyExtension() as a listener to click events.
*/
window.addEventListener("click", notifyExtension);
//window.addEventListener('DOMContentLoaded', sendPageDom);

function filterMessage(e){
    console.log("message coming in");
    console.log(e)
}

chrome.runtime.onMessage.addListener(filterMessage);

