async function searchEty(word, id) {
    var query = word.selectionText.split(" ")[0]; // Get the first word from the selection
    url = "https://www.etymonline.com/word/" + query; //append that word to the standard url
    return (async () => {
        const response = await fetch(url).then(response => response.text());//then promise resolution
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(id, {type: "fetchedHTML", html: response, word: word}, function(response) {
                console.log(response.allEntries);
                resolve(response.allEntries);
            })
        })
    })();//anonymous async function
}//searchEty

chrome.contextMenus.removeAll( ()=> 
    chrome.contextMenus.create({
        id: "ety",
        title: "Search etymology for '%s' in a new tab",
        contexts: ["selection"],
    })
);

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    if(info.menuItemId == "ety") {
        const allEntries = await searchEty(info, tab.id);
        chrome.tabs.sendMessage(tab.id, {type: "allEntries", word: info.selectionText.split(" ")[0], allEntries: allEntries});
    }//anonymous callback
});
