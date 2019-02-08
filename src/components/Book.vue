<template>
  <v-dialog v-model="dialog" width="300">
    <div
      class="book-cover"
      slot="activator"
      @click="detailed = true"
      @mouseleave="detailed = false"
    >
      <div class="image">
        <img :src="book.cover" alt>
        <div
          class="status"
          :class="[book.done ? 'done' : 'reading']"
        >{{book.done ? `Done on ${formatDate(book.completed)}` : 'Reading'}}</div>
      </div>
      <p class="progress">
        <v-progress-linear class="bar" color="#00e676" :value="book.done ? 100 : percentDone"></v-progress-linear>
      </p>
    </div>
    <v-card>
      <div class="image">
        <img :src="book.cover" alt>
        <div
          class="status"
          :class="[book.done ? 'done' : 'reading']"
        >{{book.done ? `Done on ${formatDate(book.completed)}` : 'Reading'}}</div>
      </div>
      <div class="content">
        <p class="book-title">{{book.title}}</p>
        <p class="author">{{book.author}}</p>
        <p class="progress">
          <v-progress-linear class="bar" color="#00e676" :value="book.done ? 100 : percentDone"></v-progress-linear>
        </p>
        <p style="color:#00e676">
          <strong>{{book.done ? book.pages : book.pagesDone}}</strong>
          /
          <strong>{{book.pages }}</strong>
        </p>
      </div>
      <div class="controls">
        <v-tooltip v-if="!book.done" bottom>
          <v-btn
            slot="activator"
            :loading="loading"
            :disabled="addLoader"
            small
            color="pink"
            flat
            icon
            dark
          >
            <v-icon @click="toggleBook(book.book_id)" dark>check_circle</v-icon>
          </v-btn>
          <span>Check as done</span>
        </v-tooltip>
        <v-tooltip v-else bottom>
          <v-btn slot="activator" :loading="loading" large color="pink" flat icon dark>
            <v-icon @click="toggleBook(book.book_id)" dark>cached</v-icon>
          </v-btn>
          <span>Discard</span>
        </v-tooltip>
        <div v-if="!book.done" class="add-pages">
          <input type="number" v-model="pagesAdd" placeholder="count">
          <v-tooltip bottom>
            <v-btn
              slot="activator"
              large
              color="pink"
              :disabled="loading"
              :loading="addLoader"
              small
              flat
              icon
              dark
            >
              <v-icon @click="addPages({id: book.book_id, pages: +pagesAdd})" dark>add</v-icon>
            </v-btn>
            <span>Add Pages</span>
          </v-tooltip>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  props: ["book"],
  computed: {
    ...mapState(["loading", "addLoader"]),
    percentDone() {
      return (this.book.pagesDone / this.book.pages) * 100;
    }
  },
  data() {
    return {
      dialog: false,
      pagesAdd: 10
    };
  },
  methods: {
    ...mapActions(["finishBook", "addPages"]),
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    showDetails() {
      this.detailed = true;
    },
    toggleBook(id) {
      this.finishBook(id);
    }
  }
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  position: relative;
}

.status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: white;
  font-weight: bold;
}

.done {
  background: #1976d2;
}

.reading {
  background: #ffa000;
}

.book-cover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.363);
  margin: 10px;
  /* flex-direction: column; */
  position: relative;
  cursor: pointer;
  transition: all 0.1s ease;
  overflow: hidden;
}

.book-cover:hover {
  transform: scale(1.02);
}

.image {
  height: 300px;
  width: 100%;
}

img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: contain;
}

.book-title {
  text-align: center;
  height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0;
}

.author {
  font-size: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  padding-bottom: 0;
}

p {
  text-align: center;
}

.progress {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-pages input {
  width: 70px;
  padding: 2px;
  border: 1px solid rgb(219, 219, 219);
}

@media (max-width: 700px) {
  .image {
    height: auto;
  }
}
</style>