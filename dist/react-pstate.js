/* global Promise */

(function () {
  'use strict';

  /**
   * Mixin for persistent storage.
   * @public
   */
  var ReactPersistentState = {

    /**
     * Sets unique identifier for the current component.
     * @param {string} id
     */
    setPId: function (id) {
      this._pid = id;
    },

    /**
     * Sets storage.
     * @param {object} storage This object must implement the
     *  storage API (set, get and remove method).
     */
    setPStorage: function (storage) {
      this._pstorage = storage;
    },

    /**
     * Sets the component's state and save it
     * using the provided storage.
     * @param {object} state
     * @param {function} cb
     */
    setPState: function (state, cb) {
      var self = this;
      if (this._pid === undefined) {
        throw new Error('You must explicitly set the ' +
          'component\'s persistent id');
      }
      if (!this._pstorage || typeof this._pstorage.set !== 'function') {
        throw new Error('Set storage befor using setPState');
      }
      // Save the current state in case the persistence storage fails
      var old = this.state;
      this.setState(state, function () {
        // Try to save the storage
        self._pstorage.set(self._pid, self.state)
        .then(function () {
          if (typeof cb === 'function') {
            cb.apply(arguments, this);
          }
        }, function (e) {
          // Restore the previous state because
          // the transaction has field
          self.setState(old, function () {
            // Throws the error we got from the storage
            throw e;
          });
        });
      });
    },

    /**
     * Removes the state from the persistent storage.
     * @return {Promise}
     */
    removePState: function () {
      if (this._pid === undefined) {
        throw new Error('You must explicitly set the ' +
            'component\'s persistent id');
      }
      return this._pstorage.remove(this._pid);
    },

    /**
     * Restores the component state based on its content in
     * the provided persistent storage.
     * @param {function} cb The callback will be invoked once the storage is set
     */
    restorePState: function (cb) {
      if (this._pid === undefined) {
        throw new Error('You must explicitly set the ' +
            'component\'s persistent id');
      }
      var self = this;
      return this._pstorage.get(this._pid)
        .then(function (data) {
          self.setState(data, cb);
          return data;
        });
    },

    /**
     * localStorage for persistent storage
     * @public
     */
    localStorage: {

      /**
       * Sets value associated with given id.
       * @param {string} id
       * @param {object} data
       * @return {Promise} Once the data has been stored the
       *  promise will be resolved otherwise rejected.
       */
      set: function (id, data) {
        try {
          localStorage.setItem(id, JSON.stringify(data));
        } catch (e) {
          return Promise.reject(e);
        }
        return Promise.resolve(data);
      },

      /**
       * Gets data from the storage based on given id.
       * @param {string} id
       * @return {Promise} The promise will be resolved with the
       *  data associated with the id
       */
      get: function (id) {
        var data;
        try {
          data = JSON.parse(localStorage.getItem(id) || '{}');
        } catch (e) {
          console.warn('Can\'t parse the current state.');
        }
        return Promise.resolve(data);
      },

      /**
       * Removes data associated to given id.
       * @param {string} id
       * @return {Promise}
       */
      remove: function (id) {
        localStorage.removeItem(id);
        return Promise.resolve(id);
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
