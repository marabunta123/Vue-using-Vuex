<template>
  <div>
    <h1>Create Event</h1>
    <p>from computed properties mapState user name: {{ user.name }}</p>
    <p>from computed properties mapState userId: {{ user.id }}</p>
    <p>There are: {{ catLength }}</p>
    <p>Get event id 1: {{ getEventById(1) }}</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    //using mapState from store data
    ...mapState(['user', 'categories', 'events']),
    // using mapGetters and return the catLength, getEventById state from store
    ...mapGetters(['catLength', 'getEventById'])
  }
}
</script>
