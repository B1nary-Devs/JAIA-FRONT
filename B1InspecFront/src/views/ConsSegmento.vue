<template>
    <div class="container-table">
        <div class="cons-title">
            <h1>Segmento</h1>
        </div>
        <div class="cons-table">
            <div class="filter">

                <div class="input-filter">
                    <label class="form-label" for="initial-date">Nome</label><br>
                    <input class="form-control" type="text">
                </div>

                <div class="Buttons">

                    <button type="button">Filtrar</button>

                </div>

            </div>

            <table>
                <thead>
                    <th>Nome</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    <tr v-for="segmento in segmento" :key="segmento.segmentoId">
                        <td>{{ segmento.segmentoNome }}</td>
                        <td>
                            <button class="btn-info">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-eye" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path
                                        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </button>
                            <button class="btn-edit">
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
            <button class="go-cadSegmento">
                <router-link to="/cadSegmento" title="Realizar um novo cadastro">
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
    <PreLoader></PreLoader>
</template>

<script setup lang="ts">
import '../assets/css/table/table.css'
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PreLoader from '../components/PreLoader.vue';
import { exibirPreload } from '../components/PreLoader.vue'

const segmento = ref([]);

async function loadTabela() {
    try {
        const response = await axios.get('http://192.168.1.163:8080/segmento');
        segmento.value = response.data; // Atribuir diretamente à ref
        console.log(segmento.value);
    } catch (error) {
        console.error('Ocorreu um erro ao coletar os segmentos:', error);
    }
}

function returnarPag() {
    window.history.back();
}

onMounted(() => {
    exibirPreload();
    setTimeout(() => {
        loadTabela();
    }, 2000);
})
</script>