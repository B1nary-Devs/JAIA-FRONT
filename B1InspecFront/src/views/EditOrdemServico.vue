<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1 class="titulo-ordem">Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
    </div>
    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label>Data de Abertura:</label>
          <input v-model="dataAbertura" id="dataAbertura"  />
        </div>

        <div class="input-box">
          <label>Data de Fechamento:</label>
          <input v-model="dataFechamento" id="dataFechamento" />
        </div>

        <div class="input-box">
          <label>Empresa:</label>
          <input v-model="empresa" id="empresa" />
        </div>

        <div class="input-box">
          <label>Status:</label>
          <input v-model="status" id="status" />
        </div>

        <div class="input-box">
          <label>Descrição:</label>
          <input v-model="descricao" id="descricao" />
        </div>

        <div class="input-box">
          <label>Segmento:</label>
          <input v-model="segmento" id="segmento" />
        </div>

        <div class="input-box">
          <label>Prestador:</label>
          <input v-model="prestador" id="prestador" />
        </div>

        <button @click="salvarAlteracoes">Salvar Alterações</button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import '../assets/css/editOrdemServico/editOrdemServico.css'

// Campos a serem exibidos
const dataAbertura = ref('')
const dataFechamento = ref('')
const empresa = ref('')
const status = ref('')
const descricao = ref('')
const prestador = ref('')
const segmento = ref('')
const campo = ref(true)
const idOrdem = ref('')
const idSegmento = ref('')
const observacao = ref('')
const route = useRoute()

const token = localStorage.getItem('token')

async function capturarOrdem() {
  let rota = `http://localhost:8080/ordemservico/${route.params.idOrdem}`
  try {
    const response = await axios.get(rota, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const ordemData = response.data

    
    dataAbertura.value = ordemData.dataAbertura;
    dataFechamento.value = ordemData.dataFechamento;
    empresa.value = ordemData.cliente.clienteNome; 
    status.value = ordemData.status;
    descricao.value = ordemData.descricao;
    segmento.value = ordemData.prestador[0].segmento.nome;  
    prestador.value = ordemData.prestador[0].prestadorNome;  
    idOrdem.value = ordemData.servicoId;

  } catch (error) {
    console.error('Ocorreu um erro ao coletar as ordens:', error)
  }
}

async function salvarAlteracoes() {
  try {
    const rota = `http://localhost:8080/ordemservico/${route.params.idOrdem}`;
    const response = await axios.put(rota, {
      dataAbertura: dataAbertura.value,
      dataFechamento: dataFechamento.value,
      clienteNome: empresa.value, 
      status: status.value,
      descricao: descricao.value,
      
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Alterações salvas com sucesso:', response.data);
   
  } catch (error) {
    console.error('Ocorreu um erro ao salvar as alterações:', error);
   
  }
}


onMounted(() => {
  capturarOrdem()

})
</script>
