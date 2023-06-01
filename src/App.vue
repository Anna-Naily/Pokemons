<template>
  <div id="app">
    <router-view />
    <FooterComp />
  </div>
</template>

<script>
import FooterComp from '../src/components/FooterComp.vue';

export default {
  name: 'App',
  components: { FooterComp },
};
</script>

<style>
@import '../src/assets/style/main.scss';
@import '../src/assets/style/responsive.scss';

#app {
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif !important;
  overflow-x: hidden;
}
</style>

