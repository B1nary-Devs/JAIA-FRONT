<template>
  <div v-if="showModal" class="cover"></div>
  <div class="card" :class="{ active: showModal }">
      <button @click="ocultarModal" class="dismiss" type="button">×</button>
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
              <span class="segmento">{{ segmento }}</span>
              <!-- <p class="checklist">{{ checklist }}</p>
              <p class="itens">{{ itens }}</p> -->
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import '../assets/css/modal/modal.css'

const modal = ref(false)
const segmento = ref("");
// const checklist = ref("");
// const itens = ref<string[]>([]);
const cod = ref(0);

export function exibirModal(nomeSegmento: string, /*tituloChecklist: string, itensChecklist: string[] | string, */codigo: number) {
modal.value = true;
segmento.value = nomeSegmento;
// checklist.value = tituloChecklist;
// itens.value = Array.isArray(itensChecklist) ? itensChecklist : [itensChecklist];;
 cod.value = codigo;
// console.log(modal.value);
}

export default {
data() {
  return {
    showModal: modal,
    segmento: segmento,
    // checklist: checklist,
    // itens : itens,
     cod: cod,
  };
},
methods: {
  mostrarModal() {
    this.showModal = true; // Define showPopup como true para exibir o popup
  },
  ocultarModal() {
    this.showModal = false; // Define showPopup como false para ocultar o popup
  }
}
}
</script>