
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

  dlg.toggle();
  console.log('ID', uploadId);
}
