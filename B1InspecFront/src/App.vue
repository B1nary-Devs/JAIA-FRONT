<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CadastroPrestador from './components/CadastroPrestador.vue'
import TheHeader from './components/The Header.vue';
import TheNav from './components/TheNav.vue';

</script>

<template>
  <nav>
    <RouterLink to="/cadPrestador"></RouterLink>
    <RouterLink to="/cadCategoria"></RouterLink>
  </nav>
  <RouterView />
</template>
