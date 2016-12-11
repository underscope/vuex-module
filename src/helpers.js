import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

function ns(namespace, key) {
  return `${namespace}/${key}`;
}

function processArr(arr, namespace) {
  return arr.map(it => ns(namespace, it));
}

function processObj(obj, namespace) {
  Object.keys(obj).map(key => {
    obj[key] = ns(namespace, obj[key]);
  });
  return obj;
}

function process(map, ns) {
  if (!ns) return map;
  return Array.isArray(map) ? processArr(map, ns) : processObj(map, ns);
}

module.exports = {
  mapState,
  mapGetters: (map, ns) => mapGetters(process(map, ns)),
  mapActions: (map, ns) => mapActions(process(map, ns)),
  mapMutations: (map, ns) => mapMutations(process(map, ns))
};
