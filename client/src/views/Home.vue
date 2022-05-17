<template>
  <div class="home">
    <v-container class="dashboard-box">
      <v-card-text
        class="text-h3 font-weight-bold mb-5"
      >
        Presented all posts
      </v-card-text>

      <v-list class="dashboard-list">
        <v-item
          v-for="post of showAllPosts"
          :key="post.id"
          class="dashboard-listitem"
        >
          <v-card
            color="green lighten-1"
            class="dashboard-card pa-2 d-flex flex-column justify-center align-center"
            outlined
            @click="$router.push(`/dashboard/post/${post.id}`)"
          >
            <v-container class="d-flex justify-center text-h6">
              {{ post.title.length > 21 ? `${post.title.trim().slice(0, 21)}...` : post.title }}
            </v-container>
          </v-card>
        </v-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {

  computed: mapGetters(['showAllPosts', 'allPosts']),
  methods: {
    ...mapActions(['fetchPosts']),
    ...mapMutations(['deletePost'])
  },

  async mounted() {
    this.fetchPosts();
  }
}
</script>
