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
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

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

<style scoped>
.cover{
    width: 100%;
    position: absolute;
    z-index: 9999;
    background-color: black;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
}

.card.card.active {
    z-index: 99999999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    text-align: left;
    border-radius: 0.5rem;
    max-width: 290px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: #fff;
}

.card:not(.active) {
  display: none;
}
  
  .dismiss {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: black;
    border: 2px solid #D1D5DB;
    font-size: 1rem;
    font-weight: 300;
    width: 30px;
    height: 30px;
    border-radius: 7px;
    transition: .3s ease;
  }
  
  .dismiss:hover {
    background-color: #ee0d0d;
    border: 2px solid #ee0d0d;
    color: #fff;
  }
  
  .header {
    padding: 1.25rem 1rem 1rem 1rem;
  }
  
  .image {
    margin-top: 35px;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #6eeb789f;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    border-radius: 9999px;
    animation: animate .6s linear alternate-reverse infinite;
    transition: .6s ease;
  }
  
  .image svg {
    color: #0afa2a;
    width: 2rem;
    height: 2rem;
  }
  
  .content {
    margin-top: 1.90rem;
    text-align: center;
  }
  
  .title {
    color: #066e29;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5rem;
  }
  
  .message {
    margin-top: 0.5rem;
    color: #565657;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.25rem;
  }
  
  .actions {
    margin-top: 1.0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  
  .button-ok {
    height: 45px;
    background-color: #1aa06d;
    border: 1px solid #1aa06d;
    font-size: 15px;
    transition: .2s ease;
  }

  .button-ok:hover {
    background-color: #d0f5e7;
    border: 1px solid #1aa06d;
    color: #1aa06d;
  }
  
  @keyframes animate {
    from {
      transform: scale(1);
    }
  
    to {
      transform: scale(1.09);
    }
  }
</style>