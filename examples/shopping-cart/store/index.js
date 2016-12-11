import Vue from 'vue';
import Vuex from 'vuex';
import { VuexModule } from 'vuex-module';
import cart from './modules/cart';
import products from './modules/products';

Vue.use(Vuex);

const { getter, action, build } = new VuexModule();
const debug = process.env.NODE_ENV !== 'production';

action(function addToCart({ id, inventory }) {
  if (inventory > 0) this.commit('addToCart', { id });
});

getter(function cartProducts() {
  const { cart, products } = this.state;
  return cart.added.map(({ id, quantity }) => {
    const product = products.all.find(p => p.id === id);
    return {
      title: product.title,
      price: product.price,
      quantity
    };
  });
});

const root = build();

export default new Vuex.Store({
  ...root,
  modules: {
    cart,
    products
  },
  strict: debug
});
