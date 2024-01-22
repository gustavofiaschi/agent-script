//Storage
if (typeof(Storage) === "undefined") {
    alert(`This browser doesn't support Storage!`);
}
const localStorage = window.localStorage;
// data for the table
const endpointUrl = 'https://api.sampleapis.com/codingresources/codingResources'; 
let tableData = [];

// Function to dynamically fetch and populate the table
async function fetchData() {
    try {
        const response = await fetch(endpointUrl);
        const data = await response.json();
        tableData = data;
        populateTable();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to dynamically populate the table
function populateTable() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';                
    tableData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td class="td-link" onclick="openURL('${item.url}')">${item.description}</td><td>${item.types.join(', ')}</td><td>${item.topics.join(', ')}</td>`;
        tableBody.appendChild(row);
    });
}

// Function to open URL in a new tab
function openURL(url) {
    window.open(url, '_blank');
}

// Function to save data automatically
function saveData(key, value) {                
    console.log(`Saving ${key}: ${value}`);                

    if (typeof(Storage) !== "undefined") {                    
        localStorage.setItem(key, value);
        triggerChangeData();                
    } else {
        console.log('Sorry! No Web Storage support..');
    }
}

function triggerChangeData() {
    document.getElementById("customerName1").innerHTML = localStorage.getItem("firstName");
    document.getElementById("customerName2").innerHTML = localStorage.getItem("firstName");
}

// Fetch data and populate the table on page load
fetchData();