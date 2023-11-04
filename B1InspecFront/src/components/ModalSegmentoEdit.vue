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
                </div>
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-gear"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                            </svg>
                            <!-- Checklist: -->
                        </p>
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
    nomeSegmento: String

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