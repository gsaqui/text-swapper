
var rows = [];
chrome.storage.local.get('swappingText', (res) => {
    console.log('swapping text', res, (res.swappingText instanceof Object), res.swappingText);
    if(res !== undefined && res !== null && res.swappingText){
        rows = res.swappingText;    
    }
    for (var i = 0; i < rows.length; i++) {

        var tr = document.createElement("tr");

        var hostT = document.createElement('td');
        hostT.appendChild(document.createTextNode("Host:"));

        var host = document.createElement('td');
        host.appendChild(document.createTextNode(rows[i].hostname));

        var fromT = document.createElement('td');
        fromT.appendChild(document.createTextNode("From:"));

        var from = document.createElement('td');
        from.appendChild(document.createTextNode(rows[i].from));

        var toT = document.createElement('td');
        toT.appendChild(document.createTextNode('To:'));

        var to = document.createElement('td');
        to.appendChild(document.createTextNode(rows[i].to));

        tr.appendChild(hostT);
        tr.appendChild(host);
        tr.appendChild(fromT);
        tr.appendChild(from);
        tr.appendChild(toT);
        tr.appendChild(to);
        document.getElementById('swaptable').appendChild(tr);
    };
});

/**
* convert a url string into the the hostname by using a little trick of putting it in the dom just so 
* we can use the js href functions
*/
function getHostname(href) {
    var location = document.createElement("a");
    location.href = href;
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    if (location.host == "") {
      location.href = location.href;
    }
    return location.hostname;
};


function saveOptions(e) {
    console.log('calling save', rows);
    rows.push({
        hostname: document.querySelector('#selected_hostname').value,
        from: document.querySelector('#selected_text').value,
        to: document.querySelector('#swap_text').value
    });
    console.log(rows);
  chrome.storage.local.set({
    swappingText: rows
  });
}

function loadSwappingText() {
  chrome.storage.local.get('selectedText', (res) => {
    console.log('inside of loadswapping', res);
    document.querySelector('#selected_text').value = res.selectedText.text;
    document.querySelector('#selected_hostname').value = getHostname(res.selectedText.hostname);
  });
}


document.addEventListener('DOMContentLoaded', loadSwappingText);
document.querySelector("form").addEventListener("submit", saveOptions);


// var myPort = chrome.runtime.connect({name:"port-from-options"});


// myPort.onMessage.addListener((m) => {
//   console.log("In opions script, received message from background script: ", m);
//   console.log(m);
  
// });
