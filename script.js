const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function textToSpeech(jokeString) {
    VoiceRSS.speech({
        key: '7cee96a0c655494e9d001431b89858cb',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from joke Api

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,racist,sexist,religious';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        joke = createJoke(data);
        // Text-to-Speech
        textToSpeech(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch error here
        console.log("Whoops, ",error)
    }
}

function createJoke(data) {
    if(data.setup)
        return `${data.setup} ... ${data.delivery}`;
    else 
        return data.joke;
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
    

// For passing params later, use 
// https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious&contains=Hello&amount=2
