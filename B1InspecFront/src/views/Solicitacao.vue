<template>
    <div class="consulta-solicitacao" id="element-to-pdf">
        <div class="cons-solicitacao-title">
            <h1>Solicitação</h1>
        </div>
        <div class="cons-solicitacao-body">
            <div v-for="os in ordem" :key="os.servicoId" class="card-cons">
                <div class="card-cons-title">
                    <h3>N° {{ os.servicoId }}</h3>
                </div>
                <div class="card-cons-body">
                    <div class="card-box-group">
                        <div class="card-box">
                            <p>Empresa</p>
                            <span>{{ os.cliente.clienteNome }}</span>
                        </div>
                        <div class="card-box">
                            <p>Segmento:</p>
                            <span>{{ os.status }}</span>
                        </div>
                    </div>
                    <div class="card-box-group">

                        <div class="card-box">
                            <p>Status:</p>
                            <span>{{ os.status }}</span>
                        </div>
                    </div>
                </div>
                <div class="card-cons-actions">
                    <button @click="() => { capturarOrdem(os.servicoId);  }"
                        class="card-button-view">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </button>
                    <button class="card-button-edit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen"
                            viewBox="0 0 16 16">
                            <path
                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <button class="card-button-exp" @click="exportToPDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"/>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import html2pdf from "html2pdf.js"
import '../assets/css/solicitacao/solicitacao.css'
import axios from 'axios';
import { onMounted, ref } from 'vue';

const ordem = ref([]);
const idOrdem = ref('');
const dtaAbertura = ref('');
const dtaFechamento = ref('');
const staus = ref('');
const prestadorOrdem = ref('');
const segmentoOrdem = ref('');
const cliente = ref('');
const desc = ref('');

async function capturarOrdem(id: string) {
    let rota = 'http://localhost:8080/ordemservico/' + id
    try {
        const response = await axios.get(rota);
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
        console.log(ordem.value);
    } catch (error) {
        console.error('Ocorreu um erro ao coletar as ordens:', error);
    }
}


async function loadTabela() {
    try {
        const response = await axios.get('http://localhost:8080/ordemservico');
        ordem.value = response.data;
        console.log(ordem.value);
    } catch (error) {
        console.error('Ocorreu um erro ao coletar os ordem:', error);
    }
}


async function exportToPDF() {
    try {
        const element = document.getElementById('element-to-pdf');
        const pdfOptions = {
            margin: 10,
            filename: 'solicitacao.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        const pdfBlob = await html2pdf().from(element).set(pdfOptions).outputPdf('blob');
        const url = URL.createObjectURL(pdfBlob);

        // Crie um link para download e clique nele para baixar o PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'solicitacao.pdf';
        a.click();
    } catch (error) {
        console.error('Erro ao exportar para PDF:', error);
    }
}

onMounted(() => {
    loadTabela();
});
</script>