<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
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
          <button class="aprovar" @click="() => { exibicaoInput(false); aprovacao(item.checklistPersonalizadoNome, 'Aprovado', item.checklistPersonalizadoId); }">Aprovar</button>
          <button class="reprovar" @click="exibicaoInput(index)">Reprovar</button>
          <input v-if="index === campo" v-model="observacao" placeholder="Informe o motivo da reprovação" />
          <button class="enviar" @click="() => { exibicaoInput(index); aprovacao(item.checklistPersonalizadoNome, 'Reprovado', item.checklistPersonalizadoId); }" v-if="index === campo">
          <span class="button-text">Enviar</span>
          </button>
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

const token = localStorage.getItem('token')

// Campos a serem exibidos
const checklist = ref([])
const campo = ref(true)
const idOrdem = ref('')
const idSegmento = ref('')
const observacao = ref('')
const status = ref('')
const nomecheck = ref('')
const route = useRoute();
const idCliente = ref()
const idPrestador = ref()
const erro = ref();
const dataHoraBrasileira = ref()
const statsCheck = ref ()


function exibicaoInput(index: boolean) {
  campo.value = index;
  console.log(idSegmento.value);

}


async function capturarOrdem() {
  let rota = `http://localhost:8080/ordemservico/${route.params.idOrdem}`
  try {
    const response = await axios.get(rota,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    const ordemData = response.data;
    console.log('====================================');
    console.log(ordemData);
    console.log('====================================');
    checklist.value = ordemData.checklistPersonalizados.map(item => {
      return {
        ...item,
        mostrarInput: false, // Inicialmente, o campo de motivo de reprovação está oculto
      };
    });

  } catch (error) {
    console.error('Ocorreu um erro ao coletar as ordens:', error);
  }
}

async function aprovacao(nome: string, sts: string, id: string) {
  status.value = sts
  console.log('====================================');
  console.log(nome);
  console.log('====================================');
  try {
    await axios.put(`http://localhost:8080/checklist_personalizado/${id}`, {
      checklistPersonalizadoNome: nome,
      ordemServicoId: idOrdem.value,
      segmentoId: idSegmento.value,
      observacao: observacao.value,
      situacao: status.value

    },{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    alert('Atualizado')

  }catch(error){
    console.error('Ocorreu um erro ao atualizar a ordem:', error);
    alert('Erro ao atualizar a ordem');
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
  
