import React from 'react';
import styles from './controls.css';

module.exports = React.createClass({
  displayName: 'Controls',

  propTypes: {
    action: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      saveInProgress: false,
      hasRecorded: false,
      isRecording: false
    };
  },

  onClickRecord (event) {
    event.preventDefault();
    this.props.action('startRecording');
  },

  onClickStop (event) {
    event.preventDefault();
    this.props.action('stop');
  },

  onClickPlay (event) {
    event.preventDefault();
    this.props.action('play');
  },

  onClickReset (event) {
    event.preventDefault();
    this.props.action('reset');
  },

  onClickSave (event) {
    event.preventDefault();
    this.props.action('save');
  },

  render () {
    if (this.props.saveInProgress) {
      return <h6 className={styles.progress}>Saving in progress...</h6>;
    }

    if (this.props.hasRecorded) {
      return (
        <div>
          <input name="slackname" placeholder="Enter Slack username of recipient here."/>

          <button onClick={this.onClickPlay}><span className="fa fa-play"/> Play</button>
          <button onClick={this.onClickSave}><span className="fa fa-check"/> Save</button>
          <button onClick={this.onClickReset}><span className="fa fa-undo"/> Reset</button>
        </div>
      );
    }

    return this.props.isRecording ?
      <button onClick={this.onClickStop}><span className="fa fa-stop"/> Stop</button> :
      <button onClick={this.onClickRecord}><span className="fa fa-video-camera"/> Record</button>;
  }
});
