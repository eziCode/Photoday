function loginButtonTapped() {
    hideErrorMessage();
    // Check against authentication db

    let username = document.getElementById("usernameField").value;
    let password = document.getElementById("passwordField").value;

    if (username === "" || password === "") {
        showErrorMessage("Please fill in all fields.");
        return;
    }

    let data = {
        username: username,
        password: password
    };

    fetch('http://localhost:3000/users/login', {
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
            showErrorMessage("Cannot find user. Please try again.");
        }
        throw new Error('Failed to login');
    })
    .then(result =>{
        if (result.trim() === 'Success') {
            window.location.href = 'http://127.0.0.1:5500/src/index.html';
        }
        showErrorMessage("Incorrect password. Please try again.");
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showErrorMessage(message) {
    let errorMessageContainer = document.getElementById("error-message-container");
    let errorLabel = document.getElementById("error-message");
    errorMessageContainer.style.display = "flex";
    errorLabel.textContent = `${message}`;
}

function hideErrorMessage() {
    let errorMessageContainer = document.getElementById("error-message-container");
    errorMessageContainer.style.display = "none";
}