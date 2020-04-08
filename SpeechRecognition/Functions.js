function Refresh() {
  location.reload();
}

function Repeat() {
  window.speechSynthesis.speak(msg);
}

function Stop() {
  window.speechSynthesis.cancel();
  console.log('stopped!');
  recognition.stop();
}

function Caps() {
  final_transcript.replace(final_transcript, function(m) { return m.toUpperCase(); });
}

function CreateCommand() {
  let command = prompt("Please enter a command you want to add");
  let myStorage = window.localStorage;
  if (command != null) {
    myStorage.setItem(command, command);
    commands.push(myStorage.getItem(command));
    console.log('command created');
  }
  setTimeout(function() {
    final_transcript = ' ';
  }, 1000);
}

function Restart() {
  if (recognizing) {
    recognition.stop();
    setTimeout(function() {
      recognition.start();
      final_transcript = '';
      result_span = '';
    }, 1000);
  }
}

function Up() {
  result_span.innerHTML = "\n^";
}

function Down() {
  result_span.innerHTML = "\nv";
}

function Left() {
  result_span.innerHTML = "\n<";
}

function Right() {
  result_span.innerHTML = "\n>";
}

function English() {
  if (recognition.lang != 'en-US') {
    recognition.lang = 'en-US';
    if (recognizing) {
      recognition.stop();
      setTimeout(function(){recognition.start(); final_transcript = ''; result_span = '';}, 500);
    }
  }
}

function Dutch() {
  if (recognition.lang != 'nl-NL') {
    recognition.lang = 'nl-NL';
    if (recognizing) {
      recognition.stop();
      setTimeout(function(){recognition.start(); final_transcript = ''; result_span = '';}, 500);
    }
  }
}

function Arabic() {
  if (recognition.lang != 'ar-EG') {
    recognition.lang = 'ar-EG';
    if (recognizing) {
      recognition.stop();
      setTimeout(function(){recognition.start(); final_transcript = ''; result_span = '';}, 500);
    }
  }
}

function ArabicToEnglish() {
  if(recognition.lang != 'en-US') {
    recognition.lang = 'en-US';
    if (recognizing) {
      recognition.stop();
      setTimeout(function(){recognition.start(); final_transcript = ''; result_span = '';}, 500);
    }
  }
}

function OpenNewTab() {
  let tab = prompt("Please enter, the site you want to go to! (Only the name of the site, .com will be added)");
  if (tab != null) {
    window.open("https://www."+ tab + ".com", "_blank");
    if (recognizing) {
      recognition.stop();
      setTimeout(function(){recognition.start(); final_transcript = ''; result_span = '';}, 500);
    }
  }
}
