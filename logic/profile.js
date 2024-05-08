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
}

function getName() {
    const name = document.getElementById('name').value;
    document.getElementById('name').value = '';
    user_name = name;
}