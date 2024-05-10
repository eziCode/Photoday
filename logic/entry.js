function format_date() {
    const currentDate = new Date();
    let formattedDateTime = currentDate.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const hours = currentDate.getHours() % 24;
    formattedDateTime = formattedDateTime.replace(/\d{2}(?=:)/, ('0' + hours).slice(-2));
    return formattedDateTime;
}


class JournalEntry {
    constructor() {
        this.creation_date = format_date();
    }
    set emotions(emotions) {
        this._emotions = emotions;
    }

    set photo(photo) {
        this._photo = photo;
    }
}

class Photo {
    constructor () {
        this.creation_date = format_date();
        this._caption = '';
    }

    set caption(caption) {
        this._caption = caption;
    }

    set photo(photo) {
        this._photo = photo;
    }
    
    resetClass() {
        this._caption = '';
    }
}

class Emotions {
    constructor () {
        this.creation_date = format_date();
        this._mood = '';
        this._sleep_amount = -1;
    }

    set sleep_amount(sleep_amount) {
        this._sleep_amount = sleep_amount;
    }

    set mood(mood) {
        this._mood = mood;
    }

    resetClass() {
        this._mood = '';
        this._sleep_amount = -1;
    }
}

let video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
.then(function(stream) {
    video.srcObject = stream;
    video.play();
})
.catch(function(error) {
    console.error('Error accessing camera:', error);
});

let entry = new JournalEntry();
let photo = new Photo();
let emotions = new Emotions();
let user_name = '';

function capturePhoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/png', 0.5);
    photo.photo = photoData;
}

function getHours(button) {
    const sleepHours = parseInt(button.textContent);
    // Upload hours to backend
    emotions.sleep_amount = sleepHours;
}

function getMood(button) {
    const mood_map = {"😀": "happy", "😔": "sad", "😫": "anxious"}
    const mood = mood_map[button.textContent];
    // Upload mood to backend
    emotions.mood = mood;
}

function getCaption() {
    const caption = document.getElementById('caption').value;
    document.getElementById('caption').value = '';
    // Upload caption to backend
    photo.caption = caption;
}

function getName() {
    const name = document.getElementById('name').value;
    document.getElementById('name').value = '';
    user_name = name;
}

function submitEntry() {
    // Upload entry to backend
    if (user_name === '') {
        console.error('Name is required');
        return;
    }
    if (emotions._mood === '' || emotions._sleep_amount === -1) {
        console.error('Mood and sleep amount are required');
        return;
    }
    if (photo._photo === '') {
        console.error('Photo is required');
        return;
    }
    if (photo._caption === '') {
        console.error('Caption is required');
        return;
    }
    entry.emotions = emotions;
    entry.photo = photo;
    const entryData = {
        name: user_name,
        entry: {
            creation_date: entry.creation_date,
            emotions: {
                mood: emotions._mood,
                sleep_amount: emotions._sleep_amount
            },
            photo: {
                photo: "reference_url_placeholder", // need to figure out how to store the photo
                caption: photo._caption
            }
        }
    };
    fetch('http://localhost:3000/users/insert_entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Entry submitted successfully');
            // Clear entry form
            emotions.resetClass();
            photo.resetClass();
        } else {
            console.error('Failed to submit entry: ', response.text());
        }
    })
    .catch(error => {
        console.error('Error submitting entry:', error);
    });
}