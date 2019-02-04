<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
export default {
  components: {
    AppHeader
  }
};
</script>

<style>
</style>
