<template>
    <div class="cadastro-categoria">
      <div class="title-categoria">
        <h1> <span style ="font-weight: normal">Categoria > </span>Cadastro</h1>
      </div>

      <div class="body-categoria">
        <div class="input-group">
            <div class="input-box">
                <label for="id_nome">Nome da categoria</label>
                <input type="text" class="input-nome-categoria" id="id_nome" placeholder="Ex.: Elétrica" />
            </div>
            
            <div class="input-box">
                <label for="id_checklist">Item do checklist</label>
                <div class="checklist">
                    <input type="text" v-model="item" class="input-itens" id="id_checklist" placeholder="Ex.: Pontos de energia" />
                    <button id="btn-inserir" class="botao-azul" @click="inserirItem">Inserir</button>
                </div>              
            </div>
        </div>

    <div class="section-itens"> 
        <div class="section-title-itens"> 
            <h1>Itens cadastrados</h1>
        </div>
        <div class="itens">
          <p v-for="(itemCadastrado, index) in itens" :key="index">{{ index + 1 }}: {{ itemCadastrado }}</p>
        </div>
    </div>
          <div class="form-submit-categoria">
            <div class="botoes">
              <button class="botao-branco">Voltar</button>
              <button class="botao-azul">Cadastrar</button>  
            </div>
          </div>
          <div class="blank"></div>
          <footer class="footer">
            <p>B1naryInspec | V.01</p>
          </footer>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import '../assets/css/cadastroCategoria/cadastroCategoria.css'
  import { onMounted, ref } from 'vue';
  import axios from 'axios';

  let item = ref("");
  let itens = ref<string[]>([]);;

  async function inserirItem(){
    if(item.value.trim() != ""){
      itens.value.push(item.value);
      item.value = "";
    }
  }
  
  </script>
  