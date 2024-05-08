function getNameFromField() {
    const name = document.getElementById('name_text_field').value;
    fetch('http://localhost:3000/users/change_name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(name)
    })
}

function getEmailFromField() {
    const name = document.getElementById('email_text_field_input').value;
    fetch('http://localhost:3000/users/change_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(email)
    })
}