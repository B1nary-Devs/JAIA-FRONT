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
                  <button @click="returnarPag" class="button-return">Voltar</button>
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
  const config = {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjk5MTEwMjM2LCJyb2xlcyI6IkFETUlOIn0.XIq1PFmzGlsFBsPNn3tmUy065AgdmMQU_4cqauIhenP_INjAIMXWlN4T08vJ4g9vpokbAbp2geH4dFIGDI4TvPyJKlYFnQTGMNqdQA7qPRY2Emk-j3nNNHU8LM8cMzMjFNF1oqM0lDw_X1TPlLhGuEB0NBrbkGNTUV2RUKZsy0ccj7PfAOEY9ZckA_cffGCfcRmmeWaSy-XpOCddBTzc4-pMwR9RnV1tBNcvWee4CIN3-Qsk2QigWimGIgy6ogq7tD4Bm3AOr1Y_KLn6rf10zVTwbmZmM40l3uU7Dc4zWkmSXxo0K2sPQofCc-cdsbCwapcSv8Ltl6eoZBDWR9rgpw`,
    }
  };
  try {
    const response = await axios.get('http://localhost:8080/segmento', config);
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

const config = {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjk5MTEwMjM2LCJyb2xlcyI6IkFETUlOIn0.XIq1PFmzGlsFBsPNn3tmUy065AgdmMQU_4cqauIhenP_INjAIMXWlN4T08vJ4g9vpokbAbp2geH4dFIGDI4TvPyJKlYFnQTGMNqdQA7qPRY2Emk-j3nNNHU8LM8cMzMjFNF1oqM0lDw_X1TPlLhGuEB0NBrbkGNTUV2RUKZsy0ccj7PfAOEY9ZckA_cffGCfcRmmeWaSy-XpOCddBTzc4-pMwR9RnV1tBNcvWee4CIN3-Qsk2QigWimGIgy6ogq7tD4Bm3AOr1Y_KLn6rf10zVTwbmZmM40l3uU7Dc4zWkmSXxo0K2sPQofCc-cdsbCwapcSv8Ltl6eoZBDWR9rgpw`,
    }
  };

  const usuarioId = await cadastrarUsuario();
  

// Fazendo a requisição POST com os valores capturados
try {
  await axios.post('http://localhost:8080/prestador', {
    prestadorNome: nome.value,
    cnpj: cnpj.value,
    usuarioId: usuarioId,
    segmentoId: categoriaSelecionada.value

  }, config);

  // Requisição bem-sucedida, exibir um alerta de confirmação
  exibirPopup('Cadastro Realizado com Sucesso', 'Novo Prestador Registrado.', 123)
  limparCampos();
  
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar o prestador:', error);
  alert('Erro ao cadastrar o prestador.');
}
}


async function cadastrarUsuario() {

// Fazendo a requisição POST com os valores capturados
try {
  const response = await axios.post('http://localhost:8080/auth/register', {
    email: email.value,
    senha: senha.value
  });

  if (response.status === 200) {
      alert("cadastrei user")
      const usuarioId = response.data.usuarioId;
      return usuarioId; // Retorne o ID do cliente
    } else {
      console.error(`Falha na solicitação POST: Código de status ${response.status}`);
      throw new Error('Falha ao cadastrar o usuario');
    }
  
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar usuario:', error);
  alert('Erro ao cadastrar o prestador.');
}
}



function limparCampos(){
  nome.value = "";
  cnpj.value = "";
  email.value = "";
  senha.value = "";
  categoriaSelecionada.value = null;
}

function returnarPag(){
  window.history.back();
}

onMounted(()=>{
  coletarCategoria();
})

</script>
