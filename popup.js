chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == "allEntries") {
            console.log("I dont know");
            const newTitle = document.createElement("h1");
            newTitle.textContent = request.word;
            document.body.insertBefore(newTitle, document.body.firstChild);
            sendResponse({truth: true});
        }//if
        //if the request type is not allEntries, do nothing
})