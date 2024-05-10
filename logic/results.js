window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsJSON = JSON.parse(urlParams.get('results'));

    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    resultsJSON.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        const resultText = document.createElement('p');
        resultText.innerText = `Entry ID: ${result.EntryID}, User ID: ${result.UserID}, Emotion ID: ${result.EmotionID}, Sleep Amount: ${result.Sleep_Amount}, Entry Creation Date: ${result.Entry_Creation_Date}, Entry Text: ${result.Entry_Text}`;
        resultDiv.appendChild(resultText);

        // Create an image element
        const imageElement = document.createElement('img');

        const bytes = result.Photo_Data.data;
        const binary = String.fromCharCode.apply(null, bytes);

        imageElement.src = binary;

        imageElement.style.width = '200px';
        imageElement.style.height = '200px';
        resultDiv.appendChild(imageElement);

        document.getElementById('resultsList').appendChild(resultDiv);
    });
}
