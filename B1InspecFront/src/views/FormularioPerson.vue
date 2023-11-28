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
                    <label>Segmento</label><br>
                    <select id="id_categoria" v-model="segmentoSelecionada">
                  <option v-for="ctg in segmento" :key="ctg.id" :value="ctg.id">{{ ctg.nome }}</option>
                </select>
                </div>
            </div>
        </div>
        <div class="form-submit">
          <button @click="voltarParaHome" class="button-return">Voltar</button>
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
import ThePopUp from '../components/ThePopUp.vue'
import { exibirPopup } from '../components/ThePopUp.vue'
import { useRouter } from 'vue-router';


const nomeEmpresa = ref("");
const CNPJEmpresa = ref("");
const descricao = ref("");
const segmento = ref("");
const router = useRouter();


const voltarParaHome = () => {
    router.push('/'); // Substitua '/' pelo caminho da sua rota inicial, se for diferente
};

async function coletarSegmento() {
  try {
    const response = await axios.get('http://localhost:8080/segmento/todos');
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
  await axios.post('http://localhost:8080/solicitacao', {
    nomeEmpresa: nomeEmpresa.value,
    cnpj: CNPJEmpresa.value,
    resultado: "Pendente",
    descricao: descricao.value,
    segmento: segmentoSelecionada.value
   
  });

  
  // Requisição bem-sucedida, exibir um alerta de confirmação
  exibirPopup('Cadastro Realizado com Sucesso', 'Nova Solicitacao registrada!', 123)

  
} catch (error) {
  console.error('Ocorreu um erro ao cadastrar o prestador:', error);
  alert('Erro ao cadastrar o prestador.');
}
}

onMounted(()=>{
  coletarSegmento();
})
</script>

<style scoped>

.form-title {
    background-color: rgb(13, 14, 13);
}

.top-page-links-form{
    background-color: rgb(13, 14, 13);
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
}

.logo-form-link{
    background-color: rgb(13, 14, 13);
    width: 180px;
    margin-left: 30px;
    margin-top: 3px;
}

.logo-form-link img{
    background-color: rgb(13, 14, 13);
    width: 180px;
    margin-left: 30px;
    margin-top: 3px;
}

.page-link-form{
    background-color: rgb(13, 14, 13);
    display: flex;
    align-items: center;
    margin-right: 20px;
    color: #F5F5F5;
}
 
.link-home-form{
    background-color: rgb(13, 14, 13);
    width: 80px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    transition: 0.4s ease-in;
}

.link-alternativo-form p{
    background-color: rgb(13, 14, 13);
    color: #F5F5F5;
    transition: 0.4s all;
}

.link-alternativo-form p:hover{
    color: #00A4C8;
}

.link-home-form p{
    background-color: rgb(13, 14, 13);
    color: #F5F5F5;
    transition: 0.4s ease-in-out;
}

.link-home-form:hover{
    background-color:  rgb(13, 14, 13);
}

.link-home-form:hover p{
    color: #00A4C8;
}


.formulario-ordem {
    background-color: white;
    width: 1000px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
}

.formulario-ordem h3{
    background-color: white;
}

.form-body-nova-ordem {
    background-color: white;
    overflow: hidden;
    width: 100%;
}

.form-row {
    background-color: white;
    width: 100%;

}

.col{
    background-color: white;
    margin: 20px;
}

.col label{
    background-color: white;
}

.col select{
    height: 35px;
    border-radius: 3px;
    outline: 1px solid #7e808767;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    margin-top: 0px;
    appearance: none;
    background-image: url('../../img/select/select.png');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: 20px;
    padding-right: 380px; 
}

.form-submit{
    background-color: white;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: end;
    margin-top: 27px;
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
    background-color: white;
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
    background-color: white;
    margin-right: 80px;
    font-size: 12px;
  }
</style>
