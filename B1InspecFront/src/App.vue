<script setup lang="ts">
import { RouterLink, RouterView,useRoute} from 'vue-router'
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

  <TheNav v-if="route.path !== '/login' && !route.path.startsWith('/ImpressaoOrdem/') && route.path !== '/' && !route.path.startsWith('/solicitacoes/')" />
  <RouterView />
</template>
