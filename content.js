

/*
If the click was on a link, send a message to the background page.
The message contains the link's URL.
*/
function notifyExtension(e) {
    console.log('click', document.body);
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
window.addEventListener('DOMContentLoaded', sendPageDom);

function filterMessage(e){
    console.log("message coming in");
    console.log(document.body);
    chrome.runtime.sendMessage({"type": "dom-parsing", "dom" :document.body});   
}

chrome.runtime.onMessage.addListener(filterMessage);




var myPort = chrome.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
  console.log("In content script, received message from background script: ", document.body);
  console.log(m);
  if(m.type === 'select-text'){
    console.log('hi there');
    console.log(jQuery, m.text);
    //var foundin = $('*:contains("'+ m.text +'")');
    //console.log('hay', foundin[1]);

    $('*', 'body')
        .andSelf()
        .contents()
        .filter(function(){
            return this.nodeType === 3;
        })
        .filter(function(){
            // Only match when contains 'simple string' anywhere in the text
            return this.nodeValue.indexOf(m.text) != -1;
        })
        .each(function(a, b){
            // Do something with this.nodeValue
            console.log(a, b);
        });

  }
});

/*
document.body.addEventListener("click", function() {
  myPort.postMessage({greeting: "they clicked the page!"});
});
*/