<template>
    <div class="cadastro-categoria">
      <div class="title-categoria">
        <h1> <span style ="font-weight: normal">Categoria > </span>Cadastro</h1>
      </div>

      <div class="body-categoria">
        <div class="input-group">
            <div class="input-box">
                <label for="id_nome">Nome da categoria</label>
                <input type="text" class="input-nome-categoria" id="id_nome" v-model="nomeCategoria" placeholder="Ex.: Elétrica" />
            </div>
            <div class="input-box">
                <label for="id_checklist">Item do checklist</label>
                <div class="checklist">
                    <input type="text" v-model="item" class="input-itens" id="id_checklist" placeholder="Ex.: Pontos de energia" @keydown.enter="inserirItem" />
                    <button id="btn-inserir" class="botao-inserir" @click="inserirItem">Inserir</button>
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
            <div v-if="estadoEdicao === index" class ="column"><button id="btn-salvarEdicao" class="botao-salvarEdicao" @click="salvarEdicao(index)">Salvar</button></div>
            <div class="column"><button id="btn-editar" class="botao-editar" @click="editarItem(index)">Editar</button></div>
            <div class="column"><button id="btn-remover" class="botao-remover" @click="removerItem(index)">Remover</button></div>
          </div>
        </div>
    </div>
          <div class="form-submit-categoria">
            <div class="botoes">
              <button class="botao-voltar">Voltar</button>
              <button class="botao-cadastrar" @click="cadastrarDepartamento()">Cadastrar</button>  
            </div>
          </div>
          <div class="blank"></div>
          <footer class="footer">
            <p>B1naryInspec | V.01</p>
          </footer>
        </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
import '../assets/css/cadastroCategoria/cadastroCategoria.css';
import axios from 'axios';

  let nomeCategoria = ref("");
  let item = ref("");
  let itens = ref<string[]>([]);
  let estadoEdicao = ref(-1);

  async function inserirItem(){
    if(item.value.trim() != ""){
      itens.value.push(item.value);
      item.value = "";
    }
  }

  async function removerItem(index : number) {
    itens.value.splice(index, 1);
  }

  function editarItem(index : number) {
    estadoEdicao.value = index;
  } 

  function salvarEdicao(index : number){
    estadoEdicao.value = -1;
  }

  async function cadastrarDepartamento() {
    await axios.post('http://localhost:8080/categoria',{
      nome : nomeCategoria
    })

    .then(response => {
      console.log("deu")
    })

    .catch(error => {
      console.log("não deu ${error}")
    })
  }

  /*if(itens.value.length > 0 && nomeDepartamento.value.trim() !== "");*/



  
  </script>
  