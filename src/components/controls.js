import React from 'react';
import styles from './controls.css';

module.exports = React.createClass({
  displayName: 'Controls',

  getInitialState () {
    return {
      isRecording: false
    }
  },

  onClickRecord (event) {
    event.preventDefault();
    this.setState({ isRecording: true });
  },

  onClickStop (event) {
    event.preventDefault();
    this.setState({ isRecording: false });
  },

  render () {
    if (this.props.saveInProgress) {
      return <h6 className={styles.progress}>Saving in progress...</h6>;
    }

    if (this.props.hasRecorded) {
      return (
        <div id="replay" class="replay">
          <input name="slackname" placeholder="Enter Slack username of recipient here."/>

          <button><span className="fa fa-play"/> Play</button>
          <button><span className="fa fa-check"/> Send</button>
          <button><span className="fa fa-undo"/> Reset</button>
        </div>
      );
    }

    return this.state.isRecording ?
      <button onClick={this.onClickStop}><span className="fa fa-stop"/> Stop</button> :
      <button onClick={this.onClickRecord}><span className="fa fa-video-camera"/> Record</button>;
  }
});
