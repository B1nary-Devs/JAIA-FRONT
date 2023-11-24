<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1 class="titulo-ordem">Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
    </div>
    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label>Data de Abertura:</label>
          <input v-model="dataAbertura"  />
        </div>

        <div class="input-box">
          <label>Data de Fechamento:</label>
          <input v-model="dataFechamento" />
        </div>

        <div class="input-box">
          <label>Empresa:</label>
          <input v-model="empresa"  />
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
          <input v-model="segmento"  />
        </div>

        <div class="input-box">
          <label>Prestador:</label>
          <input v-model="prestador" />
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
const ordemId = ref('')
const dataAbertura = ref('')
const dataFechamento = ref('')
const empresa = ref('')
const status = ref('')
const descricao = ref('')
const prestador = ref('')
const prestadorId = ref('')
const checklistsId = ref('')
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
        await axios.put(`http://localhost:8080/ordemservico/${ordemId.value}}`,{
        dataAbertura: dataAbertura.value,
        dataFechamento: dataFechamento.value,
        status: status.value,
        descricao: descricao.value,
        empresa: empresa.value,  
        prestadores: [prestadorId.value],
        checklists: [checklistsId.value],  
        solicitacoes: [solicitacaoId.value]
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
