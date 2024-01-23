class Entry {
    constructor(name, definition){
        this._name = name;
        this._definition = definition;
    }//constructor

    getName(){
        return this._name;
    }//getName

    setName(newName){
        this._name = newName;
    }//setName

    getDefinition(){
        return this._definition;
    }//getDef

    setDefinition(newDefinition) {
        this._definition = newDefinition;
    }//setDef
};//Entry

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type == "fetchedHTML"){
            const parser = new DOMParser();
            const doc = parser.parseFromString(request.html, "text/html");
            const allEntries = [Entry];
            const contents = doc.querySelectorAll('[class^="word--"]');
            for (let i = 0; i < contents.length; i++) {
                wordName = contents[i].querySelector('[class^="word__name"]').textContent;
                wordDef = contents[i].querySelector('[class^="word__defination"]').textContent; //sic
                const entry = new Entry(wordName, wordDef);
                if(wordName.includes(request.word.selectionText)) {
                    allEntries[i] = entry;
                    console.log("Name: " + entry.getName());
                    console.log("Definition: " + entry.getDefinition());
                }
            }//for
            sendResponse({allEntries: allEntries});
        }//if
        //if the request.type is not fetchedHTML, do nothing
    }
)