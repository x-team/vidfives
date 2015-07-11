import React from 'react';
import Recorder from './components/recorder';
import Controls from './components/controls';

const App = React.createClass({
  displayName: 'App',

  render () {
    return (
      <div>
        <Recorder />
        <Controls />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('root'));
