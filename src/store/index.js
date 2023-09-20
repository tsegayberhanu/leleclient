import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './users/userstore'
import post from './posts/poststore'
Vue.use(Vuex, axios)
export default new Vuex.Store({

  modules: {
    user,
    post
  },
  
})
  