<template>
    <div class="consulta-ordem-servico">
        <div class="cons-ordem-title">
            <h1>Solicitações</h1>
        </div>
        <div class="cons-ordem-body">
            <div v-for="os in ordem" :key="os.solicitacaoId" class="card-cons">
                <div class="card-cons-title">
                    <h3>N° {{ os.solicitacaoId }}</h3>
                </div>
                <div class="card-cons-body">
                    <div class="card-box-group">
                        <div class="card-box">
                            <p>Empresa:</p>
                            <span>{{ os.nomeEmpresa }}</span>
                        </div>
                        <div class="card-box">
                            <p>CNPJ</p>
                            <span>{{ os.cnpj }}</span>
                        </div>
                    </div>
                    <div class="card-box-group">
                        <div class="card-box">
                            <p>Segmento</p>
                            <span>{{ os.segmento.nome }}</span>
                        </div>
                        <div class="card-box">
                            <p>Status:</p>
                            <span>{{ os.resultado }}</span>
                        </div>
                    </div>
                </div>
                <div class="card-cons-actions">
                    
                    <router-link v-if="os.descricao" :to="{ 
                            name: 'AprovSolicitacoes', 
                            params: { 
                                idEmpresa: os.solicitacaoId,
                                nomeEmpresa: os.nomeEmpresa,  
                                status: os.resultado,
                                idSegmento: os.segmento.id,
                                segmentoNome: os.segmento.nome,
                                descricao: os.descricao,
                                cnpj: os.cnpj,
                                idSolicitacao: os.solicitacaoId
                            }
                            }">
                    <button
                        class="card-button-view">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../assets/css/Ordem/consultaOrdem.css'
import axios from 'axios';
import { onMounted, ref } from 'vue';

const ordem = ref([]);
const solicitacoes = ref();

const idOrdem = ref('');
const dtaAbertura = ref('');
const dtaFechamento = ref('');
const staus = ref('');
const prestadorOrdem = ref('');
const segmentoOrdem = ref('');
const cliente = ref('');
const desc = ref('');
const check = ref([])
const clienteId = ref('')
const prestadorId = ref('')

const token = localStorage.getItem('token')

async function loadTabela() {
    try {

        const response = await axios.get('http://localhost:8080/solicitacao',{});
        ordem.value = response.data
        console.log(response.data);
        
    } catch (error) {
        console.error('Ocorreu um erro ao coletar os ordem:', error);
    }
}

onMounted(() => {
    loadTabela();
});
</script>

