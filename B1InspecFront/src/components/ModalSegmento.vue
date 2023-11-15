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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                class="bi bi-wrench-adjustable-circle" viewBox="0 0 16 16">
                                <path
                                    d="M12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8Zm-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
                            </svg>
                            Nome:
                        </p>
                        <span>{{ nomeSegmento }}</span>
                        <!-- <div class="itens" v-for="x in checklist" :key="x.checklistId">
                                - {{ x.checklistNome }}
                        </div> -->
                    </div>
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-card-checklist"
                                viewBox="0 0 16 16">
                                <path
                                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                <path
                                    d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                            </svg>
                            Checklist:
                        </p>
                        <!-- <span>{{  xx.checklistPersonalizadoNome }}</span> -->
                    </div>
                    <div class="modal-box-check" v-for="x in checklist" :key="x.checklistId">
                        <ul>
                            <li><span>{{ x.checklistNome }}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../assets/css/modal/modal.css';
import { type PropType } from 'vue';

//aqui importando a função para ser usada no modal
const props = defineProps({
    toggleModal: {
        type: Function,
        required: true,
    },

    /* (1° PASSO) DECLARE AS PROPS DA ENTIDADE PARA PASSAR PARA OS CAMPOS HTML*/
    idSegmento: String,
    nomeSegmento: String,
    // checklistList: {
    //     type: Array as PropType<{ checklistId: number, checklistNome: string }[]>, // Especifique o tipo
    //     required: true,
    // }
    checklist: Object
});

</script>