<template>
  <v-toolbar dark flat color="blue">
    <v-toolbar-title class="white--text logo font-weight-light">
      <v-icon left color="yellow">bookmark</v-icon>BookList
    </v-toolbar-title>
    <v-spacer class="spacer"></v-spacer>
    <v-toolbar-items>
      <v-btn to="/books" flat>
        <v-icon left>book</v-icon>
        <span>My Books</span>
      </v-btn>
      <v-btn flat>
        <add-book></add-book>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
import AddBook from "./AddBook.vue";
export default {
  components: {
    AddBook
  }
};
</script>

<style>
@media (max-width: 425px) {
  .logo {
    display: none;
  }

  .spacer {
    display: none;
  }
}
</style>