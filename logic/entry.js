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

function capturePhoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    // Link button to backend and capture photo
    photo.photo = dataURL;
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

function submitEntry() {
    // Upload entry to backend
    entry.emotions = emotions;
    entry.photo = photo;
    // Clear entry form
    emotions.resetClass();
    photo.resetClass();
}