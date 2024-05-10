var alertShowing = false;
var userName = '';

function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.textContent = message;
    if (alertShowing) {
        return;
    }
    alertShowing = true;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

function displayResults(results) {
    // Assuming results is an array of objects
    console.log(results);
    if (results.length === 0) {
        showAlert('No results found');
        return;
    }
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    // Show JSON response
    const jsonContainer = document.createElement('pre');
    jsonContainer.textContent = JSON.stringify(results, null, 2);
    document.body.appendChild(jsonContainer);
}

function getCaptionFromSearch() {
    const captionQuery = document.getElementById('caption_search_input_field').value;
    document.getElementById('caption_search_input_field').value = '';
    if (userName !== undefined) {
        fetch('http://localhost:3000/users/search_by_caption?name=${userName}&caption=${captionQuery}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'http://127.0.0.1:5500/src/results.html'
            displayResults(data);
        })
        .catch(err => {
            console.log('Error searching by caption: ', err);
        });
    } else {
        showAlert('Please enter a name');
    }
}

function getSleepFromSearch() {
    const sleepQuery = document.getElementById('sleep_search_input_field').value;
    document.getElementById('sleep_search_input_field').value = '';
    if (userName !== undefined) {
        fetch('http://localhost:3000/users/search_by_sleep?name=${userName}&sleep=${sleepQuery}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'http://127.0.0.1:5500/src/results.html'
            displayResults(data);
        })
        .catch(err => console.log('Error searching by sleep: ', err));
    } else {
        showAlert('Please enter a name');
    }
}

function getMoodFromSearch() {
    const moodQuery = document.getElementById('mood_search_input_field').value;
    document.getElementById('mood_search_input_field').value = '';
    if (userName !== undefined) {
        fetch('http://localhost:3000/users/search_by_mood?name=${userName}&mood=${moodQuery}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'http://127.0.0.1:5500/src/results.html'
            displayResults(data);
        })
        .catch(err => console.log('Error searching by mood: ', err));
    } else {
        showAlert('Please enter a name');
    }
}

function getDateFromSearch() {
    const dateQuery = document.getElementById('date_search_input_field').value;
    document.getElementById('date_search_input_field').value = '';
    if (userName !== undefined) {
        fetch('http://localhost:3000/users/search_by_date?name=${userName}&date=${dateQuery}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'http://127.0.0.1:5500/src/results.html'
            displayResults(data);
        })
        .catch(err => console.log('Error searching by date: ', err));
    } else {
        showAlert('Please enter a name');
    }
}

function getName() {
    const name = document.getElementById('name').value;
    userName = name;
    document.getElementById('name').value = '';
}