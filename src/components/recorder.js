import React from 'react';

module.exports = React.createClass({
  displayName: 'Recorder',

  render () {
    return (
      <div className="videorecorder">
        <video />
        <span className="countdown" />
      </div>
    );
  }
});
