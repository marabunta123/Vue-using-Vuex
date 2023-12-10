<template>
    <div>
        <input type="number" v-model.number="incrementBy" style="margin-bottom: 10px">
        <button @click="incrementCount">Increment</button>
        <p>Count now is: {{ $store.state.count }} </p>
    </div>
</template>

<script>
export default {
  setup() {
    return {
      incrementBy: 0
    }
  },
  methods: {
    incrementCount() {
      this.$store.commit('INCREMENT_COUNT', this.incrementBy)
    }
  }
}
</script>

<style scoped>
</style>
