var PTicker = React.createClass({
  mixins: [ReactPersistentState],
  componentDidMount: function () {
    'use strict';
    var self = this;
    this.setPId('ticker');
    this.setPStorage(this.localStorage);
    setInterval(function () {
      self.setPState({
        ticks: self.state.ticks + 1
      });
    }, 1000);
    this.restorePState();
  },
  getInitialState: function () {
    'use strict';
    return { ticks: 0 };
  },
  reset: function () {
    'use strict';
    this.removePState();
    this.setPState({
      ticks: 0
    });
  },
  render: function () {
    'use strict';
    return React.createElement('div', {},
      React.createElement('div', {}, this.state.ticks),
      React.createElement('button', {
        onClick: this.reset
      }, 'Reset')
    );
  }
});

var Ticker = React.createClass({
  componentDidMount: function () {
    'use strict';
    var self = this;
    setInterval(function () {
      self.setState({
        ticks: self.state.ticks + 1
      });
    }, 1000);
  },
  getInitialState: function () {
    'use strict';
    return { ticks: 0 };
  },
  reset: function () {
    'use strict';
    this.setState({
      ticks: 0
    });
  },
  render: function () {
    'use strict';
    return React.createElement('div', {},
      React.createElement('div', {}, this.state.ticks),
      React.createElement('button', {
        onClick: this.reset
      }, 'Reset')
    );
  }
});


React.render(PTicker(), document.getElementById('left-ticker'));
React.render(Ticker(), document.getElementById('right-ticker'));
