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
                    <input type="text" id="id_nome" placeholder="Ex: Encanador">
                </div>

                <div class="input-box">
                    <label for="id_cnpj">CNPJ</label>
                    <input type="number" id="id_cnpj" placeholder="00.000.000/0000-00">
                </div>

                <div class="input-box">
                    <label for="id_categoria">Categoria</label>
                    <select id="id_categoria">
                        <option v-for="ctg in categoria" name="select" :key="ctg.id" value="value1">{{ ctg.nome }}</option>
                    </select>
                </div>

                <div class="input-box">
                    <label for="id_email">Email</label>
                    <input type="email" id="id_email" placeholder="Ex: joao@gmail.com">
                </div>

                <div class="input-box">
                    <label for="id_senha">Senha</label>
                    <input type="password" id="id_senha">
                </div>
            </div>

            <div class="form-submit">
                    <button>Voltar</button>

                    <button>Cadastrar</button>
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

  const nome = document.getElementById('id_nome')
  const cnpj = ref("Cnpj");
  const email = ref("Email");
  const senha = ref("Senha");
  const categoria = ref([]);
  const prestador = ref();

  async function coletarCategoria() {
    try {
      const response = await axios.get('http://localhost:8080/categoria');
      categoria.value = response.data; // Atribuir diretamente à ref
      console.log(categoria.value);
    } catch (error) {
      console.error('Ocorreu um erro ao coletar a categoria:', error);
    }
  }

  async function cadastrarPrestador() {
    await axios.get('http://localhost:8080/prestador' ,
    {
    

    });
  }

  onMounted(()=>{
    coletarCategoria();
  })
</script>
