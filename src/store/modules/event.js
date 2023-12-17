import EventServices from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  count: 0,
  hasNextPage: false
}

export const mutations = {
  // INCREMENT_COUNT(state, value) {
  //   value ? (state.count += value) : state.count
  // },
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, event) {
    state.events = event
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  CAN_CONTINUE(state, hasNextPage) {
    state.hasNextPage = hasNextPage
  }
}

export const actions = {
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
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventServices.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
