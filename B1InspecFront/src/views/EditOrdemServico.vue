<template>
    <div class="form-cadastro">
        <div class="form-title">
            <h1 class="titulo-ordem">Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
        </div>
        <div class="form-body">
            <div class="input-group">
                <div class="input-box">
                    <label>Data de Abertura:</label>
                    <p>{{ $route.params.dataAbertura }}</p>
                </div>

                <div class="input-box">
                    <label>Data de Fechamento:</label>
                    <p>{{ $route.params.dataFechamento }}</p>
                </div>

                <div class="input-box">
                    <label>Empresa:</label>
                    <p>{{ $route.params.empresa }}</p>
                </div>

                <div class="input-box">
                    <label>Status:</label>
                    <p>{{ $route.params.status }}</p>
                </div>

                <div class="input-box">
                    <label>Descrição:</label>
                    <p>{{ $route.params.descricao }}</p>
                </div>

                <div class="input-box">
                    <label>Segmento:</label>
                    <p>{{ $route.params.segmento }}</p>
                </div>

                <div class="input-box">
                    <label>Prestador:</label>
                    <p>{{ $route.params.prestador }}</p>
                </div>

                <div class="input-box">
                    <label for="id_checklist">Checklist:</label>
                </div>

                <div class="checklist-body-items" v-for="(item, index) in checklist" :key="index">
                    <p>{{ item.checklistPersonalizadoNome }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';
import '../assets/css/aprovOrdemServico/aprovOrdemServico.css'


// Campos a serem exibidos
const checklist = ref([])
const campo = ref(true)
const idOrdem = ref('')
const idSegmento = ref('')
const observacao = ref('')
const status = ref('')
const nomecheck = ref('')
const route = useRoute();

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




// Escute o evento personalizado para visualizar a ordem e preencher os campos
onMounted(() => {

    capturarOrdem()

    idOrdem.value = route.params.idOrdem
    idSegmento.value = route.params.idSegmento
    status.value = route.params.status

})

</script>
    