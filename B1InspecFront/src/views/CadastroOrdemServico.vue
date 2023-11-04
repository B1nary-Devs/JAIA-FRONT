<template>
  <div class="form-cadastro">
    <div class="form-title">
      <h1>Ordem de Serviço</h1>
      <span>> Cadastro</span>
    </div>
    <div class="form-body">

      <div class="check-itens">
        
        <input type="radio" value="existente" v-model="picked" @click="radio(true)"/>
        <label for="existente">Selecionar cliente existente</label>

        <input type="radio" value="novo" v-model="picked" @click="() => { radio(true); limpar() }"/>
        <label for="novo">Cadastrar novo cliente</label>
        
      </div>

      <div class="input-group" >
        <div class="input-box" v-if="picked === 'novo'">
          <label for="id_nome">Nome da Empresa</label>
          <input type="text" id="id_nome" v-model="nome" />
        </div>

        <div class="input-box" v-else>
          <label for="id_selnome">Nome da Empresa</label>
          <select id="id_selnome" @change="coletarClienteCPNJ()" v-model="empresaSelect">
          <option v-for="cli in clienteSelecionado" :key="cli.clienteId" :value="cli.clienteId">{{ cli.clienteNome }}</option>
          </select>
        </div>

        <div class="input-box">
          <label for="id_cnpj">CNPJ</label>
          <input type="number" id="id_cnpj" v-model="clienteCNPJ" />
        </div>

        <div class="input-box">
          <label for="id_descricao">Descrição</label>
          <input type="text" id="id_descricao" v-model="descricao" />
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
          <option v-for="ptr in prestadoresSelecionados" :key="ptr.prestadorId" :value="ptr.prestadorId">{{ ptr.prestadorNome }}</option>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" @click="editarItem(index)" v-if="index !== estadoEdicao" style="margin-right: 10px;">
          <path fill="black" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill="black" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16" @click="salvarEdicao(index)" v-if="index === estadoEdicao" style="margin-right: 10px;">
          <path fill="black" d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
          <path fill="black" d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="btn-remover" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" @click="removerItem(index)">
          <path fill="black" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </div>
      <div class="itens" v-for="(checklistPerson, index) in checklistsPersonalizado" :key="index">
        <div class="column">
          <!-- {{ index + 1 }}: -->
          <span v-if="index !== estadoEdicao">{{ checklistPerson }}</span>
          <input v-else v-model="checklistsPersonalizado[index]" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" @click="editarItem(index)" v-if="index !== estadoEdicao" style="margin-right: 10px;">
          <path fill="black" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill="black" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16" @click="salvarEdicao(index)" v-if="index === estadoEdicao" style="margin-right: 10px;">
          <path fill="black" d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
          <path fill="black" d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="btn-remover" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" @click="removerItem(index)">
          <path fill="black" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
      </div>
      </div>


      <div class="form-submit">
        <button @click="" class="button-return">Voltar</button>
        <button @click="cadastrarOrdemServico" >Cadastrar</button>
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
import '../assets/css/cadOrdemServico/cadOrdemServico.css'
import ThePopUp from '../components/ThePopUp.vue'
import { exibirPopup } from '../components/ThePopUp.vue'
import axios from 'axios'

const nome = ref("");
const selnome = ref("");
const cnpj = ref("");
const descricao = ref("");
const segmento = ref("");
const checklist = ref("");
const picked = ref('novo');
const segmentoSelecionado = ref(null);
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

const token = localStorage.getItem('token')

function ptrs(){
  console.log(empresaSelect.value);
}

function inserirItem() {
  console.log(`chechlistvalor -->  ${checklist.value}`)
  if (checklist.value.trim() !== "") {
    checklistsPersonalizado.value.push(checklist.value);
    console.log(`lista -->  ${checklistsPersonalizado.value}`)
    checklist.value = "";
  }
}

function editarItem(index) {
  estadoEdicao.value = index;
}

