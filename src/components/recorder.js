import React from 'react';
import getUserMedia from 'getusermedia';

module.exports = React.createClass({
  displayName: 'Recorder',

  componentDidMount () {
    const self = this;

    getUserMedia(function (err, stream) {
      if (err) {
        alert('Sorry, video capture is not supported in your browser');
        return
      }

      const videoNode = self.refs.video.getDOMNode();
      videoNode.src = window.URL.createObjectURL(stream);
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
