<template>
  <div class="form-actions">
    <button @click="returnarPag()">
      Retornar
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
      </svg>
    </button>
    <button @click="exportToPDF()">
      Imprimir
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
        <path
          d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
      </svg>
    </button>
  </div>
  <div class="form-pdf" id="element-to-pdf">
    <div class="pdf-title">
      <h1>Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
      <h3>{{ $route.params.prestador }}</h3>
      <div class="pdf-title-datas">
        <p>
          <bold>Data de Abertura:</bold> {{ $route.params.dataAbertura }}
        </p>
        <p>
          <bold>Data de Fechamento:</bold> {{ $route.params.dataFechamento }}
        </p>
      </div>
    </div>
    <div class="form-body-pdf">
      <div class="group-pdf">
        <div class="box-pdf">
          <div class="box-pdf-title">
            <h3>Empresa resposável</h3>
          </div>
          <div class="box-pdf-body">
            <div class="box-item">
              <div class="box-item-box">
                <label>Nome</label>
                <p>B1nary Inspec</p>
              </div>
              <div class="box-item-box">
                <label>E-mail de Contato</label>
                <p>b1naryinspec@gmail.com</p>
              </div>
            </div>
            <div class="box-item">
              <div class="box-item-box">
                <label>Razão Social</label>
                <p>B1nary Inspec LTDA</p>
              </div>
              <div class="box-item-box">
                <label>Telefone</label>
                <p>(12) 99999-9999</p>
              </div>
            </div>
          </div>
        </div>
        <div class="box-pdf">
          <div class="box-pdf-title">
            <h3>Cliente</h3>
          </div>
          <div class="box-pdf-body">
            <div class="box-item">
              <div class="box-item-box">
                <label>Nome</label>
                <p>{{ $route.params.empresa }}</p>
              </div>
              <div class="box-item-box">
                <label>URL de Acesso aos Chamados</label>
                <p>{{ $route.params.empresa }}</p>
              </div>
            </div>
            <div class="box-item">
              <div class="box-item-box">
                <label>CNPJ</label>
                <p>{{ $route.params.empresa }}</p>
              </div>
              <div class="box-item-box">
              </div>
            </div>
          </div>
        </div>
        <div class="box-pdf">
          <div class="box-pdf-title">
            <h3>Informação Imóvel</h3>
          </div>
          <div class="box-pdf-body-check">
            <div class="box-item-check" v-for="(item, index) in checklist" :key="index">
              <label>{{ item.checklistPersonalizadoNome }}</label>
              <p>{{ item.situacao }}</p>
              <p v-if="item.observacao"> Motivo: {{ item.observacao }}</p>
            </div>
          </div>
        </div>

        <div class="box-pdf">
          <div class="box-pdf-title">
            <h3>Prestador</h3>
          </div>
          <div class="box-pdf-body-check">
            <div class="box-item-check">
              <p>{{ $route.params.prestador }}</p>
            </div>
          </div>
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
import '../assets/css/impressao/impressao.css'

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
    const response = await axios.get(rota, {
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

function returnarPag() {
  window.history.back();
}


// Escute o evento personalizado para visualizar a ordem e preencher os campos
onMounted(() => {

  capturarOrdem()

  idOrdem.value = route.params.idOrdem
  idSegmento.value = route.params.idSegmento
  status.value = route.params.status


})

</script>
  