<script setup>
import Erea from './components/Erea.vue';

</script>

<template>
  <header class="header">
    <h1 class="header__h1">Printing Simulator</h1>
  </header>
  <Erea />
</template>

<style scoped>
html {
  background: #96D447;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #96D447;
}

.header__h1 {
  color: darkgreen;
  border-top: 30px solid transparent;
  width: 50%;
  margin: 0 auto;
}
</style>
