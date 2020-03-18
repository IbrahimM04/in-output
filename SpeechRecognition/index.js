let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
let recognizing = false;
let ignore_onend;
let start_timestamp;
let final_span = document.getElementById("final_span");
let interim_span = document.getElementById("interim_span");

var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[1]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.lang = 'en-US';


recognition.onstart = function() {
  recognizing = true;
};

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}


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

    if (locate(interim_transcript, 'Refresh') || locate(interim_transcript, 'refresh')) {
      location.reload();
    }

    if (locate(interim_transcript, 'Repeat') || locate(interim_transcript, 'repeat')) {
      window.speechSynthesis.speak(msg);
      console.log('repeating...');
    }

    if (locate(interim_transcript, 'Stop') || locate(interim_transcript, 'stop')) {
      window.speechSynthesis.cancel();
      console.log('stopped!');
      recognition.stop();
    }

    if (locate(interim_transcript, 'Caps') || locate(interim_transcript, 'caps')) {
      interim_transcript.replace(interim_transcript, function(m) { return m.toUpperCase(); });
    }

    // if(locate(interim_transcript, 'Kill yourself')) {
    //   window.close();
    // }

    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);

    msg.text = interim_transcript;
    if (final_transcript || interim_transcript) {

    }

  };

  function startButton(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.start();
    ignore_onend = false;
    console.log("Dictating...");
  }

  function locate(a,b) {
    return a.indexOf(b) >= 0;
  }
