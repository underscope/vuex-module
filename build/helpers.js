'use strict';

var _vuex = require('vuex');

function ns(namespace, key) {
  return namespace + '/' + key;
}

function processArr(arr, namespace) {
  return arr.map(function (it) {
    return ns(namespace, it);
  });
}

function processObj(obj, namespace) {
  Object.keys(obj).map(function (key) {
    obj[key] = ns(namespace, obj[key]);
  });
  return obj;
}

function process(map, ns) {
  if (!ns) return map;
  return Array.isArray(map) ? processArr(map, ns) : processObj(map, ns);
}

module.exports = {
  mapState: _vuex.mapState,
  mapGetters: function mapGetters(map, ns) {
    return (0, _vuex.mapGetters)(process(map, ns));
  },
  mapActions: function mapActions(map, ns) {
    return (0, _vuex.mapActions)(process(map, ns));
  },
  mapMutations: function mapMutations(map, ns) {
    return (0, _vuex.mapMutations)(process(map, ns));
  }
};