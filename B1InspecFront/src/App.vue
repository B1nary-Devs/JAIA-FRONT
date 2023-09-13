<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CadastroPrestador from './components/CadastroPrestador.vue'
</script>

<template>
  <nav>
    <RouterLink to="/cadPrestador"></RouterLink>
    <RouterLink to="/cadCategoria"></RouterLink>
  </nav>
  <RouterView />
</template>
