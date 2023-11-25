<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1 class="titulo-ordem">Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
    </div>
    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label>Data de Abertura:</label>
          <input v-model="dataAbertura" disabled />
        </div>

        <div class="input-box">
          <label>Data de Fechamento:</label>
          <input v-model="dataFechamento" />
        </div>

        <div class="input-box">
          <label>Empresa:</label>
          <input v-model="empresa" disabled />
        </div>

        <div class="input-box">
          <label>Status:</label>
          <input v-model="status" />
        </div>

        <div class="input-box">
          <label>Descrição:</label>
          <input v-model="descricao" />
        </div>

        <div class="input-box">
          <label>Segmento:</label>
          <input v-model="segmento" disabled />
        </div>

        <div class="input-box">
          <label>Prestador:</label>
          <input v-model="prestador" disabled />
        </div>

        <button @click="salvarAlteracoes">Salvar Alterações</button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
const prestadorId = ref('')
const checklistId = ref('')
const solicitacaoId = ref('')
const segmento = ref('')
const idOrdem = ref('')
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
     console.log(ordemData)
    dataAbertura.value = ordemData.dataAbertura;
    dataFechamento.value = ordemData.dataFechamento;
    empresa.value = ordemData.cliente.clienteId; 
    status.value = ordemData.status;
    descricao.value = ordemData.descricao;
    segmento.value = ordemData.prestador[0].segmento.nome;  
    prestador.value = ordemData.prestador[0].prestadorNome;  
    prestadorId.value = ordemData.prestador[0].prestadorId;
    idOrdem.value = ordemData.servicoId;

    console.log('ID do prestador:', prestadorId.value);
    console.log('ID do checklist:', checklistId.value);

  } catch (error) {
    console.error('Ocorreu um erro ao coletar as ordens:', error)
  }
}

async function salvarAlteracoes() {
  try {

      console.log(empresa.value)
        await axios.put(`http://localhost:8080/ordemservico/${idOrdem.value}`,{
        dataAbertura: dataAbertura.value,
        dataFechamento: dataFechamento.value,
        status: status.value,
        descricao: descricao.value,
        cliente: empresa.value,  
        prestadores: [prestadorId.value]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Registro atualizado!!');
    window.location.reload();
  } catch (error) {
    console.error('Ocorreu um erro', error);
    alert('Erro');
  }
}

onMounted(() => {
  capturarOrdem()

})
</script>
