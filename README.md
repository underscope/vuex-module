# vuex-module

Module that turns vuex modules into poetry.

## Key features

* Auto namespacing for mutations, actions and getters
* Mappers for namespaced components
* Localized state and commit available via this
* Nicer way of registering mutations, actions and getters
* Optional global registration for getters

## Example

```javascript
import { VuexModule } from 'vuex-module'
import shop from '../../api/shop'

const { state, getter, action, mutation, build } = new VuexModule('products')

state({ all: [] })

getter(function all() {
  return this.state.all
});

action(function fetch() {
  return shop.getProducts(products => {
    this.commit('fetch', products)
  })
})

mutation(function fetch(products) {
  this.state.all = products
})

export default build()
```

Getters, actions and mutations will be prefixed with with
module name resulting with: `products/all`, and
`products/fetch` methods.

You can then use VuexModule mappers to map namespaced methods
to your components.

```javascript
export default {
  computed: mapGetters({ products: 'all' }, 'products'),
  methods: mapActions(['fetch'], 'products')
}
```

Inside mutations state is available via `this`. This simplifies function
declaration and makes code more readable. Same goes for getters and
actions (context, commit, rootState, rootGetters).

MIT
