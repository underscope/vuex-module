import { VuexModule } from 'vuex-module';
import shop from '../../api/shop';

const { state, getter, action, mutation, build } = new VuexModule('cart');

state({
  added: [],
  checkoutStatus: null
});

getter(function checkoutStatus() {
  return this.state.checkoutStatus;
});

action(function checkout(products) {
  const savedCartItems = [...this.state.added];
  this.commit('checkoutRequest');
  shop.buyProducts(
    products,
    () => this.commit('checkoutSuccess'),
    () => this.commit('checkoutFailure', { savedCartItems })
  );
});

mutation(function addToCart({ id }) {
  this.state.lastCheckout = null;
  const record = this.state.added.find(p => p.id === id);
  if (!record) {
    this.state.added.push({ id, quantity: 1 });
  } else {
    record.quantity++;
  }
});

mutation(function checkoutRequest() {
  this.state.added = [];
  this.state.checkoutStatus = null;
});

mutation(function checkoutSuccess() {
  this.state.checkoutStatus = 'successful';
});

mutation(function checkoutFailure({ savedCartItems }) {
  this.state.added = savedCartItems;
  this.state.checkoutStatus = 'failed';
});

export default build();
