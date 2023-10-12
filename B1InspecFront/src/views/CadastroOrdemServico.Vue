<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Ordem de Serviço</h1>
      <span>> Cadastro</span>
    </div>
    <div class="form-body">

      <div class="check-itens">
        
        <input type="radio" value="existente" v-model="picked" />
        <label for="">Selecionar cliente existente</label>
        
        <input type="radio" value="novo" v-model="picked" />
        <label for="">Cadastrar novo cliente</label>
        
      </div>

      <div class="input-group">
        <div class="input-box"  v-if="picked === 'novo'">
          <label for="id_nome">Nome da Empresa</label>
          <input type="text" id="id_nome" v-model="nome" />
        </div>

        <div class="input-box" v-else>
          <label for="id_selnome">Nome da Empresa</label>
          <select id="id_selnome" v-model="selnome">
            <option></option>
          </select>
        </div>

        <div class="input-box">
          <label for="id_cnpj">CNPJ</label>
          <input type="number" id="id_cnpj" v-model="cnpj" />
        </div>

        <div class="input-box">
          <label for="id_descricao">Descrição</label>
          <input type="text" id="id_descricao" v-model="descricao" />
        </div>

        <div class="input-box">
        <label for="id_segmento">Segmento</label>
          <select id="id_segmento" v-model="segmentoSelecionado">
            <option v-for="ctg in segmento" :key="ctg.id" :value="ctg.id">{{ ctg.nome }}</option>
          </select>
        </div>

        <div class="input-box">
          <label for="id_prestador">Prestador de Serviço</label>
          <select id="id_prestador" v-model="prestadorSelecionado">
            <option v-for="ptr in prestador" :key="ptr.id" :value="ptr.id">{{ ptr.nome }}</option>
          </select>
        </div>

        <div class="input-box">
          <label for="id_checklist">Checklist</label>
          <div class="checklist-action">
            <input type="text" id="id_checklist" v-model="checklist" @keydown.enter="inserirItem" />
            <button @click="inserirItem" class="adicionar">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512" fill="#3498db">
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="section-itens">
        <div class="section-title-itens">
          <h1>Itens cadastrados</h1>
        </div>
        <div class="itens" v-for="(itemCadastrado, index) in itens" :key="index">
          <div class="column">{{ index + 1 }}: {{ itemCadastrado }}</div>
          <input v-if="estadoEdicao === index" v-model="itens[index]" @blur="salvarEdicao(index)" @keydown.enter="salvarEdicao(index)" />
          <svg xmlns="http://www.w3.org/2000/svg" id="btn-salvarEdicao" width="20" height="20" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16" @click="salvarEdicao(index)" v-if="estadoEdicao === index" style="margin-right: 10px" >
            <path fill="black" d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
            <path fill="black" d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="btn-editar" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" @click="editarItem(index)" style="margin-right: 10px">
            <path fill="black" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill="black" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="btn-remover" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" @click="removerItem(index)">
            <path fill="black" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </div>
      </div>

      <div class="form-submit">
        <button @click="" class="button-return">Voltar</button>
        <button @click="cadastrarOrdemServico">Cadastrar</button>
      </div>
    </div>

    <div class="form-footer">
      <p>© B1naryInspec | V.01</p>
    </div>
  </div>
  <ThePopUp></ThePopUp>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import '../assets/css/cadOrdemServico/cadOrdemServico.css'
import ThePopUp from '../components/ThePopUp.vue'
import { exibirPopup } from '../components/ThePopUp.vue'
import axios from 'axios'

const nome = ref("");
const selnome = ref("");
const cnpj = ref("");
const descricao = ref("");
const prestador = ref("");
const segmento = ref("");
const checklist = ref("");
const itens = ref<string[]>([])
const estadoEdicao = ref(-1)

const picked = ref('novo')
const segmentoSelecionado = ref(null);
const prestadorSelecionado = ref(null);

async function inserirItem() {
  if (checklist.value.trim() != '') {
    itens.value.push(checklist.value)
    checklist.value = ''
  }
}

async function removerItem(index: number) {
  itens.value.splice(index, 1)
}

function editarItem(index: number) {
  estadoEdicao.value = index
}

function salvarEdicao(index: number) {
  estadoEdicao.value = -1
}

async function coletarSegmento() {
  try {
    const response = await axios.get('http://localhost:8080/segmento');
    segmento.value = response.data; // Atribuir diretamente à ref
    console.log(segmento.value);
  } catch (error) {
    console.error('Ocorreu um erro ao coletar o segmento:', error);
  }
}

async function coletarPrestador() {
  try {
    const response = await axios.get('http://localhost:8080/prestador');
    prestador.value = response.data; // Atribuir diretamente à ref
    console.log(prestador.value);
  } catch (error) {
    console.error('Ocorreu um erro ao coletar o prestador:', error);
  }
}

async function cadastrarOrdemServico() {

if (nome.value === null) {
  alert('Insira on nome da empresa');
  return;
}


try {
  await axios.post('http://localhost:8080/ordemservico', {
    clienteNome: nome.value,
    cnpj: cnpj.value,
    descricao: descricao.value,
    segmentoId: segmentoSelecionado.value,
    prestadorId: prestadorSelecionado.value,

  });

  
  exibirPopup('Cadastro Realizado com Sucesso', 'Nova Ordem de Serviço Cadastrada.', 123)
  
  
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar a ordem de serviço:', error);
  alert('Erro ao cadastrar a ordem de serviço.');
}
}

onMounted(()=>{
  coletarSegmento();
  coletarPrestador();
})

</script>
