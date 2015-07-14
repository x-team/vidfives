import React from 'react';
import styles from './dialog.css';

module.exports = React.createClass({
  displayName: 'Dialog',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired
  },

  render () {
    const playUrl = `/play/${this.props.id}`;
    const self = this;
    const click = function (type) {
      return function (event) {
        event.preventDefault();
        self.props.action(type);
      };
    };

    return (
      <div className="dialog dialog--open">
        <div className="dialog__overlay"></div>
        <div className="dialog__content">
          <h2><strong>Awesome</strong>, your /vidfive was sent.</h2>
          <p>You can also share it manually with <a href={playUrl}>this link</a></p>
          <div>
            <button className={styles.button} onClick={click('another')}>Send another!</button>
            <button className={styles.button} onClick={click('close')}>Close</button>
          </div>
        </div>
      </div>
    );
  }
});
