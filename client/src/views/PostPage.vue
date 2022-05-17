<template>
  <v-container >
    <v-container>
      <v-card-text class="text-h2 pa-0 mb-10">
        {{ allPosts[$route.params.id - 1].title }}
      </v-card-text>
    </v-container>

    <v-container>
      <v-card-text class="pa-0 font-weight-medium">
        {{ allPosts[$route.params.id - 1].body }}
      </v-card-text>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: mapGetters(['allPosts']),
  methods: mapActions(['fetchPosts']),

  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDay(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      second: new Date().getSeconds(),
    }
  },

  async mounted() {
    this.fetchPosts();
  }
}
</script>
