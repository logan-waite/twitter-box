<template>
  <TwitterBox />
</template>

<script>
import TwitterBox from './components/TwitterBox.vue'

export default {
  name: 'App',
  components: {
    TwitterBox
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
