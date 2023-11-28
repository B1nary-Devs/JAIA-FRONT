<template>
  <div class="form-cadastro-check">
    <div class="form-title-check">
      <h1>Ordem de Serviço N° {{ $route.params.idOrdem }}</h1>
    </div>
    <div class="form-body-check">
      <div class="input-group-check">
        <div class="input-box-check">
          <label>Data de Abertura:</label>
          <p>{{ $route.params.dataAbertura }}</p>
        </div>

        <div class="input-box-check">
          <label>Data de Fechamento:</label>
          <p>{{ $route.params.dataFechamento }}</p>
        </div>

        <div class="input-box-check">
          <label>Empresa:</label>
          <p>{{ $route.params.empresa }}</p>
        </div>

        <div class="input-box-check">
          <label>Status:</label>
          <p>{{ $route.params.status }}</p>
        </div>

        <div class="input-box-check">
          <label>Descrição:</label>
          <p>{{ $route.params.descricao }}</p>
        </div>

        <div class="input-box-check">
          <label>Segmento:</label>
          <p>{{ $route.params.segmento }}</p>
        </div>

        <div class="input-box-check">
          <label>Prestador:</label>
          <p>{{ $route.params.prestador }}</p>
        </div>

        <div class="input-box-check">
          <label for="id_checklist">Checklist:</label>
          <div class="checklist-body-items" v-for="(item, index, stats) in checklist" :key="index">
          <p>{{ item.checklistPersonalizadoNome }}</p>
          <button class="aprovar"
            @click="() => { exibicaoInput(false); aprovacao(item.checklistPersonalizadoNome, 'Aprovado', item.checklistPersonalizadoId); }">Aprovar</button>
          <button class="reprovar" @click="exibicaoInput(index)">Reprovar</button>
          <input v-if="index === campo" v-model="observacao" placeholder="Informe o motivo da reprovação" />
          <button class="enviar"
            @click="() => { exibicaoInput(index); aprovacao(item.checklistPersonalizadoNome, 'Reprovado', item.checklistPersonalizadoId); }"
            v-if="index === campo">
            <span class="button-text">Enviar</span>
          </button>
        </div>
        </div>


      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

const token = localStorage.getItem('token')

// Campos a serem exibidos
const checklist = ref([])
const od = ref([])
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
    dadosResponsaveis()
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
  status.value = sts;

  try {
    await axios.put(`http://localhost:8080/checklist_personalizado/${id}`, {
      checklistPersonalizadoNome: nome,
      ordemServicoId: idOrdem.value,
      segmentoId: idSegmento.value,
      observacao: observacao.value,
      situacao: status.value
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    dadosResponsaveis()
    // Atualizar manualmente o estado do checklist modificado
    const index = checklist.value.findIndex(item => item.checklistPersonalizadoId == id);
    if (index !== -1) {
      checklist.value[index].situacao = sts;
    }

    alert('Atualizado');

    // Verificar se todos os itens são 'Aprovado'
    let todosAprovados = checklist.value.every(item => item.situacao === 'Aprovado');

    if (todosAprovados) {
      conclusaoOrdem()
    }

  } catch (error) {
    console.error('Ocorreu um erro ao atualizar a ordem:', error);
    alert('Erro ao atualizar a ordem');
  }
}


//CADASTRAR NOVO VOCABULO
async function conclusaoOrdem() {
 dataHoraBrasileira.value = String(formatarDataHora());
 console.log(dataHoraBrasileira.value);
  try {
    await axios.put(`http://localhost:8080/ordemservico/${route.params.idOrdem}`,
      {
        dataFechamento: dataHoraBrasileira.value,
        status: "Concluído",
        descricao: "Inspeção realizada conforme solicitada",
        cliente: idCliente.value,
        prestadores: [
          idPrestador.value
        ]
      });

    alert('Ordem Finalizada.')

  }
  catch (ex) {
    erro.value = (ex as Error).message;

  }
}

//função de captura de dados
async function dadosResponsaveis() {
    try {                                  // COLOCAR URL DO GITPOD SERVIDOR SPRING //
        od.value = (await axios.get(`http://localhost:8080/ordemservico/${route.params.idOrdem}`)).data;
        idPrestador.value = od.value[0].prestador[0].prestadorId
        
    }
    catch (ex) {
        erro.value = (ex as Error).message;
        alert(erro.value)
    }
}

function formatarDataHora() {
    const agora = new Date();

    // Formatar a data no estilo dd/mm/yyyy
    const dataFormatada = agora.toLocaleDateString('pt-BR');

    // Formatar a hora no estilo hh:mm:ss
    const opcoesDeHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const horaFormatada = agora.toLocaleTimeString('pt-BR', opcoesDeHora);

    return `${dataFormatada}  ${horaFormatada}`;
}

// Escute o evento personalizado para visualizar a ordem e preencher os campos
onMounted(() => {

  capturarOrdem()

  idOrdem.value = route.params.idOrdem
  idSegmento.value = route.params.idSegmento
  status.value = route.params.status
  idCliente.value = route.params.idCliente
  console.log(idCliente.value);
  

})

</script>

<style scoped>
  .form-cadastro-check{
    width: 100%;
    height: 100vh;
    
}

.form-title-check{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

.form-body-check{
    margin-top: 20px;
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
}

.input-group-check{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.input-group-check .input-box-check{
    width: 30%;
    margin-top: 40px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.input-group-check .input-box-check label{
    font-size: 18px;
    font-weight: bold;
}

.input-group-check .input-box-check p{
    font-size: 17px;
    margin-top: 5px;
}

.checklist-body-items{
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

.checklist-body-items p{
    font-size: 17px;
    font-weight: bold;
    margin-right: 15px;
}

.checklist-body-items .aprovar, .reprovar, .enviar{
    margin-right: 10px;
    width: 80px;
    height: 30px;
    border-radius: 10px;
    transition: all ease-in 0.3s;
    cursor: pointer;
}

.checklist-body-items .aprovar{
    border: 1px solid rgb(22, 182, 22);
    background-color: transparent;
    font-size: 15px;
    color:   rgb(22, 182, 22);
    font-weight: bold;
}

.checklist-body-items .aprovar:hover{
    background-color: rgb(22, 182, 22);
    border: 1px solid transparent;
    color: rgb(255, 255, 255);
}

.checklist-body-items .reprovar{
    border: 1px solid rgb(182, 22, 22);
    background-color: transparent;
    font-size: 15px;
    color:   rgb(182, 22, 22);
    font-weight: bold;
}

.checklist-body-items .reprovar:hover{
    background-color: rgb(182, 22, 22);
    border: 1px solid transparent;
    color: rgb(255, 255, 255);
}

.checklist-body-items .enviar{
    border: 1px solid rgb(5, 92, 95);
    background-color: transparent;
    font-size: 15px;
    color:   rgb(5, 92, 95);
    font-weight: bold;
}

.checklist-body-items .enviar:hover{
    background-color: rgb(5, 92, 95);
    border: 1px solid transparent;
    color: rgb(255, 255, 255);
}

.checklist-body-items input{
    width: 220px;
    border-radius: 10px;
    padding: 5px;
    border: 1px solid rgb(20, 20, 20);
    background-color: transparent;
    margin-right: 5px;
}
</style>
