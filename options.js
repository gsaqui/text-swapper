
var rows = [];
chrome.storage.local.get('swappingText', (res) => {
    console.log('swapping text', res, (res.swappingText instanceof Object), res.swappingText);
    if(res !== undefined && res !== null && res.swappingText){
        rows = res.swappingText;    
    }
    for (var i = 0; i < rows.length; i++) {

        var tr = document.createElement("tr");

        var fromT = document.createElement('td');
        fromT.appendChild(document.createTextNode("From:"));

        var from = document.createElement('td');
        from.appendChild(document.createTextNode(rows[i].from));

        var toT = document.createElement('td');
        toT.appendChild(document.createTextNode('To:'));

        var to = document.createElement('td');
        to.appendChild(document.createTextNode(rows[i].to));

        tr.appendChild(fromT);
        tr.appendChild(from);
        tr.appendChild(toT);
        tr.appendChild(to);
        document.getElementById('swaptable').appendChild(tr);
    };
});

function saveOptions(e) {
    console.log('calling save', rows);
    rows.push({
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
    console.log(res);
    // document.querySelector("#colour").value = res.selectedText || 'Firefox red';
    document.querySelector('#selected_text').value = res.selectedText;
  });
}


document.addEventListener('DOMContentLoaded', loadSwappingText);
document.querySelector("form").addEventListener("submit", saveOptions);


// var myPort = chrome.runtime.connect({name:"port-from-options"});


// myPort.onMessage.addListener((m) => {
//   console.log("In opions script, received message from background script: ", m);
//   console.log(m);
  
// });
