/* global Promise */

(function () {
  'use strict';

  var ReactPersistentState = {
    setPId: function (id) {
      this._pid = id;
    },
    setPStorage: function (storage) {
      this._pstorage = storage;
    },
    setPState: function (state, cb) {
      var self = this;
      this.setState(state, function () {
        if (!self._pstorage || typeof self._pstorage.set !== 'function') {
          throw new Error('Set storage befor using setPState');
        }
        if (self._pid === undefined) {
          throw new Error('You must explicitly set the component id');
        }
        self._pstorage.set(self._pid, state);
        if (typeof cb === 'function') {
          cb.apply(arguments, this);
        }
      });
    },
    removePState: function () {
      if (this._pid === undefined) {
        throw new Error('You must explicitly set the component id');
      }
      return this._pstorage.remove(this._pid);
    },
    restorePState: function (cb) {
      if (this._pid === undefined) {
        throw new Error('You must explicitly set the component id');
      }
      var id = this._pid;
      var self = this;
      return this._pstorage.get(id)
        .then(function (data) {
          self.setState(data, cb);
          return data;
        });
    },
    localStorage: {
      set: function (id, data) {
        localStorage.setItem(id, JSON.stringify(data));
        return Promise.resolve();
      },
      get: function (id) {
        return Promise.resolve(JSON.parse(localStorage.getItem(id) || '{}'));
      },
      remove: function (id) {
        localStorage.removeItem(id);
        return Promise.resolve();
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports.ReactPersistentState = ReactPersistentState;
  }

  if (typeof window !== 'undefined') {
    window.ReactPersistentState = ReactPersistentState;
  }

}());
