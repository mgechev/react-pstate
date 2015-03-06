# ReactPersistentState

`ReactPersistentState` is a mixin, which allows saving the current state of ReactJS component. It provides predefined persistent storage, which uses `localStorage`. The storage has asynchronous interface in order to provide functionality for saving the state using XHR, WebSockets, etc.

If you want to use your own storage, just implement the interface described in the next section.

[**DEMO**](https://mgechev.github.io/react-pstate/).

# Storage API

Each component should have an `id`. Note that you **must** provide component unique id. A good way to generate one might be to get `css` or `xquery` selector.

- `set(id, data)` - Sets value of for given `id`. `data` is an object, so serialization might be required inside the implementation of `set`. This method should return a promise.
- `get(id)` - Gets value by given `id`. This method **must** return a promise, which should be resolved with deserialized data.
- `remove(id)` - Removes the data associated to given `id`. This method should return a promise.

The mixin uses the ECMAScript 6 Promise API. Polyfill is available [here](https://github.com/jakearchibald/es6-promise).

# API

* `setPId(id)` - Sets the component `id`. This method **must** be invoked before any other.
* `setPStorage(storage)` - Sets the storage, which should be used for storing the component's state.
* `setPState(state, cb)` - Sets the persistent state of the component. This method is wrapper of the default `setState`. Initially it invokes `setState`, once the state has been set successfully the save logic associated with the used `storage` will be invoked. `cb` will be invoked once the state has been successfully set (i.e. invoked inside the callback passed to `setState`).
* `removePState()` - Removes the saved persistent state.
* `restorePState(cb)` - Restores the persistent state of the component. Once the returned promise by the `get` method of the used storage has been resolved the mixin will invoke `setState` with the received value. `cb` will be invoked once the state has been successfully set.

# Demo

```javascript
var TickLabel = React.createClass({
  mixins: [ReactPersistentState],
  componentDidMount: function () {
    'use strict';
    var self = this;
    this.setPId('unique_id');
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

After refresh the `TickLabel` will continue ticking from the value it had before the page was refreshed.

# License

MIT
