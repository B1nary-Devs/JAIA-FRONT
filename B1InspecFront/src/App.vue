<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CadastroPrestador from './views/CadastroPrestador.vue'
import CadastroSegmento from './views/CadastroSegmento.vue'
import TheHeader from './components/The Header.vue'
import TheNav from './components/TheNav.vue'
</script>

<template>
  <!--GOOGLE FONTS-->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap"
    rel="stylesheet"
  />

  <TheNav></TheNav>
  <nav>
    <RouterLink to="/cadPrestador"></RouterLink>
    <RouterLink to="/cadSegmento"></RouterLink>
  </nav>
  <RouterView />
</template>
