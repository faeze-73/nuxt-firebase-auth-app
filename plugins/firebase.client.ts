import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyDGTcHZ4HY5cnjlTH02bdh-hYdGgmnFqsk",
      authDomain: "nuxt-firebase-auth-ab99e.firebaseapp.com",
      projectId: "nuxt-firebase-auth-ab99e",
      storageBucket: "nuxt-firebase-auth-ab99e.firebasestorage.app",
      messagingSenderId: "402697286214",
      appId: "1:402697286214:web:e9b8640cde699fe2509047"
    }

    //console.log('🔥 Initializing Firebase with project:', firebaseConfig.projectId)
    
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    return {
      provide: {
        firebase: {
          app,
          auth
        }
      }
    }
  } catch (error) {
    console.error('🔥 Firebase initialization failed:', error)
    throw error
  }
})