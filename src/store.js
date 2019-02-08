import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebaseinit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    loading: false,
    addLoader: false
  },
  mutations: {
    SET_BOOKS(store, books) {
      store.books = books
    },
    ADD_BOOK(store, book) {
      store.books.push(book)
    },
    FINISH_BOOK(store, id) {
      store.books.forEach(book => {
        if (book.book_id === id) {
          book.done = !book.done
          book.completed = new Date()
        }
      })
    },
    SET_LOADING(store, loading) {
      store.loading = loading
    },
    ADD_PAGES(store, { id, pages }) {
      const book = store.books.find(book => book.book_id === id)
      if (book.pagesDone + pages < book.pages) {
        book.pagesDone += pages
      } else {
        book.done = true
      }
    },
    SET_ADD_LOADER(store, loading) {
      store.addLoader = loading
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
    },
    finishBook({ commit }, id) {
      commit('SET_LOADING', true)
      db.collection('books')
        .where('book_id', '==', id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc =>
            doc.ref.update({ done: !doc.data().done }).then(() => {
              commit('FINISH_BOOK', id)
              commit('SET_LOADING', false)
            })
          )
        })
    },
    addPages({ commit }, { id, pages }) {
      commit('SET_ADD_LOADER', true)
      db.collection('books')
        .where('book_id', '==', id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            const book = doc.data()

            if (book.pagesDone + pages < book.pages) {
              doc.ref.update({ pagesDone: book.pagesDone + pages }).then(() => {
                commit('ADD_PAGES', { id, pages })
                commit('SET_ADD_LOADER', false)
              })
            } else {
              doc.ref.update({ done: true }).then(() => {
                commit('FINISH_BOOK', id)
                commit('SET_ADD_LOADER', false)
              })
            }
          })
        })
    }
  }
})
