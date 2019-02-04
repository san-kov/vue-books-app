<template>
  <div>
    <v-progress-linear v-if="!books.length" color="yellow accent-3" :indeterminate="true"></v-progress-linear>
    <div class="books">
      <book v-for="(book, index) in books" :key="index" :book="book"></book>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../firebaseinit.js";
import Book from "@/components/Book.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "books",
  components: {
    Book
  },
  computed: mapState(["books"]),
  methods: mapActions(["setBooks"]),
  async mounted() {
    const querySnapshot = await db.collection("books").get();

    const books = [];
    querySnapshot.forEach(doc => books.push(doc.data()));

    this.setBooks(books);
  }
};
</script>


<style>
.books {
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-flow: row;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .books {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: row;
  }
}

@media (max-width: 800px) {
  .books {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;
  }
}
@media (max-width: 600px) {
  .books {
    display: flex;
    flex-direction: column;
  }
}
</style>