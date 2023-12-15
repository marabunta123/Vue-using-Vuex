import Vue from 'vue'
import Vuex from 'vuex'
import EventServices from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal melfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: [],
    count: 0,
    canContinue: false
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      value ? (state.count += value) : state.count
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, event) {
      state.events = event
    },
    CAN_CONTINUE(state, canContinue) {
      state.canContinue = canContinue
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventServices.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventServices.getEvents(perPage, page)
        .then(response => {
          commit(
            'CAN_CONTINUE',
            response.headers['x-total-count'] >= page * perPage
          )
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.todos.filter(todos => !todos.done)
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
