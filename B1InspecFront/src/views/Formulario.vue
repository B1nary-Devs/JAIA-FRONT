<template>
    <div class="formulario-cadastro">
      <div class="form-title">
        <h1>Nova Ordem de serviço</h1>
        <span>> {Formulario}</span>
      </div>

      <div class="form-body-form">
        <div class="input-group-form">
          <div class="input-box-form">
            <label for="id_nome">Nome da Empresa</label>
            <input type="text" id="id_nome" v-model="nome" />
          </div>
  
          <div class="input-box-form">
            <label for="id_cnpj">CNPJ</label>
            <input type="number" id="id_cnpj" v-model="clienteCNPJ" />
          </div>
  
          <div class="input-box-form">
            <label for="id_descricao">Descrição</label>
            <input type="text" id="id_descricao" v-model="descricao" />
          </div>
  
          <div class="input-box-form">
          <label for="id_segmento">Segmento</label>
          <select id="id_segmento" v-model="segmentoSelecionado">
            <option v-for="ctg in segmento" :key="ctg.id" :value="ctg.id">{{ ctg.nome }}</option>
          </select>
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
  const cnpj = ref("");
  const descricao = ref("");
  const segmento = ref("");
  const segmentoSelecionado = ref(null);
  const clienteSelecionado = ref(null);
  const prestador = ref(null);
  const empresaSelect = ref(null);
  const radioB = ref();
  const clienteCNPJ = ref("")

  async function coletarSegmento() {
    try {
      const response = await axios.get('http://localhost:8080/segmento');
      segmento.value = response.data; 
      console.log(segmento.value);
    } catch (error) {
      console.error('Ocorreu um erro ao coletar o segmento:', error);
    }
  }
  
  async function coletarCliente() {
    try {
      const response = await axios.get('http://localhost:8080/cliente');
      const clientes = response.data;
      clienteSelecionado.value = clientes; // Agora estamos preenchendo o valor selecionado
    } catch (error) {
      console.error('Ocorreu um erro ao coletar o segmento:', error);
    }
  }
  
  async function cadastrarCliente() {
    try {
      const clienteData = {
        clienteCnpj: cnpj.value,
        clienteNome: nome.value,
      };
  
      const response = await axios.post('http://localhost:8080/cliente', clienteData);
  
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
  
      const ordemServicoResponse = await axios.post('http://localhost:8080/ordemservico', ordemServicoData);
  
      console.log('OBJ CADASTRADO:', ordemServicoResponse);
  
  
      // Acessar o servicoId da resposta
      const idOrdemServico = ordemServicoResponse.data.servicoId;
      console.log('ID da Ordem de Serviço:', idOrdemServico);
 
  
      exibirPopup('Cadastro Realizado com Sucesso', 'Nova Ordem de Serviço Cadastrada.', 123);
    } catch (error) {
      console.error('Ocorreu um erro ao cadastrar a ordem de serviço:', error);
      alert('Erro ao cadastrar a ordem de serviço.');
    }
  }
  
  onMounted(() => {
    coletarSegmento();
    coletarCliente();
  });
  
  </script>
  