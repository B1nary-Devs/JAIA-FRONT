<template>
    <div div class="modal-segmento-background">
        <div class="modal">
            <div class="modal-title">
                <h1>N° {{ idSegmento }}</h1>
                <!-- usando a função para trocar o estado do modal-->
                <button class="modal-fechar" @click="toggleModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </button>
            </div>
            <div class="modal-cons-body">
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            Nome:
                        </p>
                        <span>{{ nomeSegmento }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../assets/css/modal/modal.css'

//aqui importando a função para ser usada no modal
const props = defineProps({
    toggleModal: {
        type: Function,
        required: true,
    },

    /* (1° PASSO) DECLARE AS PROPS DA ENTIDADE PARA PASSAR PARA OS CAMPOS HTML*/
    idSegmento: String,
    nomeSegmento: String,

});

</script>