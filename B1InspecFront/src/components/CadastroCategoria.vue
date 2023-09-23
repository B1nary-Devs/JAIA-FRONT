<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Departamento</h1>
      <span>> Cadastro</span>
    </div>

    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label for="id_nome">Nome do departamento</label>
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
          <input
            v-if="estadoEdicao === index"
            v-model="itens[index]"
            @blur="salvarEdicao(index)"
            @keydown.enter="salvarEdicao(index)"
          />
          <div v-if="estadoEdicao === index" class="column">
            <button id="btn-salvarEdicao" class="botao-salvarEdicao" @click="salvarEdicao(index)">
              Salvar
            </button>
          </div>
          <div class="column">
            <button id="btn-editar" class="botao-editar" @click="editarItem(index)">Editar</button>
          </div>
          <div class="column">
            <button id="btn-remover" class="botao-remover" @click="removerItem(index)">
              Remover
            </button>
          </div>
        </div>
      </div>
      <div class="form-submit">
        <div class="botoes">
          <button class="botao-voltar">Voltar</button>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import '../assets/css/cadastroCategoria/cadastroCategoria.css'
import '../assets/css/cadprestador/cadprestador.css'

let nomeCategoria = ref('')
let item = ref('')
let itens = ref<string[]>([])
let estadoEdicao = ref(-1)
let dadosDeResposta: null = null

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
    const response = await axios.post('http://localhost:8080/categoria', {
      nome: nomeCategoria.value
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

async function cadastrarChecklist(idCategoria) {
  try {
    const nomesItens = itens.value.map((item) => ({
      categorias: [
        {
          id: idCategoria
        }
      ],
      checklistNome: item
    }))

    for (const nomeItem of nomesItens) {
      await axios.post('http://localhost:8080/checklist', nomeItem)

      console.log(`Requisição POST para ${nomeItem.checklistNome} concluída.`)
    }

    console.log('Todos os checklists foram cadastrados com sucesso.')
  } catch (error) {
    console.error(error)
    console.log('Erro ao cadastrar checklists.')
  }
}
</script>
