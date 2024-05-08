function createAccountButtonTapped() {
    hideErrorMessage();
    // TODO: Save name and email in database
    let name = document.getElementById('nameField').value;
    let email = document.getElementById('emailField').value;
    let username = document.getElementById('usernameField').value;
    let password = document.getElementById('passwordField').value;

    if (name === '' || email === '' || username === '' || password === '') {
        showErrorMessage('Please fill in all fields.');
        return;
    }

    let data = {
        username: username,
        password: password,
        name: name,
        email: email
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(response => {
        if(response.ok) {
            return response.text();
        } else {
            throw new Error('Failed to login');
        }
    })
    .then(result =>{
        if (result.trim() === 'Success') {
            window.location.href = 'http://127.0.0.1:5500/src/index.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showErrorMessage(message) {
    let errorMessageContainer = document.getElementById('error-message-container-account-creation');
    let errorLabel = document.getElementById('error-message-account-creation');
    errorMessageContainer.style.display = 'flex';
    errorLabel.textContent = `${message}`;
}

function hideErrorMessage() {
    let errorMessageContainer = document.getElementById('error-message-container-account-creation');
    errorMessageContainer.style.display = 'none';
}