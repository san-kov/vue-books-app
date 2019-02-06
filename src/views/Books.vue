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
    querySnapshot.forEach(doc => books.push({ ...doc.data(), id: doc.id }));

    this.setBooks(books);
  }
};
</script>


<style>
.books {
  width: 95%;
  display: grid;
  grid-template-columns: repeat(5, 250px);
  grid-template-rows: 200px;
  grid-auto-flow: row;
  margin: 20px auto;
  justify-content: center;
  align-items: flex-start;
}

@media (max-width: 1280px) {
  .books {
    grid-template-columns: repeat(4, 250px);
    grid-auto-flow: row;
  }
}

@media (max-width: 1050px) {
  .books {
    grid-template-columns: repeat(3, 250px);
    grid-auto-flow: row;
  }
}

@media (max-width: 800px) {
  .books {
    grid-template-columns: repeat(3, 230px);
    grid-auto-flow: row;
  }
}

@media (max-width: 700px) {
  .books {
    grid-template-columns: repeat(3, 200px);
    grid-auto-flow: row;
  }
}

@media (max-width: 620px) {
  .books {
    transform: scale(0.85);
  }
}

@media (max-width: 517px) {
  .books {
    margin-top: 3px;
    transform: scale(0.8);
  }
}

@media (max-width: 485px) {
  .books {
    margin-top: 3px;
    transform: scale(0.7);
  }
}
@media (max-width: 425px) {
  .books {
    transform: scale(0.6);
  }
}

@media (max-width: 425px) {
  .books {
    transform: scale(1);
    grid-template-columns: repeat(2, 100px);
    grid-template-rows: 100px;
    grid-auto-flow: row;
    grid-auto-rows: 100px;
  }
}
</style>