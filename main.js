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

// Ensure voices are loaded properly on mobile
let voices = [];
function loadVoices() {
    voices = speechSynth.getVoices();
    if (voices.length > 0) {
        populateVoiceOptions();
    } else {
        setTimeout(loadVoices, 100); // Retry if voices are not yet available
    }
}

function populateVoiceOptions() {
    voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
}

speechSynth.onvoiceschanged = loadVoices;
loadVoices();

convertBtn.addEventListener('click', function () {
    const enteredText = text.value;

    if (!enteredText.trim().length) {
        error.textContent = "Nothing to Convert! Enter text in the text area.";
        return;
    }

    error.textContent = "";
    const utterance = new SpeechSynthesisUtterance(enteredText);

    const selectedVoiceName = voiceSelect.value;
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

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
