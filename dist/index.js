'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var autoBind = require('auto-bind');

var _require = require('./helpers'),
    mapState = _require.mapState,
    mapGetters = _require.mapGetters,
    mapActions = _require.mapActions,
    mapMutations = _require.mapMutations;

var VuexModule = function () {
  function VuexModule(namespace) {
    _classCallCheck(this, VuexModule);

    this._ns = namespace;
    this._state = {};
    this._getters = {};
    this._actions = {};
    this._mutations = {};
    autoBind(this);
  }

  _createClass(VuexModule, [{
    key: 'state',
    value: function state(val) {
      this._state = _extends({}, this._state, val);
    }
  }, {
    key: 'getter',
    value: function getter(f) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var key = options.global ? f.name : this.namespace(f.name);
      this._getters[key] = function (state, getters, rootState, rootGetters) {
        _this.state = state;
        _this.getters = getters;
        _this.rootState = rootState;
        _this.rootGetters = rootGetters;
        return f.call(_this);
      };
    }
  }, {
    key: 'action',
    value: function action(f) {
      var _this2 = this;

      var key = this.namespace(f.name);
      this._actions[key] = function (ctx, payload) {
        _this2.context = ctx;
        _this2.commit = function (name, params) {
          return ctx.commit(_this2.namespace(name), params);
        };
        return f.call(_this2, payload);
      };
    }
  }, {
    key: 'mutation',
    value: function mutation(f) {
      var _this3 = this;

      var key = this.namespace(f.name);
      this._mutations[key] = function (state, payload) {
        _this3.state = state;
        return f.call(_this3, payload);
      };
    }
  }, {
    key: 'namespace',
    value: function namespace(key) {
      return this._ns ? this._ns + '/' + key : key;
    }
  }, {
    key: 'build',
    value: function build() {
      return {
        state: this._state,
        getters: this._getters,
        actions: this._actions,
        mutations: this._mutations
      };
    }
  }]);

  return VuexModule;
}();

;

module.exports = {
  VuexModule: VuexModule,
  mapState: mapState,
  mapGetters: mapGetters,
  mapActions: mapActions,
  mapMutations: mapMutations
};