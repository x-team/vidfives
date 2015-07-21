import React from 'react';
import Controls from './components/controls';
import Recorder from './components/recorder';
import Dialog from './components/dialog';

import xhr from 'xhr';

// recordrtc wants to be global
const recordRTC = window.RecordRTC;

function setupVideoRecorder (stream) {
  const recorder = recordRTC(stream, { type: 'video' });
  window.recorder = recorder;
  window.recordRTC = recordRTC;

  return recorder;
}

function setupAudioRecorder (stream) {
  return recordRTC(stream, { type: 'audio' });
}

const App = React.createClass({
  displayName: 'App',

  getInitialState () {
    return {
      stage: 'init',
      savedId: null
    };
  },

  componentWillMount () {
    const self = this;
    const mediaOpts = {
      video: true,
      audio: true
    };
    navigator.getUserMedia(mediaOpts, function (stream) {
      self.setState({
        mediaStream: stream,
        videoRecorder: setupVideoRecorder(stream),
        audioRecorder: setupAudioRecorder(stream)
      });
    }, function (err) {
      console.error(err);
      alert('Sorry, video capture is not supported in your browser');
    });
  },

  startRecording () {
    this.state.videoRecorder.startRecording();
    this.state.audioRecorder.startRecording();
    this.setState({ stage: 'recording' });
  },

  stopRecording () {
    const self = this;
    const { videoRecorder, audioRecorder } = this.state;

    audioRecorder.stopRecording(function (audioUrl) {
      self.setState({ audioUrl });
    });

    videoRecorder.stopRecording(function (videoUrl) {
      self.setState({ videoUrl });
    });

    this.setState({ stage: 'recordingComplete' });
  },

  send ({ slackname, savedId }) {
    const self = this;
    const opts = {
      method: 'POST',
      url: `/send/${slackname}/${savedId}`
    };

    xhr(opts, function (err, res) {
      if (err || res.statusCode !== 200) {
        alert('Sorry, sending to slack failed. Try sharing the link manually instead.');
      }

      self.setState({ savedId });
    });
  },

  save (args) {
    args = args || {};
    const { slackname } = args;
    const self = this;
    const { videoRecorder, audioRecorder } = this.state;
    const videoBlob = videoRecorder.getBlob();
    const audioBlob = audioRecorder.getBlob();

    this.setState({
      stage: 'saveInProgress'
    });

    const formData = new window.FormData();
    formData.append('webm', videoBlob);
    formData.append('wav', audioBlob);

    const opts = {
      method: 'POST',
      url: '/upload',
      body: formData
    };
    xhr(opts, function (err, res, body) {
      if (err || res.statusCode !== 200) {
        console.error(err);
        alert('Sorry, upload not working rn :(');
        return;
      }

      const data = JSON.parse(body);
      const savedId = data.id;

      // send to slack
      if (slackname) {
        self.send({ slackname, savedId });
      }
      // sending to slack is optional, so might just show the manual share link
      else {
        self.setState({ savedId });
      }
    });
  },

  onControlsAction (type, args) {
    switch (type) {
    case 'startRecording':
      this.startRecording();
      break;

    case 'stop':
      this.stopRecording();
      break;

    case 'play':
      this.setState({ stage: 'playing' });
      break;

    case 'reset':
      this.setState({
        stage: 'init',
        videoUrl: null,
        audioUrl: null
      });
      break;

    case 'save':
      this.save(args);
      break;

    default:
      console.error('Unknown controls action:', type);
    }
  },

  onDialogAction (type) {
    switch (type) {
    case 'another':
    case 'close':
      this.setState({
        stage: 'init',
        videoUrl: null,
        audioUrl: null,
        savedId: null
      });
      break;

    default:
      console.error('Unknown dialog action:', type);
    }
  },

  renderRecorder () {
    if (this.state.savedId) { return null; }

    const props = {
      stream: this.state.mediaStream,
      videoUrl: this.state.videoUrl,
      audioUrl: this.state.audioUrl
    };

    switch (this.state.stage) {
    case 'recordingComplete':
      delete props.stream;
      break;

    case 'playing':
      props.playback = true;
      break;
    }

    return <Recorder {...props} />;
  },

  renderControls () {
    if (this.state.savedId) { return null; }

    const props = {};
    switch (this.state.stage) {
    case 'recording':
      props.isRecording = true;
      break;

    case 'saveInProgress':
      props.saveInProgress = true;
      break;
    }

    if (this.state.videoUrl) {
      props.hasRecorded = true;
    }

    return <Controls {...props } action={this.onControlsAction} />;
  },

  renderDialog () {
    const id = this.state.savedId;
    if (!id) { return null; }

    return <Dialog id={id} action={this.onDialogAction} />;
  },

  render () {
    return (
      <div>
        {this.renderRecorder()}
        {this.renderControls()}
        {this.renderDialog()}
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));
