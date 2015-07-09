
var d = document;
var recordButton = d.getElementById('startRecrodBut1');
var stopButton = d.getElementById('stopRecBut1');

// hide stop button initially
stopButton.style.display = 'none';


recordButton.addEventListener("click" , function(event){
  event.preventDefault();

  recordButton.style.display = 'none';
  stopButton.style.display = 'inline-block';

	virec.startCapture(); // this will start recording video and the audio
	startCountDown(null);
});

stopButton.addEventListener("click" , function(event){
  event.preventDefault();

  recordButton.style.display = 'inline-block';
  stopButton.style.display = 'none';

	/*
		stops the recording and after recording is finalized oncaptureFinish call back
		will occur
	*/
	virec.stopCapture(oncaptureFinish);
});

// ----
// dialog

var somedialog = document.getElementById('somedialog');
var dlg = new DialogFx( somedialog );

window.handleUploadComplete = function () {
  var linkNode = document.querySelector('.dialog__sharelink');
  linkNode.setAttribute('href', '/play/' + uploadId);

  // hide the progress msg
  document.getElementById('progress-msg').style.display = 'none';

  dlg.toggle();
  console.log('ID', uploadId);

  var slackNameInput = document.querySelector('[name=slackname]');
  sendToSlack(slackNameInput.value, uploadId);
}

function sendToSlack (targetUsername, uploadId) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("load", sendComplete, false);
  xhr.addEventListener("error", sendFailed, false);

  xhr.open("POST", '/send/' + targetUsername + '/' + uploadId);
  xhr.send();

  function sendComplete (e) {
    var res = e.target.responseText;
    console.log('sendToSlack', res);
    if (res !== 'ok') {
      sendFailed();
    }
  }

  function sendFailed () {
    alert('Sorry, sending to slack failed :( Try sharing the link manually');
  }


}
