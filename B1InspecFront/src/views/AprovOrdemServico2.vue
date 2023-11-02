<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Ordem de Serviço</h1>
    </div>
    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label for="id_data_abertura">Data de Abertura:</label>
          <p>{{ $route.params.dataAbertura }}</p>
        </div>

        <div class="input-box">
          <label for="id_data_fechamento">Data de Fechamento:</label>
          <p>{{ $route.params.dataFechamento }}</p>
        </div>

        <div class="input-box">
          <label for="id_empresa">Empresa:</label>
          <p>{{ $route.params.empresa }}</p>
        </div>

        <div class="input-box">
          <label for="id_status">Status:</label>
          <p>{{ $route.params.status }}</p>
        </div>

        <div class="input-box">
          <label for="id_descricao">Descrição:</label>
          <p>{{ $route.params.descricao }}</p>
        </div>

        <div class="input-box">
          <label for="id_segmento">Segmento:</label>
          <p>{{ $route.params.segmento }}</p>
        </div>

        <div class="input-box">
          <label for="id_prestador">Prestador:</label>
          <p>{{ $route.params.prestador }}</p>
        </div>

        <div class="input-box">
          <label for="id_checklist">Checklist:</label>
        </div>

        <div class="checklist-body-items" v-for="(item, index) in checklist" :key="index">
          <p>{{ item.checklistPersonalizadoNome }}</p>
          <button @click="exibicaoInput(false)">Aprovar</button>
          <button @click="exibicaoInput(index)">Reprovar</button>
          <input v-if="index === campo" placeholder="Informe o motivo de reprovação" />
          <button v-if="index === campo">ooi</button>
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


function exibicaoInput(index) {
  campo.value = index;
  console.log(idSegmento.value);

}


async function capturarOrdem() {
  let rota = `http://localhost:8080/ordemservico/${1}`
  try {
    const response = await axios.get(rota);
    const ordemData = response.data;
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

async function aprovacao(id: string) {
  try {
    await axios.post('http://localhost:8080/prestador', {
      prestadorNome: nome.value,
      cnpj: cnpj.value,
      email: email.value,
      senha: senha.value,
      segmentoId: categoriaSelecionada.value

    });
  }catch(error){
    console.error('Ocorreu um erro ao cadastrar o prestador:', error);
    alert('Erro ao cadastrar o prestador.');
  }
}




// Escute o evento personalizado para visualizar a ordem e preencher os campos
onMounted(() => {

    capturarOrdem()
    const route = useRoute();
    idOrdem.value = route.params.idOrdem
    idSegmento.value = route.params.idSegmento
    status.value = route.params.status

  })

</script>
  