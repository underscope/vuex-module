const autoBind = require('auto-bind');
const { mapState, mapGetters, mapActions, mapMutations } = require('./helpers');

class VuexModule {
  constructor(namespace) {
    this._ns = namespace;
    this._state = {};
    this._getters = {};
    this._actions = {};
    this._mutations = {};
    autoBind(this);
  }

  state(state) {
    this._state = state;
  }

  getter(f, options = {}) {
    const key = options.global ? f.name : this.namespace(f.name);
    this._getters[key] = (state, getters, rootState, rootGetters) => {
      this.state = state;
      this.getters = getters;
      this.rootState = rootState;
      this.rootGetters = rootGetters;
      return f.call(this);
    };
  }

  action(f) {
    const key = this.namespace(f.name);
    this._actions[key] = (ctx, payload) => {
      this.context = ctx;
      this.commit = (name, params) => ctx.commit(this.namespace(name), params);
      return f.call(this, payload);
    };
  }

  mutation(f) {
    const key = this.namespace(f.name);
    this._mutations[key] = (state, payload) => {
      this.state = state;
      return f.call(this, payload);
    };
  }

  namespace(key) {
    return this._ns ? `${this._ns}/${key}` : key;
  }

  build() {
    return {
      state: this._state,
      getters: this._getters,
      actions: this._actions,
      mutations: this._mutations
    };
  }
};

module.exports = {
  VuexModule,
  mapState,
  mapGetters,
  mapActions,
  mapMutations
};
