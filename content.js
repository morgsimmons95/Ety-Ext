let iframe = document.createElement('iframe');
iframe.style.display = 'none';
document.body.appendChild(iframe);
console.log("An iframe was created at " + document.body.lastChild);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(request.html, "text/html");
        let definition = doc.querySelectorAll('[class^="word"]')[0].textContent;
        sendResponse({definition: definition});
    }
)