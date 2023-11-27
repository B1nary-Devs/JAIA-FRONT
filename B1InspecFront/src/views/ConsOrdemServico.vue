<template>
    <div class="consulta-ordem-servico">
        <div class="cons-ordem-title">
            <h1>Ordem de Serviço</h1>
        </div>
        <div class="cons-ordem-body">
            <div v-for="os in ordem" :key="os.servicoId" class="card-cons">
                <div class="card-cons-title">
                    <h3>N° {{ os.servicoId }}</h3>
                </div>
                <div class="card-cons-body">
                    <div class="card-box-group">
                        <div class="card-box">
                            <p>Data de Abertura:</p>
                            <span>{{ os.dataAbertura }}</span>
                        </div>
                        <div class="card-box">
                            <p>Data de Fechamento:</p>
                            <span v-if="os.dataFechamento">{{ os.dataFechamento }}</span>
                            <span v-else>---</span>
                        </div>
                    </div>
                    <div class="card-box-group">
                        <div class="card-box">
                            <p>Empresa</p>
                            <span>{{ os.cliente.clienteNome }}</span>
                        </div>
                        <div class="card-box">
                            <p>Status:</p>
                            <span>{{ os.status }}</span>
                        </div>
                    </div>
                </div>
                <div class="card-cons-actions">
                    <router-link v-if="os.dataFechamento && os.descricao" :to="{ 
                            name: 'ImpressaoOrdem', 
                            params: { 
                                dataAbertura: os.dataAbertura,
                                dataFechamento: os.dataFechamento, 
                                empresa: os.cliente.clienteNome,  
                                status: os.status,
                                segmento: os.prestador[0].segmento.nome, 
                                prestador: os.prestador[0].prestadorNome,
                                idSegmento: os.prestador[0].segmento.id,
                                descricao: os.descricao,
                                idOrdem: os.servicoId,

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
                    <router-link v-else :to="{ 
                            name: 'ImpressaoOrdem', 
                            params: { 
                                dataAbertura: os.dataAbertura,
                                dataFechamento: '---', 
                                empresa: os.cliente.clienteNome,  
                                status: os.status,
                                segmento: os.prestador[0].segmento.nome, 
                                prestador: os.prestador[0].prestadorNome,
                                idSegmento: os.prestador[0].segmento.id,
                                descricao: 'N/D',
                                idOrdem: os.servicoId,

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
                    <router-link v-if="os.dataFechamento && os.descricao" :to="{
                         name: 'editOrdem', 
                            params: { 
                                dataAbertura: os.dataAbertura,
                                dataFechamento: os.dataFechamento, 
                                empresa: os.cliente.clienteNome,  
                                status: os.status,
                                segmento: os.prestador[0].segmento.nome, 
                                prestador: os.prestador[0].prestadorNome,
                                idSegmento: os.prestador[0].segmento.id,
                                descricao: os.descricao,
                                idOrdem: os.servicoId,

                            }

                    }">
                    <button class="card-button-edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
                            viewBox="0 0 16 16">
                            <path
                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                    </button>
                    </router-link>
                    <router-link v-else :to="{
                         name: 'editOrdem', 
                            params: { 
                                dataAbertura: os.dataAbertura,
                                dataFechamento: '---', 
                                empresa: os.cliente.clienteNome,  
                                status: os.status,
                                segmento: os.prestador[0].segmento.nome, 
                                prestador: os.prestador[0].prestadorNome,
                                idSegmento: os.prestador[0].segmento.id,
                                descricao: os.descricao,
                                idOrdem: os.servicoId,

                            }

                    }">
                    <button class="card-button-edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
                            viewBox="0 0 16 16">
                            <path
                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                    </button>
                    </router-link>
                    <ModalOrdem :id="idOrdem" :prestador="prestadorOrdem" :segmento="segmentoOrdem" :cliente="cliente"
                        :desc="desc" :status="staus" :dtaAbertura="dtaAbertura" :dta-fechamento="dtaFechamento" :check = "check"
                        v-if="modalTriggers.buttonTriggers" :toggleModal="() => toggleModal('buttonTriggers')">
                        <h2>Meu modal</h2>
                    </ModalOrdem>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../assets/css/Ordem/consultaOrdem.css'
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ModalOrdem from '../components/ModalOrdem.vue';

const ordem = ref([]);

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

async function capturarOrdem(id: string) {
    let rota = `http://localhost:8080/ordemservico/${id}`
    try {
        const response = await axios.get(rota,{
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        const ordemData = response.data;

        idOrdem.value = ordemData.servicoId;
        dtaAbertura.value = ordemData.dataAbertura;
        dtaFechamento.value = ordemData.dataFechamento;
        staus.value = ordemData.status;

        /*CAPTURANDO NOME PRESTADOR*/
        const prestador = ordemData.prestador[0];
        prestadorOrdem.value = prestador.prestadorNome;

        /*CAPTURANDO SEGMENTO*/
        const segAuxiliar = ordemData.prestador[0];
        const seg = ordemData.prestador[0];
        segmentoOrdem.value = segAuxiliar.segmento.nome;

        cliente.value = ordemData.cliente.clienteNome;

        desc.value = ordemData.descricao;

        check.value = ordemData.checklistPersonalizados
        console.log(check.value);

        clienteId.value = ordemData.cliente.clienteId
        prestadorId.value = ordemData.prestador[0].prestadorId



    } catch (error) {
        console.error('Ocorreu um erro ao coletar as ordens:', error);
    }
}


async function loadTabela() {
    try {

        const response = await axios.get('http://localhost:8080/ordemservico',{
            headers: {
                'Authorization': `Bearer ${token}` 
            }});

        ordem.value = response.data;
        console.log(ordem.value);
    } catch (error) {
        console.error('Ocorreu um erro ao coletar os ordem:', error);
    }
}
/* ------------MODAL DA ORDEM----------------------*/
//aqui a variavel responsavel por guardar se exibe o modal ou nao
const modalTriggers = ref<{ [key: string]: boolean }>({
    buttonTriggers: false
});

//variavel que usa um evento para mudar o estado de exibir do modal
const toggleModal = (trigger: keyof typeof modalTriggers.value) => {
    modalTriggers.value[trigger] = !modalTriggers.value[trigger];
    console.log(modalTriggers.value)
};


onMounted(() => {
    loadTabela();
});

</script>