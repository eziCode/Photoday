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

    } else {
        showAlert('Please enter a name');
    }
}

function getSleepFromSearch() {
    const captionQuery = document.getElementById('sleep_search_input_field').value;
    document.getElementById('sleep_search_input_field').value = '';
    if (getName() !== undefined) {

    } else {
        showAlert('Please enter a name');
    }
}

function getMoodFromSearch() {
    const captionQuery = document.getElementById('mood_search_input_field').value;
    document.getElementById('mood_search_input_field').value = '';
    if (getName() !== undefined) {

    } else {
        showAlert('Please enter a name');
    }
}

function getDateFromSearch() {
    const captionQuery = document.getElementById('date_search_input_field').value;
    document.getElementById('date_search_input_field').value = '';
    if (getName() !== undefined) {

    } else {
        showAlert('Please enter a name');
    }
}

function getName() {
    const userName = document.getElementById('name').value;
    document.getElementById('name').value = '';
}