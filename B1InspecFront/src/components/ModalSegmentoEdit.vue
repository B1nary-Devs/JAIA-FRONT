<template>
    <div div class="modal-segmento-background">
        <div class="modal">
            <div class="modal-title">
                <h1>N° {{ idSegmento }}</h1>
                <div class="modal-title-buttons">
                <!-- usando a função para trocar o estado do modal-->
                <button class="modal-fechar" @click="toggleModalEdit()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path   
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </button>
                <button class="modal-aplicar" @click="() => { toggleModalEdit(); atualizarSegmento(); }">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-check2"
                        viewBox="0 0 16 16">
                        <path
                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
            </div>
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
                        <!--v-model para capturar os valores dos campos-->
                        <input type="text" v-model="nome">
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
import '../assets/css/modal/modal.css'
import '../views/ConsSegmento.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';


//aqui importando a função para ser usada no modal
const props = defineProps({
    toggleModalEdit: {
        type: Function,
        required: true,
    },

    /* (1° PASSO) DECLARE AS PROPS DA ENTIDADE PARA PASSAR PARA OS CAMPOS HTML*/
    idSegmento: String,
    nomeSegmento: String,
    checklist: Object

});

//variaveis auxiliares para capturar os v alores das props E PASSAR PARA AS V-MODEL
//que o usuário irá passar no componente pai*/
const idProps = props.idSegmento;
const nomeProps = props.nomeSegmento;

//VARIAVEIS V-MODEL PARA PASSAR PARA O CORPO DA REQUISICAO
const id = ref(idProps)
const nome = ref(nomeProps);
const token = localStorage.getItem('token')
async function atualizarSegmento() {
// Fazendo a requisição POST com os valores capturados
try {
    let rota = 'http://localhost:8080/segmento/' + id.value
    console.log(rota);
    await axios.put(rota, {
        nome: nome.value
    },{
        headers: {
            'Authorization': `Bearer ${token}` 
    }});

    alert('Segmento atualizado!');
    window.location.reload();

} catch (error) {
  console.error('Ocorreu um erro ao atualizar o segmento:', error);
  alert('Erro ao atualizar o segmento.');
}
}


</script>