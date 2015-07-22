import React from 'react';
import styles from './countdown.css';

module.exports = React.createClass({
  displayName: 'Countdown',

  propTypes: {
    countdown: React.PropTypes.number.isRequired
  },

  render () {
    return <div className={styles.root}>{this.props.countdown}</div>;
  }
});
