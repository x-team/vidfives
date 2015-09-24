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
          <h2><strong>Thanks</strong> for your answer.</h2>
          <p>Why not <a href="/">send a /vidfive</a> of your own?</p>
        </div>
      </div>
    );
  }
});
