var TickLabel = React.createClass({
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
  render: function () {
    'use strict';
    return React.createElement('div', {}, this.state.ticks);
  }
});

React.render(TickLabel(), document.getElementById('content'));
