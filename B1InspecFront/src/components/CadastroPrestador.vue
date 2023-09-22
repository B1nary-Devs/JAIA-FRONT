<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Prestador de Serviço</h1>

      <span>> Cadastro</span>
    </div>

    <div class="form-body">
      <div class="input-group">
        <div class="input-box">
          <label for="id_nome">Nome</label>

          <input type="text" id="id_nome" placeholder="Ex: Encanador" />
        </div>

        <div class="input-box">
          <label for="id_cnpj">CNPJ</label>

          <input type="number" id="id_cnpj" placeholder="00.000.000/0000-00" />
        </div>

        <div class="input-box">
          <label for="id_categoria">Categoria</label>

          <select id="id_categoria">
            <option></option>
          </select>
        </div>

        <div class="input-box">
          <label for="id_email">Email</label>

          <input type="email" id="id_email" placeholder="Ex: joao@gmail.com" />
        </div>

        <div class="input-box">
          <label for="id_senha">Senha</label>

          <input type="password" id="id_senha" />
        </div>
      </div>

      <div class="form-submit">
        <button>Voltar</button>

        <button id="butCad">Cadastrar</button>
      </div>
    </div>

    <div class="form-footer">
      <p>© B1naryInspec | V.01</p>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";

import '../assets/css/cadprestador/cadprestador.css'

import axios from 'axios';



const categoria = ref([]);

const prestador = ref();


onMounted(()=>{
})
</script>
