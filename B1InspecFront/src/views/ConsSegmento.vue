<template>
    <div class="container-table">
        <div class="cons-title">
            <h1>Segmento</h1>
        </div>
        <div class="cons-table">
            <div class="filter">

            </div>

            <table>
                <thead>
                    <th>Nome</th>
                    <th colspan="2">Ações</th>
                </thead>
                <tbody>
                    <tr v-for="segmento in segmento" :key="segmento.id">
                        <td>{{ segmento.nome }}</td>
                        <!-- <div class="itens" v-for="checklist in segmento.checklistList" :key="checklist.checklistId">
                                - {{ checklist.checklistNome }}
                        </div> -->
                        <td>
                            <button 
                            @click ="() => {segmentoCaptura(segmento.id); toggleModal('buttonTriggers'); }"
                            class="btn-info" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    c   lass="bi bi-eye" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </button>
                            <button 
                            @click="() => {  segmentoCaptura(segmento.id);  toggleModalEdit('buttonTriggersEdit'); }"
                            class="btn-edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pen" viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cons-buttons">
            <button class="button-return" @click="returnarPag">Voltar</button>
        </div>
        <div class="footer">
            <p>© B1naryInspec | V.01</p>
        </div>
    </div>
     <!--passe as variaveis ref dentro dos parametros DAS PROPS do modal-->
     <ModalSegmento :idSegmento="idSegmento" :nomeSegmento="nomeSegmento" :checklist = "checklistList"
        v-if="modalTriggers.buttonTriggers" :toggleModal="() => toggleModal('buttonTriggers')">
    </ModalSegmento>

    <!-- passe os valores ref dentro dos parametros DAS PROPS do modal -->
    <ModalSegmentoEdit :idSegmento="idSegmento" :nomeSegmento="nomeSegmento" :checklist = "checklistList"
        v-if="modalTriggersEdit.buttonTriggersEdit" :toggleModalEdit="() => toggleModalEdit('buttonTriggersEdit')">
    </ModalSegmentoEdit>

    <PreLoader></PreLoader>
</template>

<script setup lang="ts">
/*IMPORTAÇÃO DOS MODAIS*/
import ModalSegmento from '../components/ModalSegmento.vue';
import ModalSegmentoEdit from '../components/ModalSegmentoEdit.vue';
import '../assets/css/table/table.css'
import axios from 'axios';
import { onMounted, watchEffect, ref } from 'vue';
import PreLoader from '../components/PreLoader.vue';
import { exibirPreload } from '../components/PreLoader.vue'

const segmento = ref([]);
const nomeFiltro = ref('');


/*VARIAVEIS REF PARA PREENCHER A PROPS*/
const nomeSegmento = ref('');
const idSegmento = ref('');
const checklistList = ref([]);
const checklistNome = ref('');
const checklistId = ref('');
const token = localStorage.getItem('token')

async function segmentoCaptura(id) {
    idSegmento.value = id.toString();
    try {
        const response = await axios.get('http://localhost:8080/segmento/' + idSegmento.value,{
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        const segmentoData = response.data;
        console.log(segmentoData);
        /*passe os valores do response para as ref*/
        idSegmento.value = segmentoData.id.toString();
        nomeSegmento.value = segmentoData.nome;
        checklistNome.value = segmentoData.checklistList.checklistNome;
        checklistId.value = segmentoData.checklistList.checklistId;
        checklistList.value = segmentoData.checklistList;

    } catch (error) {
        console.error('Ocorreu um erro ao coletar do segmento:', error);
    }
};

async function loadTabela() {
    try {
        const response = await axios.get('http://localhost:8080/segmento',{
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        segmento.value = response.data;
        console.log(segmento.value);
    } catch (error) {
        console.error('Ocorreu um erro ao consultar os segmentos:', error);
    }
}
function returnarPag() {
    window.history.back();
}


/* ------------MODAL DE CONSULTA SEGMENTO----------------------*/
//aqui a variavel responsavel por guardar se exibe o modal ou nao
const modalTriggers = ref<{ [key: string]: boolean }>({
    buttonTriggers: false
});

//variavel que usa um evento para mudar o estado de exibir do modal
const toggleModal = (trigger: keyof typeof modalTriggers.value) => {
    modalTriggers.value[trigger] = !modalTriggers.value[trigger];
    console.log(modalTriggers.value)
};

/* ------------MODAL DE EDITAR SEGMENTO----------------------*/
const modalTriggersEdit = ref<{ [key: string]: boolean }>({
    buttonTriggersEdit: false
});

const toggleModalEdit = (trigger: keyof typeof modalTriggersEdit.value) => {
    modalTriggersEdit.value[trigger] = !modalTriggersEdit.value[trigger];
    console.log(modalTriggersEdit.value)
};

onMounted(() => {
    loadTabela();
});


</script>