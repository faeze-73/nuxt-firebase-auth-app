import { createStore } from 'vuex'
import type { Store } from 'vuex'
import auth from './modules/auth'

// Define auth state type
interface AuthState {
  loading: boolean
  error: string | null
  token: string | null
  user: any
}

// Define root state type
export interface RootState {
  auth: AuthState
}

// Create and type the store
const store = createStore<RootState>({
  modules: {
    auth
  }
})

export type StoreType = typeof store
export default store 