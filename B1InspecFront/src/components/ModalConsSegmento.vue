<template>
  <div v-if="showModal" class="modal-background">
    <div class="modal">
      <button @click="fecharModal" class="close-button">×</button>
      <div class="modal-content">
        <!-- Conteúdo do seu modal aqui -->
        <h2>{{ title }}</h2>
        <p>{{ mensagem }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    showModal: Boolean,
    mensagem: String,
    title: String,
  },
  methods: {
    fecharModal() {
      this.$emit('fechar-modal'); // Emita um evento para fechar o modal
    },
  },
};
</script>