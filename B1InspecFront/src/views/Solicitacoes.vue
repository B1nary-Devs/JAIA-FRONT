<template>
    <div class="container-table">
        <div class="cons-title-cliente">
            <h1>Solicitações</h1>
            <RouterLink to="/"><p class="link-home-client">
                Home
            </p></RouterLink>
        </div>
        <div class="cons-table-client">
            <div class="cliente-dados">
                <div class="cliente-dados-item">
                    <p>Empresa:</p>
                    <label>{{ nome }}</label>
                </div>
                <div class="cliente-dados-item">
                    <p>Quantidade de Ordens:</p>
                    <label>{{ solicitacoes.length }}</label>
                </div>
            </div>
            <table>
                <thead>
                    <th>Ordem</th>
                    <th>Abertura</th>
                    <th>Fechamento</th>
                    <th>Status</th>
                    <th>Visualizar</th>
                </thead>
                <tbody>
                    <tr v-for="solicitacao in solicitacoes">
                        <td>{{ solicitacao.servicoId }}</td>
                        <td>{{ solicitacao.dataAbertura }}</td>
                        <td v-if="solicitacao.dataFechamento">{{ solicitacao.dataFechamento }}</td>
                        <td v-else> - - - </td>
                        <td>{{ solicitacao.status }}</td>
                        <td>
                            <router-link v-if="solicitacao.dataFechamento" :to="{
                                name: 'ImpressaoOrdem',
                                params: {
                                    dataAbertura: solicitacao.dataAbertura,
                                    dataFechamento: solicitacao.dataFechamento, 
                                    empresa: solicitacao.cliente.clienteNome,
                                    status: solicitacao.status,
                                    segmento: solicitacao.prestador[0].segmento.nome,
                                    prestador: solicitacao.prestador[0].prestadorNome,
                                    idSegmento: solicitacao.prestador[0].segmento.id,
                                    descricao: solicitacao.descricao,
                                    idOrdem: solicitacao.servicoId,
                                }
                            }">
                                <button class="card-button-view">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-eye" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg>
                                </button>
                            </router-link>
                            <router-link v-else :to="{
                                name: 'ImpressaoOrdem',
                                params: {
                                    dataAbertura: solicitacao.dataAbertura,
                                    dataFechamento: '---', 
                                    empresa: solicitacao.cliente.clienteNome,
                                    status: solicitacao.status,
                                    segmento: solicitacao.prestador[0].segmento.nome,
                                    prestador: solicitacao.prestador[0].prestadorNome,
                                    idSegmento: solicitacao.prestador[0].segmento.id,
                                    descricao: solicitacao.descricao,
                                    idOrdem: solicitacao.servicoId,
                                }
                            }">
                                <button class="card-button-view">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-eye" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                    </svg>
                                </button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="cliente-actions">
                <RouterLink to="/">
                    <button class="nova-ordem">Solicitar Nova Ordem</button>
                </RouterLink>
            </div>
        </div>
    </div>

    <PreLoader></PreLoader>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const idClient = ref('')
const route = useRoute();
const nome = ref('')
const solicitacoes = ref([])
const erro = ref();

import { onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  
  nomeCliente: String

});

//função de captura de dados
async function atualizar() {
    try {                                  // COLOCAR URL DO GITPOD SERVIDOR SPRING //
        solicitacoes.value = (await axios.get(`http://localhost:8080/ordemservico/cliente/${idClient.value}`)).data;
        nome.value = solicitacoes.value[0].cliente.clienteNome;
    }
    catch (ex) {
        alert('URL INVÁLIDA OU INCORRETA')
        erro.value = (ex as Error).message;
    }
}

//PUXR DADOS AO SISTEMA ABRIR A PAG
onMounted(() => {

    idClient.value = route.params.id

    atualizar();
});

</script>

<style>
.container-table {
    width: 100%;
    height: 100vh;
    background: #f8f8f9;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cons-title-cliente {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    background-color: #0c0c0c;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.cons-title-cliente h1 {
    margin-left: 80px;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
}

.cons-title-cliente p {
    margin-right: 80px;
    color: rgb(255, 255, 255);
    font-size: 17px;
    letter-spacing: 2px;
}

.cliente-dados{
    width: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
}

.cliente-dados .cliente-dados-item{
    width: 100%;
    display: flex;
}

.cliente-dados p{
    font-size: 15px;
    margin-left: 10px;
    letter-spacing: 2px;
    font-weight: bold;
}

.cliente-dados label{
    font-size: 15px;
    margin-left: 5px;
}

.cons-table-client {
    width: 100%;
    margin-top: 3%;
    background-color: #ffffff;
}

table {
    width: 85%;
    max-height: 400px; 
    margin: auto;
    margin-top: 2%;
    margin-bottom: 70px;
    border-collapse: collapse;
    overflow-y: scroll;
  }
  

table td,
table th {
    height: 50px;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    flex-direction: row;
}

table th {
    text-align: center;
    background-color: rgb(0, 0, 0);
    color: #ffffff;
}

table tbody tr:nth-child(even) {
    background-color: #f7f7f771;
}

tr {
    transition: all .2s ease-in;
    cursor: pointer;
    color: black;
    font-size: 25px;
    font-weight: bold;
    border-bottom: 1px solid black;
    
}

tr:hover {
    transform: scale(1.02);
    border-bottom: black 2px solid;
}

.card-button-view{
    width: 30px;
    height: 25px;
    margin-right: 5px;
    cursor: pointer; 
    background-color: #0862e9e8;
    border-radius: 5px;
    border: 1px solid transparent;
    transition: all .2s ease-in;
}

.card-button-view svg{
    fill: white;
}

.card-button-view:hover{
    background-color: rgb(248, 247, 247);
    border: 1px solid #0862e9e8;
    transition: 0.5s;
}

.card-button-view:hover svg{
    fill: #0862e9e8;;
}

.cliente-actions{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.observacoes{
    margin-top: 10px;
    width: 220px;
    height: 30px;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: rgb(0, 88, 129);
    color: rgb(255, 255, 255);
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in;
}

.observacoes:hover{
    border: 1px solid rgb(0, 88, 129);
    background-color: rgb(255, 255, 255);
    color: rgb(0, 88, 129);
}

.nova-ordem{
    margin-top: 10px;
    width: 220px;
    height: 30px;
    border: 1px solid transparent;
    border-radius: 10px;
    background-color: rgb(50, 131, 131);
    color: rgb(255, 255, 255);
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease-in;
}

.nova-ordem:hover{
    border: 1px solid rgb(50, 131, 131);
    background-color: rgb(255, 255, 255);
    color:  rgb(50, 131, 131);
}
</style>