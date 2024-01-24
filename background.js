async function searchEty(word) {
    var query = word.selectionText.split(" ")[0]; // Get the first word from the selection
    url = "https://www.etymonline.com/word/" + query; //append that word to the standard url
    const response = await fetch(url);
    const code = response.status;
    if (code == 200) {
        chrome.tabs.create({url: url});    
    }
    else {
        chrome.tabs.create({url: "https://www.etymonline.com/search?q=" + query});
    }
}//searchEty

chrome.contextMenus.removeAll( ()=> 
    chrome.contextMenus.create({
        id: "ety",
        title: "Search etymology for '%s' in a new tab",
        contexts: ["selection"],
    })
);

chrome.contextMenus.onClicked.addListener(searchEty);
