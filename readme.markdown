# ReactPersistentState

`ReactPersistentState` is a mixin, which allows saving the current state of the component. It provides predefined persistent storage, which uses `localStorage`. The storages could be plugged dynamically but should implement the interface described bellow.

# Demo

# Storage API

- `set(id, data)` - Sets the value of for given component. `id` is the component's identifier, set through `setPId` or the `_rootNodeID`. Data is an object, it may require serialization. This method should return a promise.
- `get(id)` - Gets value by given component id. This method **must** return a promise, which should be resolved with deserialized data.
- `remove(id)` - Removes the data associated to given component by providing component's id. This method should return a promise.

The mixin uses the ECMAScript 6 Promise API. Polyfill is available [here](https://github.com/jakearchibald/es6-promise).

# Demo

```javascript
var TickLabel = React.createClass({
  mixins: [ReactPersistentState],
  componentDidMount: function () {
    'use strict';
    var self = this;
    console.log(this);
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
```

After refresh the `TickLabel` will continue ticking from the value it has before the page was refreshed.

# License

MIT
