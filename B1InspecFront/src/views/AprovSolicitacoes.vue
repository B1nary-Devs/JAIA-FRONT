<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Aprovação de Solicitações</h1>
    </div>
    <div class="form-body">

      <div class="input-group">
        <div class="input-box">
          <label>Nome da Empresa</label>
          <label> {{ route.params.nomeEmpresa }} </label>
        </div>

        <div class="input-box">
          <label>CNPJ</label>
          <label> {{ route.params.cnpj }} </label>
        </div>

        <div class="input-box">
          <label>Descrição</label>
          <label>{{ route.params.descricao }}</label>
        </div>

        <div class="input-box">
          <label for="id_segmento">Segmento</label>
          <select id="id_segmento" v-model="segmentoSelecionado" @change="carregarPrestadoresAndChecklists">
            <option v-for="ctg in segmento" :key="ctg.id" :value="ctg.id">{{ ctg.nome }}</option>
          </select>
        </div>

        <div class="input-box">
          <label for="id_prestador">Prestador de Serviço</label>
          <select id="id_prestador" v-model="prestador" @change="ptrs()">
            <option v-for="ptr in prestadoresSelecionados" :key="ptr.prestadorId" :value="ptr.prestadorId">{{
              ptr.prestadorNome }}</option>
          </select>
        </div>


        <div class="input-box">
          <label for="id_checklist">Checklist</label>
          <div class="checklist-action">
            <input type="text" id="id_checklist" v-model="checklist" @keydown.enter="inserirItem" />
            <button @click="inserirItem" class="adicionar">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512" fill="#3498db">
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="section-itens">
        <div class="section-title-itens">
          <h1>Itens cadastrados</h1>
        </div>
        <div class="itens" v-for="(checklistItem, index) in checklistsAtribuidos" :key="index">
          <div class="column">
            <!--{{ index + 1 }}: -->
            <span v-if="index !== estadoEdicao">{{ checklistItem.checklistNome }}</span>
            <input v-else v-model="checklistsAtribuidos[index].checklistNome" />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square"
            viewBox="0 0 16 16" @click="editarItem(index)" v-if="index !== estadoEdicao" style="margin-right: 10px;">
            <path fill="black"
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill="black"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-square"
            viewBox="0 0 16 16" @click="salvarEdicao(index)" v-if="index === estadoEdicao" style="margin-right: 10px;">
            <path fill="black"
              d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
            <path fill="black"
              d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="btn-remover" width="20" height="20" fill="currentColor"
            class="bi bi-trash3" viewBox="0 0 16 16" @click="removerItem(index)">
            <path fill="black"
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </div>
        <div class="itens" v-for="(checklistPerson, index) in checklistsPersonalizado" :key="index">
          <div class="column">
            <!-- {{ index + 1 }}: -->
            <span v-if="index !== estadoEdicao">{{ checklistPerson }}</span>
            <input v-else v-model="checklistsPersonalizado[index]" />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square"
            viewBox="0 0 16 16" @click="editarItem(index)" v-if="index !== estadoEdicao" style="margin-right: 10px;">
            <path fill="black"
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill="black"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-square"
            viewBox="0 0 16 16" @click="salvarEdicao(index)" v-if="index === estadoEdicao" style="margin-right: 10px;">
            <path fill="black"
              d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
            <path fill="black"
              d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="btn-remover" width="20" height="20" fill="currentColor"
            class="bi bi-trash3" viewBox="0 0 16 16" @click="removerItem(index)">
            <path fill="black"
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </div>
      </div>


      <div class="form-submit">
        <button @click="returnarPag" class="button-return">Voltar</button>
        <button @click="cadastrarOrdemServico">Cadastrar</button>
        <button @click="reprovaSolicitacao()">Reprovar</button>
      </div>
    </div>

  </div>
  <ThePopUp></ThePopUp>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ThePopUp from '../components/ThePopUp.vue'
import { exibirPopup } from '../components/ThePopUp.vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

const route = useRoute();
const nome = ref();
const selnome = ref("");
const cnpj = ref();
const descricao = ref();
const client = ref()
const segmento = ref("");
const checklist = ref("");
const picked = ref('novo');
const segmentoSelecionado = ref();
const clienteSelecionado = ref(null);
const nomeSelecionado = ref([]);
const prestador = ref(null);
const prestadoresSelecionados = ref([]);
const prestSelec = ref(null);
const empresaSelect = ref(null);
const itens = ref<string[]>([])
const estadoEdicao = ref(-1)
const checklistsAtribuidos = ref([]);
const item = ref("");
const itemEditando = ref(null);
const radioB = ref();
const checklistsPersonalizado = ref([]);
const clienteCNPJ = ref("")
const clientId = ref()
const Isclient = ref()
const empresaId = ref()
const IdSolicitacao = ref()

