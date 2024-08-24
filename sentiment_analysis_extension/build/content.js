/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHFEQUFxRDtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDBDQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zcmMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcbi8vIFdlYWtTZXQgdG8gdHJhY2sgcHJvY2Vzc2VkIHRleHQgbm9kZXNcclxuXHJcbmZ1bmN0aW9uIGlzQmxhY2tsaXN0ZWQodXJsLCBjYWxsYmFjaykge1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwiYmxhY2tsaXN0XCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYmxhY2tsaXN0ID0gZGF0YS5ibGFja2xpc3QgfHwgW107XHJcbiAgICAgICAgY29uc3QgaG9zdG5hbWUgPSBuZXcgVVJMKHVybCkuaG9zdG5hbWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQmxhY2tsaXN0ZWQgPSBibGFja2xpc3Quc29tZShibGFja2xpc3RlZERvbWFpbiA9PiBob3N0bmFtZS5pbmNsdWRlcyhibGFja2xpc3RlZERvbWFpbikpO1xyXG5cclxuICAgICAgICBjYWxsYmFjayhpc0JsYWNrbGlzdGVkKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5pc0JsYWNrbGlzdGVkKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCAoYmxhY2tsaXN0ZWQpID0+IHtcclxuICAgIGlmIChibGFja2xpc3RlZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyB3ZWJzaXRlIGlzIGJsYWNrbGlzdGVkLiBUaGUgZXh0ZW5zaW9uIHdpbGwgbm90IHJ1bi5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBwcm9jZXNzZWROb2RlcyA9IG5ldyBXZWFrU2V0KCk7XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gdG8gcHJvY2VzcyBhIHRleHQgbm9kZVxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1RleHROb2RlKHRleHROb2RlKSB7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdjbGFzc2lmeScsIHRleHQ6IHRleHROb2RlLm5vZGVWYWx1ZS50cmltKCkgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0ZXh0Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkZWxldGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHRleHROb2RlKTsgLy8gUmVtb3ZlIHRoZSB0ZXh0IG5vZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW5zb3InOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9ICdbQ0VOU09SRURdJzsgLy8gUmVwbGFjZSB3aXRoIFtDRU5TT1JFRF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWxlbWVudCwgdGV4dE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vdGhpbmcnOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0VsZW1lbnQuc3R5bGUuY29sb3IgPSByZXNwb25zZTsgLy8gQ29sb3IgdGhlIHRleHQgcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dE5vZGUubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCB0ZXh0Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGdW5jdGlvbiB0byB0cmF2ZXJzZSBhbmQgcHJvY2VzcyB0ZXh0IG5vZGVzXHJcbiAgICBmdW5jdGlvbiB0cmF2ZXJzZU5vZGVzKG5vZGUpIHtcclxuICAgICAgICBjb25zdCBpZ25vcmVUYWdzID0gWydTVFlMRScsICdTQ1JJUFQnLCAnTk9TQ1JJUFQnLCAnSUZSQU1FJywgJ0hFQUQnLCAnTUVUQSddO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElnbm9yZSBub2RlcyB0aGF0IGFyZSBpbiB0aGUgaWdub3JlVGFncyBsaXN0XHJcbiAgICAgICAgaWYgKGlnbm9yZVRhZ3MuaW5jbHVkZXMobm9kZS5ub2RlTmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVWYWx1ZS50cmltKCkgJiYgIXByb2Nlc3NlZE5vZGVzLmhhcyhub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkTm9kZXMuYWRkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc1RleHROb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICBub2RlLmNoaWxkTm9kZXMuZm9yRWFjaCh0cmF2ZXJzZU5vZGVzKTsgLy8gVHJhdmVyc2UgY2hpbGQgbm9kZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IHVwIE11dGF0aW9uT2JzZXJ2ZXIgdG8gaGFuZGxlIGR5bmFtaWNhbGx5IGFkZGVkIGNvbnRlbnRcclxuICAgIGZ1bmN0aW9uIHNldHVwTXV0YXRpb25PYnNlcnZlcigpIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnNMaXN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIG5vZGVzIGFkZGVkIHRvIHRoZSBET01cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ29uZmlndXJlIHRoZSBvYnNlcnZlciB0byB3YXRjaCBmb3IgY2hhbmdlcyBpbiB0aGUgd2hvbGUgZG9jdW1lbnQgYm9keVxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IHByb2Nlc3NpbmcgdGhlIGV4aXN0aW5nIGNvbnRlbnRcclxuICAgICAgICB0cmF2ZXJzZU5vZGVzKGRvY3VtZW50LmJvZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJ1biBzZXR1cCBmdW5jdGlvbiB3aGVuIHRoZSBkb2N1bWVudCBpcyBmdWxseSBsb2FkZWRcclxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2V0dXBNdXRhdGlvbk9ic2VydmVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0dXBNdXRhdGlvbk9ic2VydmVyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=