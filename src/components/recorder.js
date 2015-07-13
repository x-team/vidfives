import React from 'react';

import styles from './recorder.css';

module.exports = React.createClass({
  displayName: 'Recorder',

  getDefaultProps () {
    return {
      playback: false
    };
  },

  componentDidMount () {
    this.update(this.props);
  },

  componentWillReceiveProps (newProps) {
    this.update(newProps);
  },

  shouldComponentUpdate () {
    // once the video & audio nodes have been rendered we never want to
    // re-render (otherwise it flickers). Instead we set the src directly
    // on the DOM nodes in `updateVideo`.
    return false;
  },

  update (props) {
    const videoNode = this.refs.video.getDOMNode();
    const audioNode = this.refs.audio.getDOMNode();

    // if we have a recording, start video and audio in sync
    if (props.playback) {
      if (props.videoUrl && props.audioUrl) {
        videoNode.pause();

        if (videoNode.src !== props.videoUrl) {
          videoNode.src = props.videoUrl;

          audioNode.currentTime = videoNode.currentTime;
          audioNode.src = props.audioUrl;
        }

        videoNode.play();
        audioNode.play();
      }
    }
    // otherwise just set the video url to the media stream
    else if (props.stream) {
      videoNode.src = window.URL.createObjectURL(props.stream);
      videoNode.play();
    }
    // if there's no attached media stream, pause the playback
    else {
      videoNode.pause();
    }
  },

  render () {
    return (
      <div className={styles.root}>
        <video className={styles.video} ref="video" autoPlay={false} muted={true} />
        <audio style={{display: 'none'}} ref="audio" autoPlay={false} />
      </div>
    );
  }
});
