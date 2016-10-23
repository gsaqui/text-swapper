


var myPort = chrome.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
  console.log("In content script, received message from background script: ", m);
  console.log(m);
  if(m.type === 'itemsToSwap'){

    chrome.storage.local.get(['swappingText'], function(res){
        console.log('heelo', res);
        if(res.swappingText){
            $('*', 'body')
                .contents()
                .filter(function(){
                    return this.nodeType === 3;
                })
                .filter(function(){
                    // Only match when contains 'simple string' anywhere in the text

                    for(var i=0; i< res.swappingText.length; i++){
                        var text = res.swappingText[i].from;
                        if(this.nodeValue.indexOf(text) != -1){
                            return true;
                        }
                    }

                    return false;
                })
                .each(function(a, b){
                    console.log('here');
                    for(var i=0; i< res.swappingText.length; i++){
                        var text = res.swappingText[i].from;

                        var regexp = new RegExp(text, 'ig');
                        this.nodeValue = this.nodeValue.replace(regexp, res.swappingText[i].to) ;
                        
                    }
                    
                });
        
        }
    });


    
  }

});
