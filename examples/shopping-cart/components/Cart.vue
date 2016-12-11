<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="p in products">{{ p.title }} - {{ p.price }} x {{ p.quantity }}</li>
    </ul>
    <p>Total: {{ total }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex-module';

export default {
  computed: {
    ...mapGetters({ products: 'cartProducts' }),
    ...mapGetters(['checkoutStatus'], 'cart'),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    ...mapActions({ checkoutProducts: 'checkout'}, 'cart'),
    checkout(products) {
      this.checkoutProducts(products);
    }
  }
}
</script>
