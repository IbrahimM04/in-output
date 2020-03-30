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

    for(let i = 0; i < commands.length; i++) {
      if (locate(final_transcript, commands[i])) {
        functions(i);
      }
    }

    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);

    msg.text = final_transcript
    if (final_transcript || interim_transcript) {

    }

  };

  function startDictating(event) {
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

  function functions(index) {
    switch (index) {
      case 0:
        location.reload();
        break;
      case 1:
        location.reload();
        break;
      case 2:
        //window.speechSynthesis.speak(msg);
        break;
      case 3:
        //window.speechSynthesis.speak(msg);
        break;
      case 4:
        window.speechSynthesis.cancel();
        console.log('stopped!');
        recognition.stop();
        break;
      case 5:
        window.speechSynthesis.cancel();
        console.log('stopped!');
        recognition.stop();
        break;
      case 6:
        final_transcript.replace(final_transcript, function(m) { return m.toUpperCase(); });
        break;
      case 7:
        final_transcript.replace(final_transcript, function(m) { return m.toUpperCase(); });
        break;
      case 8:
        commands.push(final_transcript);
        console.log('command created');
        break;
      case 9:
        commands.push(final_transcript);
        console.log('command created');
        break;
      case 10:
        commands.push(final_transcript);
        console.log('command created');
        break;
      case 11:
        commands.push(final_transcript);
        console.log('command created');
        break;
      case 12:
        if (recognizing) {
          recognition.stop();
          setTimeout(function(){
            recognition.start();
            final_transcript = '';
            result_span = '';
          }, 1000);
        }
        break;
      case 13:
        if (recognizing) {
          recognition.stop();
          setTimeout(function(){
            recognition.start();
            final_transcript = '';
            result_span = '';
          }, 1000);
        }
        break;
      case 14:
        result_span.innerHTML = linebreak("^");
        break;
      case 15:
        result_span.innerHTML = linebreak("^");
        break;
      case 16:
        result_span.innerHTML = linebreak("v");
        break;
      case 17:
        result_span.innerHTML = linebreak("v");
        break;
      case 18:
        result_span.innerHTML = linebreak("<");
        break;
      case 19:
        result_span.innerHTML = linebreak("<");
        break;
      case 20:
        result_span.innerHTML = linebreak(">");
        break;
      case 21:
        result_span.innerHTML = linebreak(">");
        break;
      case 22:
        if (recognition.lang != 'en-US') {
          recognition.lang = 'en-US';
          if (recognizing) {
            recognition.stop();
            setTimeout(function(){recognition.start(); final_transcript = '';}, 1000);
          }
        }
        break;
      case 23:
        if (recognition.lang != 'nl-NL') {
          recognition.lang = 'nl-NL';
          if (recognizing) {
            recognition.stop();
            setTimeout(function(){recognition.start(); final_transcript = '';}, 1000);
          }
        }
        break;
      case 24:
        if (recognition.lang != 'ar-EG') {
          recognition.lang = 'ar-EG';
          if (recognizing) {
            recognition.stop();
            setTimeout(function(){recognition.start(); final_transcript = '';}, 1000);
          }
        }
        break;
      case 25:
        if(recognition.lang != 'en-US') {
          recognition.lang = 'en-US';
          if (recognizing) {
            recognition.stop();
            setTimeout(function(){recognition.start(); final_transcript = '';}, 1000);
          }
        }
    }
  }
