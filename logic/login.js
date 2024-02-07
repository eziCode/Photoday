function loginButtonTapped() {
    // TODO: Check against authentication db
    let username = document.getElementById("usernameField").value;
    let password = document.getElementById("passwordField").value;

    let data = {
        username: username,
        password: password
    };
}