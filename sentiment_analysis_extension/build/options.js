/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/////////seggings/////////////
let data
let blacklist


// Default values
let defaultBlacklist = ['google.com'];
let defaultData = [
    { label: 'lgbt', option: 'color', checked: false, color: '#00ff00' },
    { label: 'politics', option: 'color', checked: true, color: '#00ff00' },
    { label: 'other', option: 'nothing', checked: false, color: '#0000ff' },
];

// Function to check and set default values if needed
async function checkAndSetDefaults() {
    try {
        // Get the current data and blacklist from storage
        const result = await chrome.storage.local.get(['data', 'blacklist']);

        let shouldSetData = false;
        let shouldSetBlacklist = false;

        // Check if 'data' is empty or undefined
        if (!result.data || result.data.length === 0) {
            shouldSetData = true;
        }

        // Check if 'blacklist' is empty or undefined
        if (!result.blacklist || result.blacklist.length === 0) {
            shouldSetBlacklist = true;
        }

        // Set defaults if needed
        if (shouldSetData || shouldSetBlacklist) {
            let newStorage = {};

            if (shouldSetData) {
                newStorage.data = defaultData;
            }

            if (shouldSetBlacklist) {
                newStorage.blacklist = defaultBlacklist;
            }

            await chrome.storage.local.set(newStorage);
            console.log('Default values set:', newStorage);
        }
    } catch (error) {
        console.error('Error checking or setting default values:', error);
    }
}

// Run the check
checkAndSetDefaults();







document.getElementById('blacklist_txt').value = String((await chrome.storage.local.get("blacklist")).blacklist).replace(/,/g, "\n");



/////////blacklist/////////////


function update_blacklist_click() {
    // Get the text from the textarea
    var textareaValue = document.getElementById("blacklist_txt").value;

    // Split the text by new lines into an array
    var blacklistArray = textareaValue.split("\n");

    chrome.storage.local.set({
        blacklist: blacklistArray
    });

}

document.getElementById("update_blacklist").addEventListener("click", update_blacklist_click);

/////////label list/////////////



data =  (await chrome.storage.local.get("data")).data

function populateTable() {
    const tableBody = document.getElementById('dynamicTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear the table before populating

    data.forEach((item, index) => {
        addRow(item, index);
    });
}

function addRow(item, index) {
    const tableBody = document.getElementById('dynamicTable').getElementsByTagName('tbody')[0];

    const row = document.createElement('tr');

    // Label cell
    const labelCell = document.createElement('td');
    labelCell.innerText = item.label;
    row.appendChild(labelCell);

    // Radio buttons cell
    const radioCell = document.createElement('td');
    ['color', 'redact', 'delete', 'nothing'].forEach(option => {
        const label = document.createElement('label');
        label.innerText = option.charAt(0).toUpperCase() + option.slice(1);

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `options${index}`;
        radio.value = option;
        radio.checked = item.option === option;

        label.appendChild(radio);
        radioCell.appendChild(label);
        radioCell.appendChild(document.createElement('br'));
    });
    row.appendChild(radioCell);

    // Checkbox cell
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.checked;
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    // Color selector cell
    const colorCell = document.createElement('td');
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = item.color;
    colorCell.appendChild(colorInput);
    row.appendChild(colorCell);

    // Delete button cell
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        tableBody.removeChild(row);
        data.splice(index, 1); // Remove the item from the data array
        populateTable(); // Re-populate the table to update indices
    };
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Append row to the table body
    tableBody.appendChild(row);

    // Add the new row to the data array if it's not already there
    if (!data[index]) {
        data.push(item);
    }
}

function addNewRow() {
    const labelInput = document.getElementById('newItemLabel');
    const label = labelInput.value.trim();

    if (label) {
        const newItem = { label: label, option: 'color', checked: false, color: '#000000' };
        addRow(newItem, data.length);
        labelInput.value = ''; // Clear the input field after adding the row
    } else {
        alert('Please enter a label for the new item.');
    }



}

function submitChanges() {
    const tableBody = document.getElementById('dynamicTable').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    // Update the data array based on the current state of the table
    data = Array.from(rows).map((row, index) => {
        const label = row.cells[0].innerText;
        const option = row.querySelector(`input[name="options${index}"]:checked`).value;
        const checked = row.cells[2].querySelector('input[type="checkbox"]').checked;
        const color = row.cells[3].querySelector('input[type="color"]').value;

        return { label, option, checked, color };
    });

    chrome.storage.local.set({data: data});

    console.log('Updated Data:', data);

    const message = {
        action: 'update',
    }

    // Send this message to the service worker.
    chrome.runtime.sendMessage(message)


}




