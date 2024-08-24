
// WeakSet to track processed text nodes

function isBlacklisted(url, callback) {
    chrome.storage.local.get("blacklist", (data) => {
        const blacklist = data.blacklist || [];
        const hostname = new URL(url).hostname;

        const isBlacklisted = blacklist.some(blacklistedDomain => hostname.includes(blacklistedDomain));

        callback(isBlacklisted);
    });
}




isBlacklisted(window.location.href, (blacklisted) => {
    if (blacklisted) {
        console.log("This website is blacklisted. The extension will not run.");
        return;
    }


    const processedNodes = new WeakSet();

    // Function to process a text node
    function processTextNode(textNode) {
        chrome.runtime.sendMessage({ action: 'classify', text: textNode.nodeValue.trim() }, function(response) {
            if (response) {
                const parent = textNode.parentNode;
                if (parent) {
                    const newElement = document.createElement('span');
                    switch (response) {
                        case 'delete':
                            parent.removeChild(textNode); // Remove the text node
                            break;
                        case 'censor':
                            newElement.textContent = '[CENSORED]'; // Replace with [CENSORED]
                            parent.replaceChild(newElement, textNode);
                            break;
                        case 'nothing':

                            break;

                        default:
                            newElement.style.color = response; // Color the text red
                            newElement.textContent = textNode.nodeValue;
                            parent.replaceChild(newElement, textNode);
                            break;
                    }
                }
            }
        });
    }

    // Function to traverse and process text nodes
    function traverseNodes(node) {
        const ignoreTags = ['STYLE', 'SCRIPT', 'NOSCRIPT', 'IFRAME', 'HEAD', 'META'];
        
        // Ignore nodes that are in the ignoreTags list
        if (ignoreTags.includes(node.nodeName)) {
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.trim() && !processedNodes.has(node)) {
                processedNodes.add(node);
                processTextNode(node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(traverseNodes); // Traverse child nodes
        }
    }

    // Set up MutationObserver to handle dynamically added content
    function setupMutationObserver() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        // Process nodes added to the DOM
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            traverseNodes(node);
                        }
                    });
                }
            }
        });

        // Configure the observer to watch for changes in the whole document body
        observer.observe(document.body, { childList: true, subtree: true });

        // Start processing the existing content
        traverseNodes(document.body);
    }

    // Run setup function when the document is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMutationObserver);
    } else {
        setupMutationObserver();
    }



});