const token = localStorage.getItem('token')

function ptrs() {
  console.log(empresaSelect.value);
}


function inserirItem() {
  if (checklist.value.trim() !== "") {
    const novoItem = {
      checklistNome: checklist.value,
    };
    checklistsAtribuidos.value.push(novoItem);
    checklist.value = "";
  }
}

function editarItem(index) {
  estadoEdicao.value = index;
}

function salvarEdicao(index) {
  if (estadoEdicao.value === index) {
    estadoEdicao.value = -1;
  }
}

function removerItem(index) {
  checklistsAtribuidos.value.splice(index, 1);
}

function returnarPag(){
  window.history.back();
}

function radio(valor: boolean) {
  radioB.value = valor;
  console.log(clienteSelecionado.value);
  const valor2 = clienteSelecionado.value;
  console.log(`eu sou o valor ${valor2}`);
}

async function coletarSegmento() {
  try {
    const response = await axios.get('http://localhost:8080/segmento', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    segmento.value = response.data;
    console.log(segmento.value);
  } catch (error) {
    console.error('Ocorreu um erro ao coletar o segmento:', error);
  }
}

async function coletarCliente() {
  try {
    const response = await axios.get(`http://localhost:8080/cliente`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Suponha que o CNPJ que você quer verificar é '654654654'
    const cnpjProcurado = cnpj.value;

    // Verifica se o CNPJ existe no array
    const cnpjExiste = response.data.some(cliente => cliente.clienteCnpj === cnpjProcurado);

    if (cnpjExiste) {
      console.log('CNPJ encontrado!');
      // Aqui você pode adicionar mais lógica, caso o CNPJ seja encontrado
    } else {
      console.log('CNPJ não encontrado.');
      Isclient.value = true;

    }

  } catch (error) {
    alert('Erro ao coletar cliente')
    // Tratar o erro
  }
}


async function buscarChecklistsPorSegmento(segmentoId: bigint) {
  try {
    if (segmentoId) {
      const response = await axios.get(`http://localhost:8080/segmento/${segmentoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        checklistsAtribuidos.value = response.data.checklistList;
      } else {
        console.error(`Falha na requisição GET: Código de status ${response.status}`);
      }
    } else {
      checklistsAtribuidos.value = [];
    }
  } catch (error) {
    console.error('Ocorreu um erro na requisição GET:', error);
  }
}

async function carregarPrestadoresAndChecklists() {
  await carregarPrestadores();
  await buscarChecklistsPorSegmento(segmentoSelecionado.value);
}

async function carregarPrestadores() {
  const segmentoId = segmentoSelecionado.value;

  try {
    if (segmentoId) {
      const response = await axios.get(`http://localhost:8080/prestador?segmentoId=${segmentoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const prestadores = response.data.filter(prestador => prestador.segmento.id === segmentoId);
        prestador.value = null;
        prestadoresSelecionados.value = prestadores;
      } else {
        console.error(`Falha na requisição GET: Código de status ${response.status}`);
      }
    } else {
      prestadoresSelecionados.value = [];
    }
  } catch (error) {
    console.error('Ocorreu um erro na requisição GET:', error);
  }
}

async function cadastrarCliente() {
  try {

    console.log(`cnpj geral ${cnpj.value} e ${nome.value}`)
    const clienteData = {
      clienteCnpj: cnpj.value,
      clienteNome: nome.value,
    };

    const response = await axios.post('http://localhost:8080/cliente', clienteData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 201) {

      clientId.value = response.data.clienteId;
      return clientId

    } else {
      console.error(`Falha na solicitação POST: Código de status ${response.status}`);
      throw new Error('Falha ao cadastrar o cliente');
    }
  } catch (error) {
    console.error('Ocorreu um erro ao cadastrar o cliente:', error);
    throw error; // Propague o erro para que a função de chamada possa tratá-lo
  }
}

async function coletarClienteCPNJ() {
  try {
    const response = await axios.get(`http://localhost:8080/cliente/cnpj/${cnpj.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const clienteId = response.data.clienteId;
    console.log(`eu sou o selecionado ${clienteId}`)
    return clienteId // Agora estamos preenchendo o valor selecionado

  } catch (error) {
    console.error('Ocorreu um erro ao coletar o cnpj do cliente:', error);
    return null; // Retorna null explicitamente

  }
}


async function cadastrarOrdemServico() {


  try {
    if (!prestador.value) {
      alert('Selecione um prestador de serviço');
      return;
    }



    var idcliente = null

    console.log(`antes ${idcliente}`)

    idcliente = await coletarClienteCPNJ();

    console.log(`depois de ver ${idcliente}`);

    if (idcliente == null) {
      idcliente = await cadastrarCliente();
      console.log(`depois de cadastrado ${idcliente}`);
    }

    console.log(`depois de tudo ${idcliente.value}`)



    const ordemServicoData = {
      dataFechamento: null,
      status: "Em Andamento",
      descricao: descricao.value,
      cliente: idcliente.value,
      prestadores: [prestador.value],
      solicitacao: IdSolicitacao.value

    };

    console.log(`ordem geral ${ordemServicoData.value}`)

    const ordemServicoResponse = await axios.post('http://localhost:8080/ordemservico', ordemServicoData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('OBJ CADASTRADO:', ordemServicoResponse);


    // Acessar o servicoId da resposta
    const idOrdemServico = ordemServicoResponse.data.servicoId;
    console.log('ID da Ordem de Serviço:', idOrdemServico);

    cadastrarChecklistPersonalizado(idOrdemServico)

    conclusaoSolicitacao()

    console.log(clientId);


    enviarEmail(clientId.value)

    exibirPopup('Cadastro Realizado com Sucesso', 'Nova Ordem de Serviço Cadastrada.', 123);
  } catch (error) {
    console.error('Ocorreu um erro ao cadastrar a ordem de serviço:', error);
    alert('Erro ao cadastrar a ordem de serviço.');
  }
}

async function enviarEmail(idcliente) {

  try {
    let email = prompt("Email para receber o link personalizado:");

    await axios.post("http://localhost:8080/email/cliente",
      {
        email: email,
        id: idcliente
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

  }
  catch (ex) {
    erro.value = (ex as Error).message;

  }
}

async function cadastrarChecklistPersonalizado(idOrdemServico: BigInt) {
  const segmentoId = segmentoSelecionado.value;

  try {
    for (const item of checklistsAtribuidos.value) {
      const checklistItem = {
        segmentoId: segmentoId,
        ordemServicoId: idOrdemServico,
        checklistPersonalizadoNome: item.checklistNome
      };

      await axios.post('http://localhost:8080/checklist_personalizado', checklistItem, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(`Requisição POST para ${item.checklistNome} concluída.`);
    }

    console.log('Todos os checklists foram cadastrados com sucesso.');
    exibirPopup('Cadastro Realizado com Sucesso', 'Nova ordem de serviço Registrada.', 123);
  } catch (error) {
    console.error(error);
    console.log('Erro ao cadastrar checklists.');
  }
}

async function conclusaoSolicitacao() {

  console.log('====================================');
  console.log(IdSolicitacao.value);
  console.log('====================================');
  try {
    await axios.put(`http://localhost:8080/solicitacao/${IdSolicitacao.value}`,
      {

        nomeEmpresa: nome.value,
        cnpj: cnpj.value,
        resultado: "Aprovado",
        descricao: descricao.value,
        segmento: segmentoSelecionado.value
      });

    alert('Solicitacão Finalizada.')

  }
  catch (ex) {
    alert('Errado')
  }
}

async function reprovaSolicitacao() {

console.log('====================================');
console.log(IdSolicitacao.value);
console.log('====================================');
try {
  await axios.put(`http://localhost:8080/solicitacao/${IdSolicitacao.value}`,
    {

      nomeEmpresa: nome.value,
      cnpj: cnpj.value,
      resultado: "Reprovado",
      descricao: descricao.value,
      segmento: segmentoSelecionado.value
    });

  alert('Solicitacão Finalizada Finalizada.')

}
catch (ex) {
  alert('Errado')
}
}

onMounted(() => {
  IdSolicitacao.value = route.params.idEmpresa
  nome.value = route.params.nomeEmpresa
  cnpj.value = route.params.cnpj
  descricao.value = route.params.descricao
  coletarSegmento();
});

</script>
  
<style scoped>
* {
  font-family: 'Quicksand', sans-serif;
}

.form-cadastro {
  margin-left: 60px;
  top: 50%;
  width: 11OOpx;
  background-color: #f8f8f9;
}

.form-title {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #ffffff;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.form-title h1 {
  margin-left: 10px;
  color: black;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}

.form-title span {
  font-size: 20px;
  color: black;
  margin-left: 5px;
  font-weight: bolder;
}

.form-body {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin-top: 30px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.form-body .check-itens {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
}

.form-body .check-itens input {
  width: 5%;
  height: 5%;
  display: flex;
  justify-content: center;
  padding: 5px;
}

.form-body .input-group {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
}

.form-body .input-group .input-box {
  width: 25%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 80px;
  margin-top: 40px;
  margin-left: 18px;
}

.form-body .input-group .input-box label {
  font-size: 20px;
  margin-bottom: 2px;
  color: black;
}

.form-body .input-group .input-box input {
  height: 35px;
  border-radius: 9px;
  border: 0.5px solid transparent;
  outline: 1px solid #5e68b3;
  padding: 5px;
}

.form-body .input-group .input-box input::placeholder {
  color: rgb(74, 74, 74);
  margin-left: 5px;
}

.form-body .input-group .input-box input:focus-visible {
  outline: 1px solid #00a4c8;
  border: none;
}

.form-body .input-group .input-box select {
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

.form-body .input-group .input-box select:focus-visible {
  outline: 1px solid #00A4C8;
  border: none;
}

.section-itens {
  width: 60%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 80px;
  margin-top: 40px;
}

.section-title-itens {
  width: 100%;
  height: 60px;
  align-items: center;
}

.section-title-itens h1 {
  margin-left: 25px;
  font-size: 21px;
  text-decoration: underline;
}

.itens {
  width: 100%;
  display: flex;
  height: 50px;
  margin-left: 50px;
}

.itens .column {
  margin: 5px;
  display: flex;
  flex-direction: column;
}

.section-itens .itens column {
  margin: 20px;
  display: flex;
  flex-direction: column;
}

.botao-remover {
  background-color: #e7e7e7;
  border: none;
  border-radius: 4px;
  padding: 2px 8px;
  color: #535353;
  box-shadow: 1px 1px 2px rgb(179, 179, 179);
  font-size: 15px;
  font-weight: bold;
}

.botao-remover:active {
  transform: scale(0.98);
  box-shadow: 2px 1px 4px 2px rgba(8, 8, 8, 0.24);
}

.botao-editar {
  background-color: #e7e7e7;
  border: none;
  border-radius: 4px;
  padding: 2px 8px;
  color: #535353;
  box-shadow: 1px 1px 2px rgb(179, 179, 179);
  font-size: 15px;
  font-weight: bold;
}

.botao-editar:active {
  transform: scale(0.98);
  box-shadow: 2px 1px 4px 2px rgba(8, 8, 8, 0.24);
}

.botao-salvarEdicao {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  box-shadow: 1px 1px 2px rgb(179, 179, 179);
  font-size: 12px;
}

.botao-salvarEdicao:active {
  transform: scale(0.98);
  box-shadow: 2px 1px 4px 2px rgba(8, 8, 8, 0.24);
}

.form-submit {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: end;
  margin-top: 100px;
  margin-right: 12%;
}

.form-submit button {
  margin-right: 20px;
  margin-bottom: 30px;
}

button {
  background-color: #00a4c8;
  color: white;
  width: 100px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid #00a4c8;
  font-weight: bold;
  letter-spacing: 1px;
}

button:hover {
  background-color: rgb(255, 255, 255);
  color: #00a4c8;
  cursor: pointer;
  transition: 0.5s;
}

.button-return {
  background-color: rgb(255, 255, 255);
  color: #00a4c8;
}

.button-return:hover {
  background-color: #00a4c8;
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: 0.5s;
}

.checklist-action {
  display: flex;
  justify-content: center;
  align-items: center;
}

.adicionar {
  background-color: #2c2e3d;
  border-radius: 0px;
  border-color: white;
  width: 30px;
  height: 30px;
  margin-left: 5px;
}

.adicionar:hover {
  background-color: #2c2e3d;
  border-color: white;
}

.form-footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.form-footer p {
  margin-right: 80px;
  font-size: 12px;
}
</style>