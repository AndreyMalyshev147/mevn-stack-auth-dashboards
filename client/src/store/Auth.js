import axios from 'axios';
import router from '@/router';

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
};

const actions = {
  // Авторизация пользователя
  async login({ commit }, user) {
    commit('auth_request');
    try {
      let res = await axios.post('/api/users/login', user);

      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
        commit('auth_success', token, user);
      }

      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Регистрация пользователя
  async register({ commit }, userData) {

    try {
      commit('register_request');

      let res = await axios.post('/api/users/register', userData);

      if (res.data.success !== undefined) {
        commit('register_success');
      }

      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Получение данных пользователя
  async getProfile({ commit }) {
    try {
      commit('profile_request');

      let res = await axios.get('/api/users/profile');

      commit('user_profile', res.data.user);

      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Выход пользователя из системы
  async logout({ commit }) {
    await localStorage.removeItem('token');

    commit('logout');

    delete axios.defaults.headers.common['Authorization'];

    router.push('/login');

    return;
  }
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },

  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = 'success';
  },

  register_request(state) {
    state.status = 'loading';
  },

  register_success(state) {
    state.status = 'success';
  },

  profile_request(state) {
    state.status = 'loading';
  },

  user_profile(state, user) {
    state.user = user;
  },

  logout(state) {
    state.status = '';
    state.token = '';
  }
};

export default { state, getters, actions, mutations };
