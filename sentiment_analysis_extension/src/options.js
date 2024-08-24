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
