var alertShowing = false;

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

function getCaptionFromSearch() {
    const captionQuery = document.getElementById('caption_search_input_field').value;
    console.log(getName());
    document.getElementById('caption_search_input_field').value = '';
    if (getName() !== undefined) {
        fetch('http://localhost:3000/users/search_by_caption', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: getName(), caption: captionQuery })
        })
        .then(response => {
            // figure out how to return and display the response
            return response.json();
        })
    } else {
        showAlert('Please enter a name');
    }
}

function getSleepFromSearch() {
    const sleepQuery = document.getElementById('sleep_search_input_field').value;
    document.getElementById('sleep_search_input_field').value = '';
    if (getName() !== undefined) {
        fetch('http://localhost:3000/users/search_by_sleep', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: getName(), sleep: sleepQuery })
        })
        .then(response => {
            // figure out how to return and display the response
            return response.json();
        })
    } else {
        showAlert('Please enter a name');
    }
}

function getMoodFromSearch() {
    const moodQuery = document.getElementById('mood_search_input_field').value;
    document.getElementById('mood_search_input_field').value = '';
    if (getName() !== undefined) {
        fetch('http://localhost:3000/users/search_by_mood', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: getName(), mood: moodQuery })
        })
        .then(response => {
            // figure out how to return and display the response
            return response.json();
        })
    } else {
        showAlert('Please enter a name');
    }
}

function getDateFromSearch() {
    const dateQuery = document.getElementById('date_search_input_field').value;
    document.getElementById('date_search_input_field').value = '';
    if (getName() !== undefined) {
        fetch('http://localhost:3000/users/search_by_date', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: getName(), date: dateQuery })
        })
        .then(response => {
            // figure out how to return and display the response
            return response.json();
        })
    } else {
        showAlert('Please enter a name');
    }
}

function getName() {
    const userName = document.getElementById('name').value;
    document.getElementById('name').value = '';
}