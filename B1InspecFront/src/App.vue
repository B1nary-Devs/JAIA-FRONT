<script setup lang="ts">
import { RouterLink, RouterView,useRoute} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CadastroPrestador from './views/CadastroPrestador.vue'
import CadastroCategoria from './views/CadastroCategoria.vue';
import CadastroOrdemServico from './views/CadastroOrdemServico.vue';
import TheHeader from './components/The Header.vue';
import TheNav from './components/TheNav.vue';

const route = useRoute()

</script>

<template>

<!--GOOGLE FONTS-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet">
<!-- 
  Ver um jeito de entrar no login sem usar o nav  -->

  <TheNav v-if="route.path !== '/login' && route.path !== '/' && route.path !== '/Formulario'" />

  <RouterView />
</template>
