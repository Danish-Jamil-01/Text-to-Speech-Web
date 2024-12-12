//main.js

const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const stopBtn = document.getElementById("stopBtn");
const voiceSelect = document.getElementById("voiceSelect");
const volumeSlider = document.getElementById("volumeSlider");
const rateSlider = document.getElementById("rateSlider");
const pitchSlider = document.getElementById("pitchSlider");
const themeToggle = document.getElementById("themeToggle");
const error = document.querySelector('.error-para');

const speechSynth = window.speechSynthesis;

// Populate voices
function populateVoices() {
    const voices = speechSynth.getVoices();
    voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
}

speechSynth.onvoiceschanged = populateVoices;
populateVoices();

convertBtn.addEventListener('click', function () {
    const enteredText = text.value;

    if (!enteredText.trim().length) {
        error.textContent = "Nothing to Convert! Enter text in the text area.";
        return;
    }

    error.textContent = "";
    const utterance = new SpeechSynthesisUtterance(enteredText);

    utterance.voice = speechSynth.getVoices().find(voice => voice.name === voiceSelect.value);
    utterance.volume = parseFloat(volumeSlider.value);
    utterance.rate = parseFloat(rateSlider.value);
    utterance.pitch = parseFloat(pitchSlider.value);

    speechSynth.speak(utterance);
});

stopBtn.addEventListener('click', function () {
    speechSynth.cancel();
});

// Theme toggle for default and dark themes
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('default');
});
