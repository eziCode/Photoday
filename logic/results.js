window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultsJSON = JSON.parse(urlParams.get('results'));

    resultsJSON.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        const resultText = document.createElement('p');
        resultText.innerText = `Entry ID: ${result.EntryID}, User ID: ${result.UserID}, Emotion ID: ${result.EmotionID}, Sleep Amount: ${result.Sleep_Amount}, Entry Creation Date: ${result.Entry_Creation_Date}, Entry Text: ${result.Entry_Text}`;
        resultDiv.appendChild(resultText);

        document.getElementById('resultsList').appendChild(resultDiv);
    });
}
