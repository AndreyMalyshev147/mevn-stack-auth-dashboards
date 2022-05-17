import Vue from 'vue';
import Vuex from 'vuex';

import Auth from '@/store/Auth';
import Posts from '@/store/Posts';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Posts
  },

  state: {

  },
  mutations: {

  },
  actions: {

  },
})
