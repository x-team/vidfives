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

  onClickSend: function (event) {
    event.preventDefault();

    const slacknameNode = this.refs.slackname.getDOMNode();
    const slackname = slacknameNode.value;
    this.props.action('save', { slackname });
  },

  render () {
    const self = this;
    const click = function (type) {
      return function (event) {
        event.preventDefault();
        self.props.action(type);
      };
    };

    if (this.props.saveInProgress) {
      return <h6 className={styles.progress}>Saving in progress...</h6>;
    }

    if (this.props.hasRecorded) {
      return (
        <div>
          <input className={styles.slackname} ref="slackname" placeholder="Enter Slack username of recipient here."/>

          <button className={styles.button} onClick={click('play')}><span className="fa fa-play"/> Play</button>
          <button className={styles.button}  onClick={this.onClickSend}><span className="fa fa-check"/> Send</button>
          <button className={styles.button}  onClick={click('reset')}><span className="fa fa-undo"/> Reset</button>
        </div>
      );
    }

    return this.props.isRecording ?
      <button className={styles.button} onClick={click('stop')}><span className="fa fa-stop"/> Stop</button> :
      <button className={styles.button} onClick={click('startRecording')}><span className="fa fa-video-camera"/> Record</button>;
  }
});
