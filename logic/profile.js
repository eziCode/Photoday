const { response } = require("express");

var user_name = '';

function getNameFromField() {
    const name = document.getElementById('name_text_field').value;
    const data = {
        name: name,
        user_name: user_name
    }
    fetch('http://localhost:3000/users/change_name', {
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
            console.log("Error occured while changing name");
        }
        throw new Error('Failed to change name');
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

function getEmailFromField() {
    const email = document.getElementById('email_text_field_input').value;
    const data = {
        email: email,
        user_name: user_name
    }
    fetch('http://localhost:3000/users/change_email', {
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
            console.log("Error occured while changing email");
        }
        throw new Error('Failed to change email');
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

function getName() {
    const name = document.getElementById('name').value;
    document.getElementById('name').value = '';
    user_name = name;
}

function getDeleteAccount() {
    const value = document.getElementById('delete-field').value;
    document.getElementById('delete-field').value = '';
    if (value == "confirm") {
        fetch('http://localhost:3000/users/delete_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({user_name: user_name})
        })
        .then(response => {
            if(response.ok) {
                return response.text();
            } else {
                console.log("Error occured while deleting user");
            }
            throw new Error('Failed to delete user');
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
}