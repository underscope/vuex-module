# vuex-module

Module that turns vuex modules into poetry.

## Key features

* Auto namespacing for mutations, actions and getters
* Mappers for namespaced components
* Contextual state and commit available via this
* Nicer way of registering mutations, actions and getters
* Optional global registration

## Example

```
import { VuexModule } from 'vuex-module'
import shop from '../../api/shop'

const { state, getter, action, mutation, build } = new VuexModule('products')

state({ all: [] })

getter(function allProducts() {
  return this.state.all
});

action(function getAllProducts() {
  return shop.getProducts(products => {
    this.commit('recieveProducts', products)
  })
})

mutation(function recieveProducts(products) {
  this.state.all = products
})

mutation(function addToCart({ id }) {
  this.state.all.find(p => p.id === id).inventory -= 1
})

export default build()
```

Getters, actions and mutations will be prefixed with with
module name resulting with: `products/allProducts`,
`products/getAllProducts`, `products/recieveProducts` and
`products/addToCart` methods.

You can then use VuexModule mappers to map namespaced methods
to your components.

```
export default {
  computed: mapGetters({ products: 'allProducts' }, 'products'),
  methods: {
    ...mapMutations(['addToCart'], 'cart'),
    ...mapActions(['getAllProducts'], 'products')
  },
  created() {
    this.getAllProducts()
  }
}
```

Inside mutations state is available via `this`. This simplifies function
declaration and makes code more readable. Same goes for getters and
actions (context and commit).

MIT
