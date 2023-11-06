<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Segmento</h1>
      <span>> Cadastro</span>
    </div>

    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label for="id_nome">Nome do segmento</label>
          <input
            type="text"
            class="input-nome-categoria"
            id="id_nome"
            v-model="nomeCategoria"
            placeholder="Ex.: Elétrica"
          />
        </div>
        <div class="input-box">
          <label for="id_checklist">Item do checklist</label>
          <input
            type="text"
            v-model="item"
            class="input-itens"
            id="id_checklist"
            placeholder="Ex.: Pontos de energia"
            @keydown.enter="inserirItem"
          />
        </div>
        <div class="botao=inserir">
          <button id="butCad" class="botao-inserir" @click="inserirItem">Inserir</button>
        </div>
      </div>

      <div class="section-itens">
        <div class="section-title-itens">
          <h1>Itens cadastrados</h1>
        </div>
          <div class="itens" v-for="(itemCadastrado, index) in itens" :key="index">
            <div class="column">{{ index + 1 }}: {{ itemCadastrado }}</div>
            <input v-if="estadoEdicao === index" v-model="itens[index]" @blur="salvarEdicao(index)" @keydown.enter="salvarEdicao(index)" />
              <svg xmlns="http://www.w3.org/2000/svg" id="btn-salvarEdicao" width="20" height="20" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16" @click="salvarEdicao(index)" v-if="estadoEdicao === index" style="margin-right: 10px;">
                <path fill="black" d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                <path fill="black" d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="btn-editar" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" @click="editarItem(index)" style="margin-right: 10px;">
                <path fill="black" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill="black" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg"  id="btn-remover" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" @click="removerItem(index)">
                <path fill="black" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
              </svg>
        </div>
      </div>
      <div class="form-submit">
        <div class="botoes">
          <button @click="returnarPag" class="button-return">Voltar</button>
          <button
            id="butCad"
            class="botao-cadastrar"
            @click="cadastrarDepartamento(cadastrarChecklist)"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>

    <div class="form-footer">
      <p>© B1naryInspec | V.01</p>
    </div>
  </div>
  <ThePopUp></ThePopUp>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import '../assets/css/cadastroCategoria/cadastroCategoria.css'
import '../assets/css/cadprestador/cadprestador.css'
import ThePopUp from '../components/ThePopUp.vue';
import {exibirPopup} from '../components/ThePopUp.vue'

const token = localStorage.getItem('token')
let nomeCategoria = ref('')
let item = ref('')
let itens = ref<string[]>([])
let estadoEdicao = ref(-1)

async function inserirItem() {
  if (item.value.trim() != '') {
    itens.value.push(item.value)
    item.value = ''
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

async function cadastrarDepartamento(callback) {
  try {
    const response = await axios.post('http://localhost:8080/segmento', {
      nome: nomeCategoria.value
    },{
      headers: {
          'Authorization': `Bearer ${token}` 
        }
    })

    if (response.data.id) {
      const categoriaId = response.data.id
      if (callback) {
        callback(categoriaId)
      }
    } else {
      throw new Error('ID do segmento não encontrado na resposta.')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

function returnarPag(){
  window.history.back();
}



async function cadastrarChecklist(idCategoria) {
  try {
    const nomesItens = itens.value.map((item) => ({
      segmentos: [
        {
          id: idCategoria
        }
      ],
      checklistNome: item
    }))

    for (const nomeItem of nomesItens) {
      await axios.post('http://localhost:8080/checklist', nomeItem,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })

      console.log(`Requisição POST para ${nomeItem.checklistNome} concluída.`)
      exibirPopup('Cadastro Realizado com Sucesso', 'Novo Segmento Registrado.', 123)
    }

    console.log('Todos os checklists foram cadastrados com sucesso.')
  } catch (error) {
    console.error(error)
    console.log('Erro ao cadastrar checklists.')
  }
}
</script>
