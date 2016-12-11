import { VuexModule } from 'vuex-module';
import shop from '../../api/shop';

const { state, getter, action, mutation, build } = new VuexModule('products');

state({ all: [] });

getter(function allProducts() {
  return this.state.all;
});

action(function getAllProducts() {
  return shop.getProducts(products => {
    this.commit('recieveProducts', products);
  });
});

mutation(function recieveProducts(products) {
  this.state.all = products;
});

mutation(function addToCart({ id }) {
  this.state.all.find(p => p.id === id).inventory -= 1;
});

export default build();
