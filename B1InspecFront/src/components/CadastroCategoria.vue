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
                    <input type="text" class="input-itens" id="id_checklist" placeholder="Ex.: Pontos de energia" />
                    <button id="btn-inserir" class="botao-azul">Inserir</button>
                </div>              
            </div>
        </div>

    <div class="section-itens"> 
        <div class="section-title-itens"> 
            <h1>Itens cadastrados</h1>
        </div>

    </div>

          <div class="form-submit-categoria">
            <button class="botao-branco">Voltar</button>
  
            <button class="botao-azul">Cadastrar</button>
          </div>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import '../assets/css/cadastroCategoria/cadastroCategoria.css'
  
  </script>
  