<template>
  <div id="app">
    <Placemaker />
  </div>
</template>

<script>
import Placemaker from './components/Placemaker.vue';

export default {
  name: 'App',
  components: {
    Placemaker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>