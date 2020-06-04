import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins:[persistedState({storage: window.sessionStorage})],
  getters:{
    getUser(state){
      return state.user;
    }
  },
  state: {
    user:null
  },
  mutations: {
    setUser(state,val){
      state.user=val;
    }
  },
  actions: {
  },
  modules: {
  }
})
