<template>
    <div class="form-cadastro-categoria">
      <div class="form-title-categoria">
        <h1>Categoria > Cadastro</h1>
      </div>
      <div class="form-body-categoria">

        <div class="input-box">
    <div class="input-group">
        <label for="id_nome">Nome da categoria</label>
        <input type="text" id="id_nome" placeholder="Ex.: Elétrica" />
    </div>
    <div class="input-group">
        <label for="id_checklist">Itens do checklist</label>
        <input type="text" id="id_checklist" placeholder="Ex.: Pontos de energia" />
    </div>
    <button>Inserir</button>
</div>

    <div class="section-itens"> 
        <div class="section-title-itens"> 
            <h1>Itens cadastrados</h1>
        </div>

    </div>

          <div class="form-submit-categoria">
            <button>Voltar</button>
  
            <button>Cadastrar</button>
          </div>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  </script>
  