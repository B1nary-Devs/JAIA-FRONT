<template>
    <div class="formulario-cadastro">
        <div class="form-title">
            <div class="top-page-links-form">
            <div class="logo-form-link">
          <img src="../assets/img/home/logo.png" alt="">
            </div>
            <div class="page-link-form">
          <RouterLink to="../">
            <div class="link-alternativo-form">
              <p>Home</p>
            </div>
          </RouterLink>
          <RouterLink to="../login">
            <div class="link-home-form">
              <p>Login</p>
            </div>
          </RouterLink>
        </div>
    </div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        </div>
        <div class="formulario-ordem">
            <h3>Nova Ordem de serviço</h3>
        <div class = "form-body-nova-ordem">
            
            <div class="form-row">
                <div class="col">
                    <label>Nome da Empresa</label>
                    <input type="text" class="form-control" placeholder="B1naryInspec" v-model="nomeEmpresa">
                </div>
                <div class="col">
                    <label>CNPJ</label>
                    <input type="text" class="form-control" placeholder="89.423.819/0001-75" v-model="CNPJEmpresa">
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label>Descrição</label>
                    <input type="text" class="form-control" placeholder="Predial" v-model="descricao">
                </div>
                <div class="col">
                    <label for="id_categoria">Segmento</label>
                    <select id="id_categoria" v-model="segmentoSelecionada">
                  <option v-for="ctg in segmento" :key="ctg.id" :value="ctg.id">{{ ctg.nome }}</option>
                </select>
                </div>
            </div>
        </div>
        <div class="form-submit">
            <button @click="" class="button-return">Voltar</button>
            <button @click="cadastrarOrdem">Cadastrar</button>
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
import axios from 'axios';
import '../assets/css/cadastroNovaOrdem/cadNovaOrdem.css'
import ThePopUp from '../components/ThePopUp.vue'

const nomeEmpresa = ref("");
const CNPJEmpresa = ref("");
const descricao = ref("");
const segmento = ref("");



async function coletarSegmento() {
  try {
    const response = await axios.get('http://localhost:8080/segmento');
    segmento.value = response.data; // Atribuir diretamente à ref
    console.log(segmento.value);
  } catch (error) {
    console.error('Ocorreu um erro ao coletar a segmento:', error);
  }
}

const segmentoSelecionada = ref(null); // Inicialize com um valor padrão ou null

async function cadastrarOrdem() {
// Verifique se uma categoria foi selecionada
if (segmentoSelecionada.value === null) {
  alert('Selecione um segmento antes de cadastrar.');
  return;
}

// Fazendo a requisição POST com os valores capturados
try {
  await axios.post('http://localhost:8080/ordemservico', {
    prestadorNome: nome.value,
    cnpj: cnpj.value,
    email: email.value,
    senha: senha.value,
    segmentoId: categoriaSelecionada.value
   
  });

  // Requisição bem-sucedida, exibir um alerta de confirmação
  exibirPopup('Cadastro Realizado com Sucesso', 'Novo Prestador Registrado.', 123)
  limparCampos();
  
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar o prestador:', error);
  alert('Erro ao cadastrar o prestador.');
}
}

onMounted(()=>{
  coletarSegmento();
})
</script>
  