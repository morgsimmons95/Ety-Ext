function searchEty(word) {
    var query = word.selectionText.split(" ")[0]; // Get the first word from the selection
    console.log(query);
    url = "https://www.etymonline.com/word/" + query;
    (async () => {
        const response = await fetch(url).then(
            response => response.text()
        )
        .then(
        )
    })();
}

chrome.contextMenus.removeAll( ()=> 
    chrome.contextMenus.create({
        id: "ety",
        title: "Search etymology for '%s'",
        contexts: ["selection"],
    })
);

chrome.contextMenus.onClicked.addListener(searchEty);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("I got a message from " + sender.tab.url);
    }
);