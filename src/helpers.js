import * as vuex from 'vuex';

function ns(namespace, key) {
  return `${namespace}/${key}`;
}

function processArr(arr, namespace) {
  let res = {};
  arr.forEach(it => (res[it] = ns(namespace, it)));
  return res;
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

export const mapState = vuex.mapState;
export const mapGetters = (map, ns) => vuex.mapGetters(process(map, ns));
export const mapActions = (map, ns) => vuex.mapActions(process(map, ns));
export const mapMutations = (map, ns) => vuex.mapMutations(process(map, ns));
