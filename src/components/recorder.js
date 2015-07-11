import React from 'react';
import getUserMedia from 'getusermedia';
import recordRTC from 'recordrtc';

module.exports = React.createClass({
  displayName: 'Recorder',

  componentDidMount () {
    const self = this;

    const mediaOpts = {
      video: true,
      audio: true
    };
    navigator.getUserMedia(mediaOpts, function (err, stream) {
      if (err) {
        alert('Sorry, video capture is not supported in your browser');
        return
      }

      const videoNode = self.refs.video.getDOMNode();
      videoNode.src = window.URL.createObjectURL(stream);

      var recorder = recordRTC(stream, { type: 'video' });
      window.recorder = recorder;
      window.recordRTC = recordRTC;

      var audioRecorder = recordRTC(stream, { type: 'audio' });

      window.startRecording = function () {
        recorder.startRecording();
        audioRecorder.startRecording();
      };

      window.stopRecording = function () {

        audioRecorder.stopRecording(function (audioUrl) {
          var node = document.createElement('audio');
          node.src = audioUrl;
          node.setAttribute('autoPlay', true);

          document.body.appendChild(node);
        });

        recorder.stopRecording(function onStopRecording (url) {
          videoNode.src = url;


          var blob = recorder.getBlob();
          recorder.getDataURL(function (dataURL) {
            window.dataURL = dataURL;
            console.log('got data URL');
          });
        });
      };

    });
  },

  render () {
    return (
      <div className="videorecorder">
        <video ref="video" autoPlay={true} />
        <span className="countdown" />
      </div>
    );
  }
});
