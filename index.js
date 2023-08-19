const info = document.getElementById("info");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

const onstartSignal = document.getElementById("onstartSignal");
const onaudiostartSignal = document.getElementById("onaudiostartSignal");
const onsoundstartSignal = document.getElementById("onsoundstartSignal");
const onspeechstartSignal = document.getElementById("onspeechstartSignal");

const result = document.getElementById("result");
const resultFinished = document.getElementById("resultFinished");

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;

if ("SpeechRecognition" in window) {
    info.innerText = "ブラウザは音声認識に対応しています。";
    startBtn.removeAttribute("disabled");
} else {
    info.innerText = "ブラウザは音声認識に対応していません。";
}

const recognition = new SpeechRecognition();
recognition.lang = "ja-JP";
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = "";
let ignoreResults = false;
recognition.onresult = (event) => {
    if (ignoreResults) {
        return;
    }

    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript = transcript;
        }
    }
    result.innerHTML = "<span class='finalTranscript'>" + finalTranscript + "</span><span class='interimTranscript'>" + interimTranscript + "</span>";
}

recognition.onerror = (event) => {
    info.innerText = event.error;
}

recognition.onstart = () => {
    startRecognition();
    onstartSignal.style.backgroundColor = "forestgreen";
}
recognition.onend = () => {
    stopRecognition();
    onstartSignal.style.backgroundColor = "crimson";
}
recognition.onaudiostart = () => {
    onaudiostartSignal.style.backgroundColor = "forestgreen";
}
recognition.onaudioend = () => {
    onaudiostartSignal.style.backgroundColor = "crimson";
}
recognition.onsoundstart = () => {
    onsoundstartSignal.style.backgroundColor = "forestgreen";
}
recognition.onsoundend = () => {
    onsoundstartSignal.style.backgroundColor = "crimson";
}
recognition.onspeechstart = () => {
    onspeechstartSignal.style.backgroundColor = "forestgreen";
}
recognition.onspeechend = () => {
    onspeechstartSignal.style.backgroundColor = "crimson";
}

startBtn.onclick = () => {
    startRecognition();
    recognition.start();
}
stopBtn.onclick = () => {
    recognition.stop();
    stopRecognition();
}



function startRecognition() {
    startBtn.setAttribute("disabled", true);
    ignoreResults = false;
    stopBtn.removeAttribute("disabled");
}

function stopRecognition() {
    stopBtn.setAttribute("disabled", true);
    ignoreResults = true;

    if (result.innerText != "") {
        let newElement = document.createElement("div");
        let newContent = document.createTextNode(result.innerText);
        newElement.appendChild(newContent);
        newElement.setAttribute("class", "resultFinishedChild");
        resultFinished.insertBefore(newElement, resultFinished.firstChild);
    }

    finalTranscript = "";
    result.innerHTML = "";

    startBtn.removeAttribute("disabled");
}
