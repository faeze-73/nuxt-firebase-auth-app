import store from '../store'

export default defineNuxtPlugin((nuxtApp) => {
  // Provide store to components through the provide mechanism
  return {
    provide: {
      store: store,
      $store: store
    }
  }
}) 