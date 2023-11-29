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

        <div class="input-box">
          <label for="id_checklist">Checklist:</label>
        </div>

        <div class="checklist-body-items" v-for="(item, index) in checklist" :key="index">
          <ul>
            <li>
              <p>{{ item.checklistPersonalizadoNome }}</p>
            </li>
          </ul>
          <p>{{ item.situacao }}</p>
          <input v-if="item.situacao !== 'Aprovado'" v-model="item.observacao" placeholder="Informe o motivo da reprovação" />

        </div>

      </div>

      <div class="btn-salvar">
      <button class="salvar" @click="salvarAlteracoes">Salvar Alterações</button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const dataAbertura = ref('')
const dataFechamento = ref('')
const empresa = ref('')
const status = ref('')
const descricao = ref('')
const prestador = ref('')
const prestadorId = ref('')
const segmento = ref('')
const checklist = ref([])
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
    empresa.value = ordemData.cliente.clienteId; 
    status.value = ordemData.status;
    descricao.value = ordemData.descricao;
    segmento.value = ordemData.prestador[0].segmento.nome;  
    prestador.value = ordemData.prestador[0].prestadorNome;  
    prestadorId.value = ordemData.prestador[0].prestadorId;
    checklist.value = ordemData.checklistPersonalizados.map(item => {
      return {
        ...item,
        
      };
    });
    idOrdem.value = ordemData.servicoId;

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

<style scoped>
  * {
    font-family: 'Quicksand', sans-serif;
}

.form-cadastro {
    margin-left: 60px;
    top: 50%;
    width: 1100px;
    background-color: #f8f8f9;
}

.form-title {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #ffffff;
    box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.titulo-ordem {
    margin-left: 10px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
}

.form-body {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    margin-top: 30px;
    box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.form-body .input-group {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px; 
    justify-content: space-between;
}

.form-body .input-group .input-box {
    display: flex;
    flex-direction: column; 
    align-items: flex-start; 
    width: calc(50% - 10px);
    margin-bottom: 20px;
}

.form-body .input-group .input-box label {
    font-size: 18px;
    font-weight: bold;
    color: black;
    margin-bottom: 5px; 
}

.form-body .input-group .input-box input {
    height: 35px;
    width: 50%; 
    border-radius: 9px;
    border: 0.5px solid transparent;
    outline: 1px solid #5e68b3;
    padding: 5px;
}

.form-body .input-group .input-box input::placeholder {
    color: rgb(74, 74, 74);
    margin-left: 5px;
}

.form-body .input-group .input-box input:focus-visible {
    outline: 1px solid #00a4c8;
    border: none;
}

.form-body .input-group .input-box p {
    font-size: 18px;
    color: black;
    margin-left: 10px;
}

.checklist-body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px;
    margin-bottom: 20px;
}

.checklist-body-items p {
    width: 140px; 
}

.checklist-body-items{
    width: 100%;
    display: flex;
    align-items: center;
    margin: 30px;
}

.btn-salvar{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: end;
    margin-bottom: 5%;
    margin-right: 10%;
}

.salvar{
    background-color: #ffffff;
    color: #00a4c8;
    width: 160px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #00a4c8;
    font-weight: bold;
    letter-spacing: 1px;
    cursor: pointer;
}

.salvar:hover{
    background-color: #00a4c8;
    color: #ffffff;
    transition: 0.5s; 
}


</style>