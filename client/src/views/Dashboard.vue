<template>
  <v-container class="dashboard-box">
    <v-card-text
      v-if="allPosts.length !== 0"
      class="text-h3 font-weight-bold mb-5"
    >
      Posts dashboard
    </v-card-text>
    <v-card-text
      v-else
      class="dashboard-empty-list text-h2 font-weight-bold mb-5"
    >
      Click "+" or "add post" in sidebar!
    </v-card-text>

    <v-list class="dashboard-list">
      <v-item
        v-for="post of allPosts"
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

          <v-container class="d-flex justify-center">
            <v-btn
              depressed
              @click.stop="deletePost(post)"
              class="dashboard-btn d-flex justify-center"
              color="red accent-2"
            >
              <v-icon>
                {{ icons.mdiDelete }}
              </v-icon>
            </v-btn>
          </v-container>
        </v-card>
      </v-item>
    </v-list>

    <v-btn depressed @click="addPost" color="red accent-2" class="dashboard-add">
      <v-icon>
        {{ icons.mdiPlus }}
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { mdiDelete, mdiPlus } from '@mdi/js';

export default {
  data() {
    return {
      icons: {
        mdiDelete,
        mdiPlus
      }
    }
  },
  computed: mapGetters(['allPosts']),
  methods: {
    ...mapActions(['fetchPosts']),
    ...mapMutations(['deletePost', 'addPost'])
  },

  async mounted() {
    this.fetchPosts();
  }
}
</script>
