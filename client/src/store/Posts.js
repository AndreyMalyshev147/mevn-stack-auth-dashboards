import axios from 'axios';

const state = {
  posts: [],
  visibleAllPosts: [],
  postCount: 0,
};

const getters = {
  allPosts(state) {
    return state.posts.slice(0, state.postCount);
  },
  showAllPosts(state) {
    return state.posts;
  }
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

      const data = res.data;

      commit('updatePosts', data);
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  updatePosts(state, posts) {
    state.posts = posts;
  },
  addPost(state) {
    return state.postCount += 1
  },
  deletePost(state, post) {
    let idx = state.posts.findIndex(val => val.id === post.id);
    state.posts.splice(idx, 1);
  }
};

export default { state, getters, actions, mutations };
