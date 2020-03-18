start();

let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
let recognizing = false;
let ignore_onend;
let start_timestamp;

let functions = ['omhoog', 'omlaag', 'rechts', 'links', 'vooruit', 'achteruit', 'landen', 'opstijgen', 'calibrate', 'zweven', 'blink', 'draai links', 'draai rechts', 'stop'];

recognition.onstart = function() {
  recognizing = true;
};


recognition.onerror = function(event) {
  if (event.error == 'no-speech') {
    ignore_onend = true;
  }
  if (event.error == 'audio-capture') {
    ignore_onend = true;
  }
  if (event.error == 'not-allowed') {
    if (event.timeStamp - start_timestamp < 100) {
    } else {
    }
    ignore_onend = true;
  }
};

recognition.onend = function() {
  recognizing = false;
  if (ignore_onend) {
    return;
  }
}

  recognition.onresult = function(event) {
    var interim_transcript = '';

    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    var result = event.results[0][0].transcript;

    if (locate(interim_transcript, functions[0])) {

    }

    final_transcript = capitalize(final_transcript);

    if (final_transcript || interim_transcript) {

    }

  };

  function start(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    recognition.start();
    ignore_onend = false;
    console.log("Dictating...");
  }

  function locate(a,b) {
    return a.indexOf(b) >= 0;
  }
