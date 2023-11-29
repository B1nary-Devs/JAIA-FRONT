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
const token = localStorage.getItem('token')

async function coletarCategoria() {
  try {
    const response = await axios.get('http://localhost:8080/segmento',{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
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
  var usuarioId = await cadastrarUsuario();

// Fazendo a requisição POST com os valores capturados
try {
  
  await axios.post('http://localhost:8080/prestador', {

    prestadorNome: nome.value,
    cnpj: cnpj.value,
    usuarioId: usuarioId,
    segmentoId: categoriaSelecionada.value

  }, 
  {
    headers: {
        'Authorization': `Bearer ${token}` 
      }
  }
  );
  
  enviarEmailCredenciais(email.value, senha.value);

  // Requisição bem-sucedida, exibir um alerta de confirmação
  exibirPopup('Cadastro Realizado com Sucesso', 'Novo Prestador Registrado.', 123)
  limparCampos();

  
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar o prestador:', error);
  alert('Erro ao cadastrar o prestador.');
}
}

async function enviarEmailCredenciais(email:String, senha:String){
  try {
    const response = await axios.post('http://localhost:8080/email/credenciais', {
      email: email,
      senha: senha
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

      console.log('Email enviado com sucesso!');

  } catch (error) {
    console.error('Ocorreu um erro ao enviar o email:', error);
  }
}

async function cadastrarUsuario() {

// Fazendo a requisição POST com os valores capturados
try {
  const response = await axios.post('http://localhost:8080/auth/register', {
    email: email.value,
    senha: senha.value
  },
  {
    headers: {
        'Authorization': `Bearer ${token}` 
      }
  });

  if (response.status === 200) {
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

<style scoped>
  *{
    font-family: 'Quicksand', sans-serif;
}

.form-cadastro{
    margin-left: 60px;
    top: 50%;
    width: 11OOpx;
    background-color: #f8f8f9;
}

.form-title{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #ffffff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.form-title h1{
    margin-left: 10px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
}

.form-title span{
    font-size: 20px;
    color: black;
    margin-left: 5px;
    font-weight: bolder;
}

.form-body{
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    margin-top: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.form-body .input-group{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
}

.form-body .input-group .input-box{
    width: 25%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 80px;
    margin-top: 40px;
    margin-left: 18px;
}

.form-body .input-group .input-box label{
    font-size: 20px;
    margin-bottom: 2px;
    color: black;
}

.form-body .input-group .input-box input{
    height: 35px;
    border-radius: 9px;
    border: 0.5px solid transparent;
    outline: 1px solid #5e68b3;
    padding: 5px;
}

.form-body .input-group .input-box input::placeholder{
    color: rgb(74, 74, 74);
    margin-left: 5px;
}

.form-body .input-group .input-box input:focus-visible{
    outline: 1px solid #00A4C8;
    border: none;
}

.form-body .input-group .input-box select{
    height: 35px;
    border-radius: 9px;
    outline: 1px solid #5e68b3;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('../../img/select/select.png');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 20px;
    padding-right: 20px; 
}

.form-body .input-group .input-box select:focus-visible{
    outline: 1px solid #00A4C8;
    border: none;
}

.form-submit{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: end;
    margin-top: 100px;
    margin-right: 12%;
}

.form-submit button{
    margin-right: 20px;
    margin-bottom: 30px;
}

button{
    background-color: #00A4C8;
    color: white;
    width: 100px;
    height: 50px;
    border-radius: 20px;
    border: 1px solid #00A4C8;
    font-weight: bold;
    letter-spacing: 1px;
}

button:hover{
    background-color: rgb(255, 255, 255);
    color: #00A4C8;
    cursor: pointer;
    transition: 0.5s;
}

.button-return{
    background-color: rgb(255, 255, 255);
    color: #00A4C8;
}

.button-return:hover{
    background-color: #00A4C8;
    color: rgb(255, 255, 255);
    cursor: pointer;
    transition: 0.5s;
}


.form-footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.form-footer p {
  margin-right: 80px;
  font-size: 12px;
}

</style>
