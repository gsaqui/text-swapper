


var myPort = chrome.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
  console.log("In content script, received message from background script: ", m);
  console.log(m);
  if(m.type === 'select-text'){
    $('*', 'body')
        // .andSelf()
        .contents()
        .filter(function(){
            return this.nodeType === 3;
        })
        .filter(function(){
            // Only match when contains 'simple string' anywhere in the text
            return this.nodeValue.indexOf(m.text) != -1;
        })
        .each(function(a, b){
            var regexp = new RegExp(m.text, 'ig');
            this.nodeValue = this.nodeValue.replace(regexp, 'soemthing new') ;
        });

  }
});
