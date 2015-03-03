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
        self._pstorage.set(self._pid || self._rootNodeID, state);
        if (typeof cb === 'function') {
          cb.apply(arguments, this);
        }
      });
    },
    removePState: function () {
      return this._pstorage.remove(this._pid || this._rootNodeID);
    },
    restorePState: function () {
      var id = this._pid || this._rootNodeID;
      var self = this;
      this._pstorage.get(id)
        .then(function (data) {
          self.setState(data);
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
