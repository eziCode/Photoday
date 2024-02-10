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

function capturePhoto() {
    let button = document.getElementById('capture-photo-button');
    // Link button to backend and capture photo
}

function getHours(button) {
    const sleepHours = parseInt(button.textContent);
    // Upload hours to backend
}

function getMood(button) {
    const mood_map = {"😀": "happy", "😔": "sad", "😫": "anxious"}
    const mood = mood_map[button.textContent];
    // Upload mood to backend
}