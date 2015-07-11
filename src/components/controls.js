import React from 'react';
import styles from './controls.css';

module.exports = React.createClass({
  displayName: 'Controls',

  render () {
    if (this.props.saveInProgress) {
      return <h6 className={styles.progress}>Saving in progress...</h6>;
    }

    if (this.props.hasRecorded) {
      return (
          <div id="replay" class="replay">
          <input name="slackname" placeholder="Enter Slack username of recipient here."/>

          <a href="#" id="playback" class="button"><i class="fa fa-play"></i> Play</a>
          <a href="#" id="uploadrecord" class="button"><i class="fa fa-check"></i> Send</a>
          <a href="#" id="clearrecording" class="button"><i class="fa fa-undo"></i> Reset</a>
          </div>
      );
    }

    return (
        <div className="recordbtns">
        <a href="#" className="button"><span className="fa fa-video-camera"/> Record</a>
        <a href="#" className="button"><span className="fa fa-stop"/> Stop</a>
        </div>
    );
  }
});
