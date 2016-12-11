<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price }}
      <br>
      <button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex-module';

export default {
  computed: mapGetters({ products: 'allProducts' }, 'products'),
  methods: {
    ...mapMutations(['addToCart'], 'cart'),
    ...mapActions(['getAllProducts'], 'products')
  },
  created() {
    this.getAllProducts();
  }
}
</script>
