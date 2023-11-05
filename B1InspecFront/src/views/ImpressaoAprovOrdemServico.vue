<template>
  <div class="form-cadastro" id="element-to-pdf">
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
          <ul>
            <li><p>{{ item.checklistPersonalizadoNome }}</p></li>
          </ul>
          <p>{{ item.situacao }}</p>
          <p>{{ item.observacao }}</p>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import html2pdf from "html2pdf.js"
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




// Escute o evento personalizado para visualizar a ordem e preencher os campos
onMounted(() => {
    
    capturarOrdem()
    
    idOrdem.value = route.params.idOrdem
    idSegmento.value = route.params.idSegmento
    status.value = route.params.status

    setTimeout(() => {
      exportToPDF()
    }, 1000);

  })

</script>
  