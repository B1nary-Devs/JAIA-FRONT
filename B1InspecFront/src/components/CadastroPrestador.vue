<template>
    <div class="form-cadastro">
        <div class="form-title">
            <h1>Prestador de Serviço > Cadastro</h1>
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
                    <Dropdown v-model="selectCategoria" :options="categorias" optionLabel="name" placeholder="Selecione uma categoria" class="w-full md:w-14rem" />
                </div>

                <div class="input-box">
                    <label for="id_email">Email</label>
                    <input type="email" id="id_email" placeholder="Ex: joao@gmail.com">
                </div>

                <div class="input-box">
                    <label for="id_senha">Senha</label>
                    <input type="password" id="id_senha">
                </div>

                <div class="form-submit">
                    <button>Voltar</button>

                    <button>Cadastrar</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Dropdown from 'primevue/dropdown';
    import { ref } from "vue";

    
const selectCategoria = ref();
const categorias = ref([
{ name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

</script>