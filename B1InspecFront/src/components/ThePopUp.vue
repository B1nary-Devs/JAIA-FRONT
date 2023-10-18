<template>
    <div v-if="showPopup" class="cover"></div>
    <div class="card" :class="{ active: showPopup }">
        <button @click="ocultarPopup" class="dismiss" type="button">×</button>
        <div class="header">
            <div class="image">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </g>
                </svg>
            </div>
            <div class="content">
                <span class="title">{{ title }}</span>
                <p class="message">{{ mensagem }}</p>
            </div>
            <div class="actions">
                <button class="button-ok" @click="ocultarPopup">Ok</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import '../assets/css/popup/popup.css'

const popup = ref(false)
const mensagem = ref("");
const title = ref("");
const cod = ref(0);

function exibirPopup(titulo: string, msg: string, codigo: number) {
  popup.value = true;
  mensagem.value = msg;
  title.value = titulo;
  cod.value = codigo;
  console.log(popup.value);
}

export default {
  data() {
    return {
      showPopup: popup,
      mensagem: mensagem,
      title: title,
      cod: cod,
    };
  },
  methods: {
    mostrarPopup() {
      this.showPopup = true; // Define showPopup como true para exibir o popup
    },
    ocultarPopup() {
      window.location.reload(); // Define showPopup como false para ocultar o popup
    }
  }
}

export { exibirPopup }; // Exporte a função
</script>