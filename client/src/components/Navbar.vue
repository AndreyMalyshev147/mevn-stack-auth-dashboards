<template>
  <v-container fluid class="mx-auto overflow-hidden navbar">
    <v-app-bar
      color="green lighten-1"
      elevate-on-scroll
      dark
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="isLoggedIn"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="pa-1">
        <router-link class="navbar-link" to="/">MAIN</router-link>
      </v-toolbar-title>

      <v-spacer />
      <!-- FIXED SOON! -->
      <!-- <v-card-text -->
      <!--   v-if="isLoggedIn" -->
      <!--   class="navbar-user text-h6" -->
      <!-- > -->
      <!--   {{ user.email }} -->
      <!-- </v-card-text> -->
      <v-btn
        outlined
        class="ma-1 ma-md-1 ma-sm-2 pa-1"
        v-if="!isLoggedIn"
      >
        <router-link
          class="navbar-link"
          to="/login"
        >
          Log in
        </router-link>
      </v-btn>
      <v-btn
        outlined class="ma-1 ma-md-1 ma-sm-2 pa-1"
        v-if="!isLoggedIn"
      >
        <router-link
          class="navbar-link"
          to="/register"
        >
          Register
        </router-link>
      </v-btn>
      <v-btn
        outlined class="ma-1 ma-md-1 ma-sm-2 pa-1"
        v-if="isLoggedIn"
      >
        <router-link
          class="navbar-link"
          to="/dashboard"
        >
          Dashboard
        </router-link>
      </v-btn>
      <v-btn
        outlined
        class="ma-1 ma-md-1 ma-sm-2 pa-1"
        v-if="isLoggedIn"
        @click.prevent="logoutUser"
      >
        <a
          class="navbar-link"
          to="/logout"
        >
          Log out
        </a>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      v-if="isLoggedIn"
      class="d-flex flex-column align-center sidebar-box"
    >
      <v-btn
        outlined
        color="green lighten-1"
        class="sidebar-btn mt-2"
        @click="addPost"
      >
        Add post
      </v-btn>
      <v-list
        nav
        dense
        v-for="(post, idx) of allPosts"
        :key="idx"
        class="pa-0 ma-2 sidebar-list d-flex"
      >
        <v-list-item
          v-model="group"
          active-class="deep-purple--text text--accent-4"
          class="pa-0 d-flex justify-center"
        >
          <v-card
            outlined
            class="pa-2 ma-0 sidebar-listitem"
            @click="$router.push(`/dashboard/post/${post.id}`)"
          >
            {{ post.title.length > 22 ? `${post.title.trim().slice(0, 22)}...` : post.title }}
          </v-card>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Navbar',

  data: () => ({
    drawer: false,
    group: null,

  }),

  computed: {
    ...mapGetters(['isLoggedIn', 'allPosts', 'user']),
  },

  methods: {
    ...mapActions(['logout', 'fetchPosts', 'getProfile']),
    ...mapMutations(['addPost']),

    logoutUser() {
      this.logout();
    }
  },

  async mounted() {
    this.fetchPosts()
  },

  created() {
    this.getProfile();
  }
};
</script>
