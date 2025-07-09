import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

interface AuthState {
  user: User | null; // Currently logged-in user (null if not logged in)
  loading: boolean; // Shows if auth operation is in progress
  error: string | null; // Stores error messages (null if no error)
}

const state = (): AuthState => ({
  user: null,
  loading: false,
  error: null,
});

const getters = {
  isAuthenticated: (state: AuthState) => !!state.user,
  userEmail: (state: AuthState) => state.user?.email || "",
};

const mutations = {
  SET_USER(state: AuthState, user: User | null) {
    state.user = user;
  },
  SET_LOADING(state: AuthState, loading: boolean) {
    state.loading = loading;
  },
  SET_ERROR(state: AuthState, error: string | null) {
    state.error = error;
  },
  CLEAR_ERROR(state: AuthState) {
    state.error = null;
  },
};

const actions = {
  async login(
    { commit }: any,
    { email, password }: { email: string; password: string }
  ) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const { $firebase } = useNuxtApp();

      if (!$firebase?.auth) {
        throw new Error(
          "Firebase not properly configured. Please check your .env file."
        );
      }

      const userCredential = await signInWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      commit("SET_USER", userCredential.user);

      // Auto logout after 1 hour (optional feature)
      setTimeout(() => {
        actions.logout({ commit });
      }, 60 * 60 * 1000); // 1 hour

      return { success: true };
    } catch (error: any) {
      let errorMessage = error.message;

      // Provide more user-friendly error messages
      if (error.code) {
        switch (error.code) {
          case "auth/network-request-failed":
            errorMessage =
              "Network connection error. Please check your internet connection.";
            break;
          case "auth/invalid-api-key":
            errorMessage =
              "Firebase configuration error. Please contact system administrator.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email";
            break;
          case "auth/wrong-password":
            errorMessage = "Wrong password";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many requests. Please try again later";
            break;
        }
      }

      commit("SET_ERROR", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async register(
    { commit }: any,
    { email, password }: { email: string; password: string }
  ) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      // 1. Get the Firebase "building"
      const { $firebase } = useNuxtApp(); 

      // 2. Check if "security desk" exists
      if (!$firebase?.auth) {
        throw new Error(
          "Firebase not properly configured. Please check your .env file."
        );
      }

      // 3. Use "security desk" to register user
      const userCredential = await createUserWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      commit("SET_USER", userCredential.user);
      return { success: true };
    } catch (error: any) {
      let errorMessage = error.message;

      // Provide more user-friendly error messages
      if (error.code) {
        switch (error.code) {
          case "auth/network-request-failed":
            errorMessage =
              "Network connection error. Please check your internet connection.";
            break;
          case "auth/invalid-api-key":
            errorMessage =
              "Firebase configuration error. Please contact system administrator.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Email/password registration is not enabled";
            break;
        }
      }

      commit("SET_ERROR", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async logout({ commit }: any) {
    try {
      const { $firebase } = useNuxtApp();

      if (!$firebase?.auth) {
        commit("SET_USER", null);
        await navigateTo("/login");
        return;
      }

      await signOut($firebase.auth);
      commit("SET_USER", null);
      await navigateTo("/login");
    } catch (error: any) {
      commit("SET_ERROR", error.message);
    }
  },

  async initAuth({ commit }: any) {
    try {
      const { $firebase } = useNuxtApp();

      if (!$firebase?.auth) {
        console.warn("Firebase auth not available");
        return;
      }

      return new Promise<void>((resolve) => {
        onAuthStateChanged($firebase.auth, (user) => {
          commit("SET_USER", user);
          resolve();
        });
      });
    } catch (error) {
      console.error("Auth initialization error:", error);
    }
  },

  clearError({ commit }: any) {
    commit("CLEAR_ERROR");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
