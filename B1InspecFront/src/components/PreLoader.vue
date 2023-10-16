<template>
    <div v-if="showPreload" class="cover"></div>
    <div class="box-load" :class="{ active: showPreload }">
        <div class="loading-wave">
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
            <div class="loading-bar"></div>
        </div>
    </div>
    <div class="text" :class="{ active: showPreload }">
        <p>Por favor, aguarde...</p>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import '../assets/css/preLoader/preLoader.css'

const preloader = ref(false)

function exibirPreload() {
    preloader.value = true;
    setTimeout(() => {
        preloader.value = false;
            }, 2000);
}

export default {
    data() {
        return {
            showPreload: preloader
        };
    }
}

export { exibirPreload }; // Exporte a função

</script>