import { Store } from 'vuex'
import { RootState } from '~/store'

declare module '#app' {
  interface NuxtApp {
    $store: Store<RootState>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
} 