export class VuexModule {
  constructor(namespace) {
    this._ns = namespace;
    this._state = {};
    this._getters = {};
    this._actions = {};
    this._mutations = {};
  }

  state = val => {
    this._state = {
      ...this._state,
      ...val
    };
  }

  getter = (fn, options = {}) => {
    const key = options.global ? fn.name : this.namespace(fn.name);
    this._getters[key] = (state, getters, rootState, rootGetters) => {
      this.state = state;
      this.getters = getters;
      this.rootState = rootState;
      this.rootGetters = rootGetters;
      return fn.call(this);
    };
  }

  action = fn => {
    const key = this.namespace(fn.name);
    this._actions[key] = (ctx, payload) => {
      this.context = ctx;
      this.commit = (name, params) => ctx.commit(this.namespace(name), params);
      return fn.call(this, payload);
    };
  }

  mutation = fn => {
    const key = this.namespace(fn.name);
    this._mutations[key] = (state, payload) => {
      this.state = state;
      return fn.call(this, payload);
    };
  }

  namespace = key => this._ns ? `${this._ns}/${key}` : key;

  build = () => ({
    state: this._state,
    getters: this._getters,
    actions: this._actions,
    mutations: this._mutations
  });
};

export * from './helpers';
