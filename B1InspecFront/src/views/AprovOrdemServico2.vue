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
            <div class="checklist-body">
              <div class="checklist-body-items">
                <p>perso</p>
                <button>Aprovar</button>
                <button>Reprovar</button>
              </div>
            </div>
          
          </div>

          

        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineProps } from 'vue'
  import axios from 'axios'
  import '../assets/css/aprovOrdemServico/aprovOrdemServico.css'
  import { useRouter } from 'vue-router'
  
  // Campos a serem exibidos
  const dataAbertura = ref('')
  const dataFechamento = ref('')
  const clienteNome = ref('')
  const status = ref('')
  const descricao = ref('')
  const segmentoOrdem = ref('')
  const prestadorOrdem = ref('')
  const checklist = ref('')
  
  const router = useRouter()

  async function capturarOrdem() {
    let rota = `http://localhost:8080/ordemservico/${5}`
    try {
        const response = await axios.get(rota);
        const ordemData = response.data;
        const checkPersonalizado = ordemData.checklistPersonalizados
        
        console.log(checkPersonalizado.checklistPersonalizadoNome);
        
        
    }catch(error){
      console.error('Ocorreu um erro ao coletar as ordens:', error);
    }
  }
  
  // Escute o evento personalizado para visualizar a ordem e preencher os campos
  onMounted(() => {

    capturarOrdem()


    document.addEventListener('visualizarOrdem', (event) => {
      const ordem = event.detail
  
      // Preencha os campos com os dados da ordem
      dataAbertura.value = ordem.dataAbertura
      dataFechamento.value = ordem.dataFechamento
      clienteNome.value = ordem.cliente.clienteNome
      status.value = ordem.status
      descricao.value = ordem.descricao
      segmentoOrdem.value = ordem.segmentoOrdem
      prestadorOrdem.value = ordem.prestadorOrdem

    })
  })


  const props = defineProps({
  id: String,
  dtaAbertura: String,
  dtaFechamento: String,
  prestador: String,
  segmento: String,
  cliente: String,
  status: String,
  desc: String,
  check: Array,
});


  </script>
  