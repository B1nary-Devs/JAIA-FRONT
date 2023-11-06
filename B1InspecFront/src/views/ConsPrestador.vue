<template>
    <div class="container-table">
        <div class="cons-title">
            <h1>Prestador de Serviço</h1>
        </div>
        <div class="cons-table">
            <div class="filter">

                <div class="input-filter">
                    <label class="form-label" for="filtro-nome">Nome</label><br>
                    <input v-model="nomeFiltro" class="form-control" type="text" id="filtro-nome">
                </div>

                <div class="input-filter">
                    <label class="form-label" for="filtro-cnpj">CNPJ</label><br>
                    <input v-model="cnpjFiltro" class="form-control" type="text" id="filtro-cnpj">
                </div>

                <div class="Buttons">

                    <button type="button" id="filtro" @click="aplicarFiltros"> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" 
                    stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2.13333,2.13333)">
                        <rect x="-10.33127" y="91.07442" transform="rotate(-45.001)" width="15" height="62.367" fill="#000000" opacity="0.35"></rect><rect x="-7.50279" y="88.24604"
                         transform="rotate(-45.001)" width="15" height="62.367" fill="#000000"></rect><circle cx="49" cy="53" r="37" fill="#000000" opacity="0.35"></circle><circle cx="49"
                          cy="49" r="37" fill="#0862e9e8"></circle><circle cx="49" cy="53" r="28" fill="#000000" opacity="0.35"></circle><circle cx="49" cy="49" r="28" fill="#ffffff"></circle></g></g>
                    </svg>
                    </button>

                </div>

            </div>

            <table>
                <thead>
                    <th>Nome</th>
                    <th>Cnpj</th>
                    <th>E-mail</th>
                    <th>Segmento</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <tr v-for="prestador in prestador" :key="prestador.prestadorId">

                        <td>{{ prestador.prestadorNome }}</td>
                        <td>{{ prestador.cnpj }}</td>
                        <td>{{ prestador.usuario.email }}</td>
                        <td>{{ prestador.segmento.nome }}</td>
                        <td>
                            <button
                                @click="() => { valoresPrestador(prestador.cnpj); toggleModal('buttonTriggers'); }"
                                class="btn-info">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-eye" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </button>
                            <button
                                @click="() => { valoresPrestador(prestador.cnpj); toggleModalEdit('buttonTriggersEdit'); }"
                                class="btn-edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pen" viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="cons-buttons">
            <button class="button-return" @click="returnarPag">Voltar</button>
            <button class="go-cadPrestador">
                <router-link to="/cadPrestador" title="Realizar um novo cadastro">
                    <div class="go-link">
                        <p>Cadastrar</p>
                    </div>
                </router-link>
            </button>
        </div>
        <div class="footer">
            <p>© B1naryInspec | V.01</p>
        </div>
    </div>
    <!--passe as variaveis ref dentro dos parametros DAS PROPS do modal-->
    <ModalPrestador :id="id" :nome="nome" :email="email" :cnpj="cnpj" :segmento="segmento"
        v-if="modalTriggers.buttonTriggers" :toggleModal="() => toggleModal('buttonTriggers')">
    </ModalPrestador>

    <!--passe os valores ref dentro dos parametros DAS PROPS do modal-->
    <ModalPrestadorEdit :id="id" :nome="nome" :email="email" :cnpj="cnpj" :segmento="segmento"
        v-if="modalTriggersEdit.buttonTriggersEdit" :toggleModalEdit="() => toggleModalEdit('buttonTriggersEdit')">
    </ModalPrestadorEdit>

    <PreLoader></PreLoader>
</template>

<script setup lang="ts">
/*IMPORTAÇÃO DOS MODAIS*/
import ModalPrestador from '../components/ModalPrestador.vue';
import ModalPrestadorEdit from '../components/ModalPrestadorEdit.vue';

import '../assets/css/table/table.css';
import axios from 'axios';
import { onMounted, watchEffect, ref } from 'vue';
import PreLoader from '../components/PreLoader.vue';
import { exibirPreload } from '../components/PreLoader.vue';

/*filtros*/
const prestador = ref([]);
const nomeFiltro = ref('');
const cnpjFiltro = ref('');
let dadosOriginais = [];

/*VARIAVEIS REF PARA PREENCHER A PROPS*/
const nome = ref('');
const email = ref('');
const cnpj = ref('');
const id = ref('');
const segmento = ref('');
const token = localStorage.getItem('token')
/*função para realizar a requisição por cnpj do prestador*/
async function valoresPrestador(cnpjPrestador) {
    cnpj.value = cnpjPrestador.toString();
    try {
        const response = await axios.get('http://localhost:8080/prestador/cnpj/' + cnpj.value,{
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        const prestadorData = response.data;
        /*passe os valores do response para as ref*/
        id.value = prestadorData.prestadorId;
        email.value = prestadorData.usuario.email;
        nome.value = prestadorData.prestadorNome;
        cnpj.value = prestadorData.cnpj;
        segmento.value = prestadorData.segmento.nome;

    } catch (error) {
        console.error('Ocorreu um erro ao coletar do prestador:', error);
    }
};


async function loadTabela() {
    try {
        const response = await axios.get('http://localhost:8080/prestador',{
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        prestador.value = response.data;
        dadosOriginais = response.data; // Armazenar os dados originais
        console.log(prestador.value);
    } catch (error) {
        console.error('Ocorreu um erro ao coletar os prestadores:', error);
    }
}

function returnarPag() {
    window.history.back();
}

/*aplicação de filtros*/
function aplicarFiltros() {
    const nomeFiltroValue = nomeFiltro.value.trim().toLowerCase();
    const cnpjFiltroValue = cnpjFiltro.value.trim();

    if (nomeFiltroValue === '' && cnpjFiltroValue === '') {
        // Se ambos os campos de filtro estiverem vazios, exiba todos os dados originais
        prestador.value = dadosOriginais;
    } else {
        // Caso contrário, aplique os filtros
        prestador.value = dadosOriginais.filter((prestador) => {
            const cellNome = prestador.prestadorNome.trim().toLowerCase();
            const cellCnpj = prestador.cnpj.trim();

            return (
                (nomeFiltroValue === '' || cellNome.includes(nomeFiltroValue)) &&
                (cnpjFiltroValue === '' || cellCnpj.includes(cnpjFiltroValue))
            );
        });
    }
}

// Limpa os filtros quando ambos os campos de filtro estiverem vazios
watchEffect(() => {
    if (nomeFiltro.value === '' && cnpjFiltro.value === '') {
        aplicarFiltros();
    }
});

/* ------------MODAL DE CONSULTA PRESTADOR----------------------*/
//aqui a variavel responsavel por guardar se exibe o modal ou nao
const modalTriggers = ref<{ [key: string]: boolean }>({
    buttonTriggers: false
});

//variavel que usa um evento para mudar o estado de exibir do modal
const toggleModal = (trigger: keyof typeof modalTriggers.value) => {
    modalTriggers.value[trigger] = !modalTriggers.value[trigger];
    console.log(modalTriggers.value)
};

/* ------------MODAL DE EDITAR PRESTADOR----------------------*/
const modalTriggersEdit = ref<{ [key: string]: boolean }>({
    buttonTriggersEdit: false
});

const toggleModalEdit = (trigger: keyof typeof modalTriggersEdit.value) => {
    modalTriggersEdit.value[trigger] = !modalTriggersEdit.value[trigger];
    console.log(modalTriggersEdit.value)
};

onMounted(() => {

    loadTabela();
});
</script>
