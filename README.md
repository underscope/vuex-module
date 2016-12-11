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
import { VuexModule } from 'vuex-module';
const { state, action, mutation, build } = new VuexModule('activities');

state({
  ...
});

action(function add(item) {
  ...
});

mutation(function add(item) {
  ...
});

export default build();
```

MIT
