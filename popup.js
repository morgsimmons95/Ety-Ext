class Entry {
    constructor(name, definition, era){
        this._name = name;
        this._definition = definition;
        this._era = era;
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

    getEra(){
        return this._era;
    }//getDef

    setEra(newEra){
        this._era = newEra;
    }//newEra
};//Entry

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const word = document.getElementById('search').value;
    const allEntries = await getEntries(word);
    const ul = document.getElementById("results");
    ul.innerHTML = '';
    for(let i = 0; i < allEntries.length; i++) {
        let a = document.createElement("a");
        let li = document.createElement("li");
        let bold = document.createElement("strong");
        let name = document.createTextNode(allEntries[i].getName() + " " + allEntries[i].getEra() + ": ");
        bold.appendChild(name);
        li.appendChild(bold);
        li.appendChild(document.createTextNode(allEntries[i].getDefinition()));
        ul.appendChild(li);
    }//for
    if (ul.children.length == 0) {
        a = document.createElement("a");
        a.href = "https://www.etymonline.com/search?q=" + word;
        a.textContent = "There is no entry for your exact search query, but there may be similar or related words.";
        a.onclick = function () {
            chrome.tabs.create({url: "https://www.etymonline.com/search?q=" + word});
        }
        ul.appendChild(a);
    }
    else {
        const a = document.createElement("a");
        a.href = "https://www.etymonline.com/word/" + word.split(" ")[0];
        a.textContent = "More";
        a.onclick = function () {
            chrome.tabs.create({url: "https://www.etymonline.com/word/" + word.split(" ")[0]});
        }
        ul.insertAdjacentElement('afterend', a);
    }
})//addEventListener

async function getEntries(word) {
    var query = word.split(" ")[0]; // Get the first word from the selection
    url = "https://www.etymonline.com/word/" + query; //append that word to the standard url
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const allEntries = [];
    const contents = doc.querySelectorAll('[class^="word--"]');
    for (let i = 0; i < contents.length; i++) {
        let wordName = contents[i].querySelector('[class^="word__name"]').textContent;
        if(wordName.split(" ")[0] == query) {
            let wordDef = contents[i].querySelector('[class^="word__defination"]').textContent; //the query selector field is sic
            let match = wordDef.match(/"([^"]*)"/);
            if(match){
                wordDef = match[1];
                wordDef = wordDef.replace(/,$/, '');
            }
            let eraQuery = contents[i].querySelector('[class^="word__firstRecorded_time"]');
            let wordEra = eraQuery ? eraQuery.textContent : "(multiple)";
            const entry = new Entry(wordName, wordDef, wordEra);
            allEntries.push(entry);
        }
    }//for
    return allEntries;
}
