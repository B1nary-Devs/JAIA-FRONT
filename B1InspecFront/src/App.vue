<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CadastroPrestador from './components/CadastroPrestador.vue'
import TheHeader from './components/The Header.vue';
import TheNav from './components/TheNav.vue';

</script>

<template>

<!--GOOGLE FONTS-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet">

  <TheNav></TheNav>
      <nav>
        <RouterLink to="/cadPrestador"></RouterLink>
      </nav>
      <RouterView />
</template>


