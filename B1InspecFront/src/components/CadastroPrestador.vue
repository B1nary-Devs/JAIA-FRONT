<template>
  <div class="form-cadastro">
      <div class="form-title">
          <h1>Prestador de Serviço</h1>
          <span> Cadastro</span>
      </div>
      <div class="form-body">
          <div class="input-group">
              <div class="input-box">
                  <label for="id_nome">Nome</label>
                  <input type="text" id="id_nome" v-model="nome" placeholder="Ex: Encanador">
              </div>

              <div class="input-box">
                  <label for="id_cnpj">CNPJ</label>
                  <input type="number" id="id_cnpj" v-model="cnpj" placeholder="00.000.000/0000-00">
              </div>

              <div class="input-box">
                <label for="id_categoria">Segmento</label>
                <select id="id_categoria" v-model="categoriaSelecionada">
                  <option v-for="ctg in categoria" :key="ctg.id" :value="ctg.id">{{ ctg.nome }}</option>
                </select>
              </div>

              <div class="input-box">
                  <label for="id_email">Email</label>
                  <input type="email" id="id_email" v-model="email" placeholder="Ex: joao@gmail.com">
              </div>

              <div class="input-box">
                  <label for="id_senha">Senha</label>
                  <input v-model="senha" type="password" id="id_senha">
              </div>
          </div>

          <div class="form-submit">
                  <button @click="cadastrarPrestador">Cadastrar</button>
          </div>

      </div>

      <div class="form-footer">
          <p>© B1naryInspec | V.01</p>
      </div>
  </div>
  <ThePopUp></ThePopUp>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '../assets/css/cadprestador/cadprestador.css';
import ThePopUp from '../components/ThePopUp.vue';
import {exibirPopup} from '../components/ThePopUp.vue'
import axios from 'axios';

 // Capturando os valores dos campos
const categoria = ref([]);
const erro = ref();
const nome = ref("");
const cnpj = ref("");
const email = ref("");
const senha = ref("");

async function coletarCategoria() {
  try {
    const response = await axios.get('http://localhost:8080/categoria');
    categoria.value = response.data; // Atribuir diretamente à ref
    console.log(categoria.value);
  } catch (error) {
    console.error('Ocorreu um erro ao coletar a categoria:', error);
  }
}

const categoriaSelecionada = ref(null); // Inicialize com um valor padrão ou null

async function cadastrarPrestador() {
// Verifique se uma categoria foi selecionada
if (categoriaSelecionada.value === null) {
  alert('Selecione uma categoria antes de cadastrar.');
  return;
}

// Fazendo a requisição POST com os valores capturados
try {
  await axios.post('http://localhost:8080/prestador', {
    prestadorNome: nome.value,
    cnpj: cnpj.value,
    email: email.value,
    senha: senha.value,
    categoria_id: {
      id: categoriaSelecionada.value // Use a categoria selecionada aqui
    }
  });

  // Requisição bem-sucedida, exibir um alerta de confirmação
  exibirPopup('Cadastro Realizado com Sucesso', 'Novo Prestador Registrado.', 123)
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar o prestador:', error);
  alert('Erro ao cadastrar o prestador.');
}
}

onMounted(()=>{
  coletarCategoria();
})

</script>
