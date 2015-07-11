import React from 'react';
import getUserMedia from 'getusermedia';
import recordRTC from 'recordrtc';

import styles from './recorder.css';

module.exports = React.createClass({
  displayName: 'Recorder',

  componentDidMount () {
    const self = this;

    const mediaOpts = {
      video: true,
      audio: true
    };
    navigator.getUserMedia(mediaOpts, function (stream) {
      const videoNode = self.refs.video.getDOMNode();
      videoNode.src = window.URL.createObjectURL(stream);
      videoNode.muted = true;

      var recorder = recordRTC(stream, { type: 'video' });
      window.recorder = recorder;
      window.recordRTC = recordRTC;

      var audioRecorder = recordRTC(stream, { type: 'audio' });
      var audioNode = document.createElement('audio');
      document.body.appendChild(audioNode);
      audioNode.setAttribute('autoPlay', true);

      window.startRecording = function () {
        recorder.startRecording();
        audioRecorder.startRecording();
      };

      var videoUrl;
      var audioUrl;

      window.playVid = function () {
        videoNode.muted = false;
        videoNode.src = videoUrl;

        setTimeout(function(){
          audioNode.currentTime = videoNode.currentTime;
          audioNode.src = audioUrl;
        },100);
      };

      window.stopRecording = function () {

        audioRecorder.stopRecording(function (url) {
          audioUrl = url;
        });

        recorder.stopRecording(function onStopRecording (url) {
          videoUrl = url;

          var blob = recorder.getBlob();
          recorder.getDataURL(function (dataURL) {
            window.dataURL = dataURL;
            console.log('got data URL');
          });
        });
      };

    }, function (err) {
      alert('Sorry, video capture is not supported in your browser');
    });
  },

  render () {
    return (
      <div className={styles.root}>
        <video className={styles.video} ref="video" autoPlay={true} />
        <span className="countdown" />
      </div>
    );
  }
});
