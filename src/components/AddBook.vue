<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn slot="activator" color="primary" dark>Add Book</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Add Book</span>
          <v-progress-linear v-if="book.loading" color="yellow accent-3" :indeterminate="true"></v-progress-linear>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <form action>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    v-model="book.title"
                    style="text-align: center"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Author" v-model="book.author" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Pages count" v-model="book.pages" type="number" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Image url" v-model="book.cover" type="string"></v-text-field>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" :disabled="loading" flat @click.prevent="submit">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import uuid from "uuid";
const getInitialFormObject = () => ({
  title: "",
  author: "",
  pages: 0,
  cover: "",
  done: false,
  pagesDone: 0,
  completed: 0
});
export default {
  data: () => ({
    dialog: false,
    book: getInitialFormObject(),
    loading: false
  }),
  methods: {
    ...mapActions(["addBook"]),
    async submit() {
      this.loading = true;
      this.book.added = new Date();
      this.book.book_id = uuid();
      await this.addBook(this.book);

      this.book = getInitialFormObject();
      this.dialog = false;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
</style>