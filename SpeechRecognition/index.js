let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
let recognizing = false;
let ignore_onend;
let start_timestamp;
let final_span = document.getElementById("final_span");
let interim_span = document.getElementById("interim_span");
let result_span = document.getElementById("result");


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
function Capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function Linebreak(s) {
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

    for(let i = 0; i < commands.length; i++) {
      if (i == 0 || i == 1 || i == 4 || i == 5) {
        if (Locate(interim_transcript, commands[i])) {
          Run(i);
        }
      } else {
        if (Locate(final_transcript, commands[i])) {
          Run(i);
        }
      }
    }

    final_transcript = Capitalize(final_transcript);
    final_span.innerHTML = Linebreak(final_transcript);
    interim_span.innerHTML = Linebreak(interim_transcript);

    msg.text = final_transcript
    if (final_transcript || interim_transcript) {

    }

  };

  function StartDictating(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.start();
    ignore_onend = false;
    console.log("Dictating...");
  }

  function Locate(a,b) {
    return a.indexOf(b) >= 0;
  }

  function Run(index) {
    switch (index) {
      case 0:
        Refresh();
      break;
      case 1:
        Refresh();
      break;
      case 2:
        //Repeat();
      break;
      case 3:
        //Repeat();
      break;
      case 4:
        Stop();
      break;
      case 5:
        Stop();
      break;
      case 6:
        Caps();
      break;
      case 7:
        Caps();
      break;
      case 8:
        //CreateCommand();
      break;
      case 9:
        //CreateCommand();
      break;
      case 10:
        //CreateCommand();
      break;
      case 11:
        //CreateCommand();
      break;
      case 12:
        Restart();
      break;
      case 13:
        Restart();
      break;
      case 14:
        Up();
      break;
      case 15:
        Up();
      break;
      case 16:
        Down();
      break;
      case 17:
        Down();
      break;
      case 18:
        Left();
      break;
      case 19:
        Left();
      break;
      case 20:
        Right();
      break;
      case 21:
        Right();
      break;
      case 22:
        English();
      break;
      case 23:
        Dutch();
      break;
      case 24:
        Arabic();
      break;
      case 25:
        ArabicToEnglish();
      break;
      case 26:
        OpenNewTab();
      break;
      case 27:
        OpenNewTab();
      break;
      case 28:
        OpenNewTab();
      break;
      case 29:
        OpenNewTab();
      break;
    }
  }