function salvarEdicao(index) {
  if (estadoEdicao.value !== -1) {
    
    const checklistEditado = checklistsAtribuidos.value[estadoEdicao.value];
    axios.put(`http://localhost:8080/checklist/${checklistEditado.checklistId}`, {
      checklistNome: checklistEditado.checklistNome,
    },{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => {
      
      checklistsAtribuidos.value.splice(estadoEdicao.value, 1);
     
      estadoEdicao.value = -1;
    })
    .catch(error => {
      console.error('Erro ao salvar as alterações:', error);
    });
  }
}

function removerItem(index) {
  checklistsAtribuidos.value.splice(index, 1);
}


function radio(valor: boolean){
  radioB.value = valor;
  console.log(clienteSelecionado.value);
  const valor2 = clienteSelecionado.value;
  console.log(`eu sou o valor ${valor2}`);
}

async function coletarSegmento() {
  try {
    const response = await axios.get('http://localhost:8080/segmento',{
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
    const response = await axios.get('http://localhost:8080/cliente',{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    const clientes = response.data;
    clienteSelecionado.value = clientes; // Agora estamos preenchendo o valor selecionado
  } catch (error) {
    console.error('Ocorreu um erro ao coletar o segmento:', error);
  }
}

async function coletarClienteCPNJ() {
  try {
    const id = empresaSelect.value
    const response = await axios.get(`http://localhost:8080/cliente/id/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    const cliente = response.data.clienteCnpj;
    clienteCNPJ.value = cliente; // Agora estamos preenchendo o valor selecionado
    console.log(`eu sou o selecionado ${clienteCNPJ}`)
  } catch (error) {
    console.error('Ocorreu um erro ao coletar o segmento:', error);
  }
}


async function buscarChecklistsPorSegmento(segmentoId) {
  try {
    if (segmentoId) {
      const response = await axios.get(`http://localhost:8080/segmento/${segmentoId}`,{
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
      const response = await axios.get(`http://localhost:8080/prestador?segmentoId=${segmentoId}`,{
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

function prestadorSelecionado() {
  // Quando um prestador é selecionado, você pode acessar o ID do prestador em prestador.value
  if (prestador.value) {
    // Adicione o ID do prestador aos dados da ordem de serviço
    ordemServicoData.prestadores = [prestador.value];
  }
}

async function cadastrarCliente() {
  try {
    const clienteData = {
      clienteCnpj: cnpj.value,
      clienteNome: nome.value,
    };

    const response = await axios.post('http://localhost:8080/cliente', clienteData,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    if (response.status === 201) {
      const clienteId = response.data.clienteId;
      return clienteId; // Retorne o ID do cliente
    } else {
      console.error(`Falha na solicitação POST: Código de status ${response.status}`);
      throw new Error('Falha ao cadastrar o cliente');
    }
  } catch (error) {
    console.error('Ocorreu um erro ao cadastrar o cliente:', error);
    throw error; // Propague o erro para que a função de chamada possa tratá-lo
  }
}

async function cadastrarOrdemServico() {
 

  try {
    if (!prestador.value) {
      alert('Selecione um prestador de serviço');
      return;
    }

    var clienteId = null
    
    if (radioB.value){

      clienteId = empresaSelect.value   

    }else{

      clienteId = await cadastrarCliente();

    }
  
    const ordemServicoData = {
      dataFechamento: null,
      status: "aberto em andamento",
      descricao: descricao.value, 
      cliente: clienteId,
      prestadores: [prestador.value], 

    };

    const ordemServicoResponse = await axios.post('http://localhost:8080/ordemservico', ordemServicoData,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });

    console.log('OBJ CADASTRADO:', ordemServicoResponse);


    // Acessar o servicoId da resposta
    const idOrdemServico = ordemServicoResponse.data.servicoId;
    console.log('ID da Ordem de Serviço:', idOrdemServico);
   
    cadastrarChecklistPersonalizado(idOrdemServico)

    cadastrarChecklistPersonalizadoNovo(idOrdemServico)


    exibirPopup('Cadastro Realizado com Sucesso', 'Nova Ordem de Serviço Cadastrada.', 123);
  } catch (error) {
    console.error('Ocorreu um erro ao cadastrar a ordem de serviço:', error);
    alert('Erro ao cadastrar a ordem de serviço.');
  }
}

async function cadastrarChecklistPersonalizado(idOrdemServico) {
  try {
    const nomesItens = checklistsAtribuidos.value.map((item) => ({
      ordemServicoId: idOrdemServico,
      checklistPersonalizadoNome: item.checklistNome
    }))

    for (const nomeItem of nomesItens) {
     console.log(nomeItem)
       await axios.post('http://localhost:8080/checklist_personalizado',nomeItem,{
        headers: {
        'Authorization': `Bearer ${token}` 
      }
       })

      console.log(`Requisição POST para ${nomeItem.checklistPersonalizadoNome} concluída.`)
      exibirPopup('Cadastro Realizado com Sucesso', 'Novo Segmento Registrado.', 123)
    }

    console.log('Todos os checklists foram cadastrados com sucesso.')
  } catch (error) {
    console.error(error)
    console.log('Erro ao cadastrar checklists.')
  }
}

async function cadastrarChecklistPersonalizadoNovo(idOrdemServico) {
  try {
    const nomesItens = checklistsPersonalizado.value.map((item) => ({
      ordemServicoId: idOrdemServico,
      checklistPersonalizadoNome: item
    }))

    console.log(nomesItens)

    for (const nomeItem of nomesItens) {
     console.log(nomeItem)
       await axios.post('http://localhost:8080/checklist_personalizado',nomeItem,{
        headers: {
        'Authorization': `Bearer ${token}` 
      }
       })

      console.log(`Requisição POST para ${nomeItem.checklistPersonalizadoNome} concluída.`)
      exibirPopup('Cadastro Realizado com Sucesso', 'Novo Segmento Registrado.', 123)
    }

    console.log('Todos os checklists foram cadastrados com sucesso.')
  } catch (error) {
    console.error(error)
    console.log('Erro ao cadastrar checklists.')
  }
}

function limpar(){
  clienteCNPJ.value = ""
  console.log('caralhoooooooooooooooo');
  
}


onMounted(() => {
  coletarSegmento();
  coletarCliente();
});

</script>