// Populate table on page load
window.onload = populateTable();


document.getElementById("add_new_row").addEventListener("click", addNewRow);
document.getElementById("submit_changes").addEventListener("click", submitChanges);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/options.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8vLy9zZWdnaW5ncy8vLy8vLy8vLy8vLy9cclxubGV0IGRhdGFcclxubGV0IGJsYWNrbGlzdFxyXG5cclxuXHJcbi8vIERlZmF1bHQgdmFsdWVzXHJcbmxldCBkZWZhdWx0QmxhY2tsaXN0ID0gWydnb29nbGUuY29tJ107XHJcbmxldCBkZWZhdWx0RGF0YSA9IFtcclxuICAgIHsgbGFiZWw6ICdsZ2J0Jywgb3B0aW9uOiAnY29sb3InLCBjaGVja2VkOiBmYWxzZSwgY29sb3I6ICcjMDBmZjAwJyB9LFxyXG4gICAgeyBsYWJlbDogJ3BvbGl0aWNzJywgb3B0aW9uOiAnY29sb3InLCBjaGVja2VkOiB0cnVlLCBjb2xvcjogJyMwMGZmMDAnIH0sXHJcbiAgICB7IGxhYmVsOiAnb3RoZXInLCBvcHRpb246ICdub3RoaW5nJywgY2hlY2tlZDogZmFsc2UsIGNvbG9yOiAnIzAwMDBmZicgfSxcclxuXTtcclxuXHJcbi8vIEZ1bmN0aW9uIHRvIGNoZWNrIGFuZCBzZXQgZGVmYXVsdCB2YWx1ZXMgaWYgbmVlZGVkXHJcbmFzeW5jIGZ1bmN0aW9uIGNoZWNrQW5kU2V0RGVmYXVsdHMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBkYXRhIGFuZCBibGFja2xpc3QgZnJvbSBzdG9yYWdlXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnZGF0YScsICdibGFja2xpc3QnXSk7XHJcblxyXG4gICAgICAgIGxldCBzaG91bGRTZXREYXRhID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNob3VsZFNldEJsYWNrbGlzdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiAnZGF0YScgaXMgZW1wdHkgb3IgdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKCFyZXN1bHQuZGF0YSB8fCByZXN1bHQuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2hvdWxkU2V0RGF0YSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiAnYmxhY2tsaXN0JyBpcyBlbXB0eSBvciB1bmRlZmluZWRcclxuICAgICAgICBpZiAoIXJlc3VsdC5ibGFja2xpc3QgfHwgcmVzdWx0LmJsYWNrbGlzdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2hvdWxkU2V0QmxhY2tsaXN0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCBkZWZhdWx0cyBpZiBuZWVkZWRcclxuICAgICAgICBpZiAoc2hvdWxkU2V0RGF0YSB8fCBzaG91bGRTZXRCbGFja2xpc3QpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1N0b3JhZ2UgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG91bGRTZXREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdG9yYWdlLmRhdGEgPSBkZWZhdWx0RGF0YTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZFNldEJsYWNrbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RvcmFnZS5ibGFja2xpc3QgPSBkZWZhdWx0QmxhY2tsaXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQobmV3U3RvcmFnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEZWZhdWx0IHZhbHVlcyBzZXQ6JywgbmV3U3RvcmFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjaGVja2luZyBvciBzZXR0aW5nIGRlZmF1bHQgdmFsdWVzOicsIGVycm9yKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gUnVuIHRoZSBjaGVja1xyXG5jaGVja0FuZFNldERlZmF1bHRzKCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmxhY2tsaXN0X3R4dCcpLnZhbHVlID0gU3RyaW5nKChhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJibGFja2xpc3RcIikpLmJsYWNrbGlzdCkucmVwbGFjZSgvLC9nLCBcIlxcblwiKTtcclxuXHJcblxyXG5cclxuLy8vLy8vLy8vYmxhY2tsaXN0Ly8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZV9ibGFja2xpc3RfY2xpY2soKSB7XHJcbiAgICAvLyBHZXQgdGhlIHRleHQgZnJvbSB0aGUgdGV4dGFyZWFcclxuICAgIHZhciB0ZXh0YXJlYVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibGFja2xpc3RfdHh0XCIpLnZhbHVlO1xyXG5cclxuICAgIC8vIFNwbGl0IHRoZSB0ZXh0IGJ5IG5ldyBsaW5lcyBpbnRvIGFuIGFycmF5XHJcbiAgICB2YXIgYmxhY2tsaXN0QXJyYXkgPSB0ZXh0YXJlYVZhbHVlLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XHJcbiAgICAgICAgYmxhY2tsaXN0OiBibGFja2xpc3RBcnJheVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwZGF0ZV9ibGFja2xpc3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHVwZGF0ZV9ibGFja2xpc3RfY2xpY2spO1xyXG5cclxuLy8vLy8vLy8vbGFiZWwgbGlzdC8vLy8vLy8vLy8vLy9cclxuXHJcblxyXG5cclxuZGF0YSA9ICAoYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwiZGF0YVwiKSkuZGF0YVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhdGVUYWJsZSgpIHtcclxuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkeW5hbWljVGFibGUnKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGJvZHknKVswXTtcclxuICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgdGhlIHRhYmxlIGJlZm9yZSBwb3B1bGF0aW5nXHJcblxyXG4gICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGFkZFJvdyhpdGVtLCBpbmRleCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUm93KGl0ZW0sIGluZGV4KSB7XHJcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHluYW1pY1RhYmxlJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Rib2R5JylbMF07XHJcblxyXG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuXHJcbiAgICAvLyBMYWJlbCBjZWxsXHJcbiAgICBjb25zdCBsYWJlbENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgbGFiZWxDZWxsLmlubmVyVGV4dCA9IGl0ZW0ubGFiZWw7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQobGFiZWxDZWxsKTtcclxuXHJcbiAgICAvLyBSYWRpbyBidXR0b25zIGNlbGxcclxuICAgIGNvbnN0IHJhZGlvQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICBbJ2NvbG9yJywgJ3JlZGFjdCcsICdkZWxldGUnLCAnbm90aGluZyddLmZvckVhY2gob3B0aW9uID0+IHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gb3B0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgb3B0aW9uLnNsaWNlKDEpO1xyXG5cclxuICAgICAgICBjb25zdCByYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgcmFkaW8udHlwZSA9ICdyYWRpbyc7XHJcbiAgICAgICAgcmFkaW8ubmFtZSA9IGBvcHRpb25zJHtpbmRleH1gO1xyXG4gICAgICAgIHJhZGlvLnZhbHVlID0gb3B0aW9uO1xyXG4gICAgICAgIHJhZGlvLmNoZWNrZWQgPSBpdGVtLm9wdGlvbiA9PT0gb3B0aW9uO1xyXG5cclxuICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChyYWRpbyk7XHJcbiAgICAgICAgcmFkaW9DZWxsLmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgICAgICByYWRpb0NlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSk7XHJcbiAgICB9KTtcclxuICAgIHJvdy5hcHBlbmRDaGlsZChyYWRpb0NlbGwpO1xyXG5cclxuICAgIC8vIENoZWNrYm94IGNlbGxcclxuICAgIGNvbnN0IGNoZWNrYm94Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcclxuICAgIGNoZWNrYm94LmNoZWNrZWQgPSBpdGVtLmNoZWNrZWQ7XHJcbiAgICBjaGVja2JveENlbGwuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG4gICAgcm93LmFwcGVuZENoaWxkKGNoZWNrYm94Q2VsbCk7XHJcblxyXG4gICAgLy8gQ29sb3Igc2VsZWN0b3IgY2VsbFxyXG4gICAgY29uc3QgY29sb3JDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgIGNvbnN0IGNvbG9ySW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY29sb3JJbnB1dC50eXBlID0gJ2NvbG9yJztcclxuICAgIGNvbG9ySW5wdXQudmFsdWUgPSBpdGVtLmNvbG9yO1xyXG4gICAgY29sb3JDZWxsLmFwcGVuZENoaWxkKGNvbG9ySW5wdXQpO1xyXG4gICAgcm93LmFwcGVuZENoaWxkKGNvbG9yQ2VsbCk7XHJcblxyXG4gICAgLy8gRGVsZXRlIGJ1dHRvbiBjZWxsXHJcbiAgICBjb25zdCBkZWxldGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZGVsZXRlQnV0dG9uLmlubmVyVGV4dCA9ICdEZWxldGUnO1xyXG4gICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0YWJsZUJvZHkucmVtb3ZlQ2hpbGQocm93KTtcclxuICAgICAgICBkYXRhLnNwbGljZShpbmRleCwgMSk7IC8vIFJlbW92ZSB0aGUgaXRlbSBmcm9tIHRoZSBkYXRhIGFycmF5XHJcbiAgICAgICAgcG9wdWxhdGVUYWJsZSgpOyAvLyBSZS1wb3B1bGF0ZSB0aGUgdGFibGUgdG8gdXBkYXRlIGluZGljZXNcclxuICAgIH07XHJcbiAgICBkZWxldGVDZWxsLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQ2VsbCk7XHJcblxyXG4gICAgLy8gQXBwZW5kIHJvdyB0byB0aGUgdGFibGUgYm9keVxyXG4gICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBuZXcgcm93IHRvIHRoZSBkYXRhIGFycmF5IGlmIGl0J3Mgbm90IGFscmVhZHkgdGhlcmVcclxuICAgIGlmICghZGF0YVtpbmRleF0pIHtcclxuICAgICAgICBkYXRhLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5ld1JvdygpIHtcclxuICAgIGNvbnN0IGxhYmVsSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3SXRlbUxhYmVsJyk7XHJcbiAgICBjb25zdCBsYWJlbCA9IGxhYmVsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7IGxhYmVsOiBsYWJlbCwgb3B0aW9uOiAnY29sb3InLCBjaGVja2VkOiBmYWxzZSwgY29sb3I6ICcjMDAwMDAwJyB9O1xyXG4gICAgICAgIGFkZFJvdyhuZXdJdGVtLCBkYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgbGFiZWxJbnB1dC52YWx1ZSA9ICcnOyAvLyBDbGVhciB0aGUgaW5wdXQgZmllbGQgYWZ0ZXIgYWRkaW5nIHRoZSByb3dcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBlbnRlciBhIGxhYmVsIGZvciB0aGUgbmV3IGl0ZW0uJyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1Ym1pdENoYW5nZXMoKSB7XHJcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHluYW1pY1RhYmxlJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Rib2R5JylbMF07XHJcbiAgICBjb25zdCByb3dzID0gdGFibGVCb2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0cicpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSB0aGUgZGF0YSBhcnJheSBiYXNlZCBvbiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgdGFibGVcclxuICAgIGRhdGEgPSBBcnJheS5mcm9tKHJvd3MpLm1hcCgocm93LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gcm93LmNlbGxzWzBdLmlubmVyVGV4dDtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSByb3cucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIm9wdGlvbnMke2luZGV4fVwiXTpjaGVja2VkYCkudmFsdWU7XHJcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9IHJvdy5jZWxsc1syXS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gcm93LmNlbGxzWzNdLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjb2xvclwiXScpLnZhbHVlO1xyXG5cclxuICAgICAgICByZXR1cm4geyBsYWJlbCwgb3B0aW9uLCBjaGVja2VkLCBjb2xvciB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtkYXRhOiBkYXRhfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ1VwZGF0ZWQgRGF0YTonLCBkYXRhKTtcclxuXHJcbiAgICBjb25zdCBtZXNzYWdlID0ge1xyXG4gICAgICAgIGFjdGlvbjogJ3VwZGF0ZScsXHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCB0aGlzIG1lc3NhZ2UgdG8gdGhlIHNlcnZpY2Ugd29ya2VyLlxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UobWVzc2FnZSlcclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBQb3B1bGF0ZSB0YWJsZSBvbiBwYWdlIGxvYWRcclxud2luZG93Lm9ubG9hZCA9IHBvcHVsYXRlVGFibGUoKTtcclxuXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9uZXdfcm93XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGROZXdSb3cpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdF9jaGFuZ2VzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRDaGFuZ2VzKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsInZhciB3ZWJwYWNrUXVldWVzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBxdWV1ZXNcIikgOiBcIl9fd2VicGFja19xdWV1ZXNfX1wiO1xudmFyIHdlYnBhY2tFeHBvcnRzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBleHBvcnRzXCIpIDogXCJfX3dlYnBhY2tfZXhwb3J0c19fXCI7XG52YXIgd2VicGFja0Vycm9yID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sKFwid2VicGFjayBlcnJvclwiKSA6IFwiX193ZWJwYWNrX2Vycm9yX19cIjtcbnZhciByZXNvbHZlUXVldWUgPSAocXVldWUpID0+IHtcblx0aWYocXVldWUgJiYgcXVldWUuZCA8IDEpIHtcblx0XHRxdWV1ZS5kID0gMTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSkpO1xuXHRcdHF1ZXVlLmZvckVhY2goKGZuKSA9PiAoZm4uci0tID8gZm4ucisrIDogZm4oKSkpO1xuXHR9XG59XG52YXIgd3JhcERlcHMgPSAoZGVwcykgPT4gKGRlcHMubWFwKChkZXApID0+IHtcblx0aWYoZGVwICE9PSBudWxsICYmIHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZihkZXBbd2VicGFja1F1ZXVlc10pIHJldHVybiBkZXA7XG5cdFx0aWYoZGVwLnRoZW4pIHtcblx0XHRcdHZhciBxdWV1ZSA9IFtdO1xuXHRcdFx0cXVldWUuZCA9IDA7XG5cdFx0XHRkZXAudGhlbigocikgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0V4cG9ydHNdID0gcjtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdG9ialt3ZWJwYWNrRXJyb3JdID0gZTtcblx0XHRcdFx0cmVzb2x2ZVF1ZXVlKHF1ZXVlKTtcblx0XHRcdH0pO1xuXHRcdFx0dmFyIG9iaiA9IHt9O1xuXHRcdFx0b2JqW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAoZm4ocXVldWUpKTtcblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fVxuXHR9XG5cdHZhciByZXQgPSB7fTtcblx0cmV0W3dlYnBhY2tRdWV1ZXNdID0geCA9PiB7fTtcblx0cmV0W3dlYnBhY2tFeHBvcnRzXSA9IGRlcDtcblx0cmV0dXJuIHJldDtcbn0pKTtcbl9fd2VicGFja19yZXF1aXJlX18uYSA9IChtb2R1bGUsIGJvZHksIGhhc0F3YWl0KSA9PiB7XG5cdHZhciBxdWV1ZTtcblx0aGFzQXdhaXQgJiYgKChxdWV1ZSA9IFtdKS5kID0gLTEpO1xuXHR2YXIgZGVwUXVldWVzID0gbmV3IFNldCgpO1xuXHR2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuXHR2YXIgY3VycmVudERlcHM7XG5cdHZhciBvdXRlclJlc29sdmU7XG5cdHZhciByZWplY3Q7XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlaikgPT4ge1xuXHRcdHJlamVjdCA9IHJlajtcblx0XHRvdXRlclJlc29sdmUgPSByZXNvbHZlO1xuXHR9KTtcblx0cHJvbWlzZVt3ZWJwYWNrRXhwb3J0c10gPSBleHBvcnRzO1xuXHRwcm9taXNlW3dlYnBhY2tRdWV1ZXNdID0gKGZuKSA9PiAocXVldWUgJiYgZm4ocXVldWUpLCBkZXBRdWV1ZXMuZm9yRWFjaChmbiksIHByb21pc2VbXCJjYXRjaFwiXSh4ID0+IHt9KSk7XG5cdG1vZHVsZS5leHBvcnRzID0gcHJvbWlzZTtcblx0Ym9keSgoZGVwcykgPT4ge1xuXHRcdGN1cnJlbnREZXBzID0gd3JhcERlcHMoZGVwcyk7XG5cdFx0dmFyIGZuO1xuXHRcdHZhciBnZXRSZXN1bHQgPSAoKSA9PiAoY3VycmVudERlcHMubWFwKChkKSA9PiB7XG5cdFx0XHRpZihkW3dlYnBhY2tFcnJvcl0pIHRocm93IGRbd2VicGFja0Vycm9yXTtcblx0XHRcdHJldHVybiBkW3dlYnBhY2tFeHBvcnRzXTtcblx0XHR9KSlcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG5cdFx0XHRmbiA9ICgpID0+IChyZXNvbHZlKGdldFJlc3VsdCkpO1xuXHRcdFx0Zm4uciA9IDA7XG5cdFx0XHR2YXIgZm5RdWV1ZSA9IChxKSA9PiAocSAhPT0gcXVldWUgJiYgIWRlcFF1ZXVlcy5oYXMocSkgJiYgKGRlcFF1ZXVlcy5hZGQocSksIHEgJiYgIXEuZCAmJiAoZm4ucisrLCBxLnB1c2goZm4pKSkpO1xuXHRcdFx0Y3VycmVudERlcHMubWFwKChkZXApID0+IChkZXBbd2VicGFja1F1ZXVlc10oZm5RdWV1ZSkpKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gZm4uciA/IHByb21pc2UgOiBnZXRSZXN1bHQoKTtcblx0fSwgKGVycikgPT4gKChlcnIgPyByZWplY3QocHJvbWlzZVt3ZWJwYWNrRXJyb3JdID0gZXJyKSA6IG91dGVyUmVzb2x2ZShleHBvcnRzKSksIHJlc29sdmVRdWV1ZShxdWV1ZSkpKTtcblx0cXVldWUgJiYgcXVldWUuZCA8IDAgJiYgKHF1ZXVlLmQgPSAwKTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL29wdGlvbnMuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=