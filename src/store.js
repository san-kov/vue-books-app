import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebaseinit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  mutations: {
    SET_BOOKS(store, books) {
      store.books = books
    },
    ADD_BOOK(store, book) {
      store.books.push(book)
    }
  },
  actions: {
    setBooks({ commit }, books) {
      commit('SET_BOOKS', books)
    },
    async addBook({ commit }, book) {
      return db
        .collection('books')
        .add(book)
        .then(() => {
          commit('ADD_BOOK', book)
        })
    }
  }
})
