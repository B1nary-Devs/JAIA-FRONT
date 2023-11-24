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
                            <router-link :to="{
                                name: 'ImpressaoOrdem',
                                params: {
                                    dataAbertura: solicitacao.dataAbertura,
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
                <button class="observacoes">Observação</button>
                <RouterLink to="/">
                    <button class="nova-ordem">Solicitar Nova Ordem</button>
                </RouterLink>
            </div>
        </div>
    </div>

    <PreLoader></PreLoader>
</template>

<script setup lang="ts">
import '../assets/css/clientes/client.css';
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
