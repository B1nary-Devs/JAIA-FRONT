<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CadastroPrestador from './components/CadastroPrestador.vue'
import TheHeader from './components/The Header.vue';
</script>

<template>
  <TheHeader></TheHeader>
      <nav>
        <RouterLink to="/cadPrestador"></RouterLink>
      </nav>
      <RouterView />
</template>


