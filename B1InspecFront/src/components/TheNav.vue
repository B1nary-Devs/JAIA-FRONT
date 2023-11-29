<template>
    <div class="componente-nav" @mouseleave="closeAllSubMenus">
        <nav v-if="admin">
            <div class="logo">
                <div class="logo-item">
                    <router-link to="/login" id="login" title="I para página Inicial" @click = 'sair' >
                        <div class="logo-link-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle"
                                viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <div class="logo-link-item-p">
                                <p>{{ nameUser }}</p>
                                <p class="sair">Sair</p>
                            </div>
                            

                        </div>
                    </router-link>
                </div>
            </div>
            <div class="divisor"></div>
            <div class="nav-menu">
                <div class="nav-item">
                    <router-link to="/homeinicial" id="Home" title="Ir para página Inicial">
                        <div class="link-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                            </svg>
                            <p>Home</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="menu-submenu">
                <div class="link-item" @click="toggleSubMenuSegmento">
                    <div class="icons-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-card-checklist"
                            viewBox="0 0 16 16">
                            <path
                                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                            <path
                                d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                        </svg>
                        <p>Segmento</p>
                    </div>
                    <div class="icons-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="{ 'arrow-rotate': showSubMenuSegmento }" class="bi bi-chevron-right"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div class="submenu" v-show="showSubMenuSegmento">
                    <router-link to="/cadSegmento" title="Cadastrar novo segmento">
                        <div class="item-submenu">
                            <p>Cadastrar</p>
                        </div>
                    </router-link>
                    <router-link to="/consSegmento" id="consSegmento" title="Realizar consulta">
                        <div class="item-submenu">
                            <p>Consultar</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="menu-submenu">
                <div class="link-item" @click="toggleSubMenuPrestador">
                    <div class="icons-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-fill"
                            viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                        <p>Prestador</p>
                    </div>
                    <div class="icons-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="{ 'arrow-rotate': showSubMenuPrestador }" class="bi bi-chevron-right"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div class="submenu" v-show="showSubMenuPrestador">
                    <router-link to="/cadPrestador" id="cadPrestador" title="Realizar um novo cadastro">
                        <div class="item-submenu">
                            <p>Cadastrar</p>
                        </div>
                    </router-link>
                    <router-link to="/consPrestador" id="consPrestador" title="Realizar consulta">
                        <div class="item-submenu">
                            <p>Consultar</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="menu-submenu">
                <div class="link-item" @click="toggleSubMenuSolicitacao">
                    <div class="icons-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-send-exclamation-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                        </svg>
                        <p>Solicitação</p>
                    </div>
                    <div class="icons-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="{ 'arrow-rotate': showSubMenuSolicitacao }" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div class="submenu" v-show="showSubMenuSolicitacao">
                    <router-link to="/consSolicitacoes" id="solicitacao" title="Visualizar solicitacao">
                        <div class="item-submenu">
                            <p>Analisar</p>
                        </div>
                    </router-link>
                </div>
                </div>


            <div class="menu-submenu">
                <div class="link-item" @click="toggleSubMenuOrdem">
                    <div class="icons-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            class="bi bi-building" viewBox="0 0 16 16">
                            <path
                                d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                            <path
                                d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                        </svg>
                        <p>Ordem de serviço</p>
                    </div>
                    <div class="icons-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            :class="{ 'arrow-rotate': showSubMenuOrdem }" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                </div>
                <div class="submenu" v-show="showSubMenuOrdem">
                    <router-link to="/cadOrdem" id="cadOrdem" title="Realizar um novo cadastro">
                        <div class="item-submenu">
                            <p>Cadastrar</p>
                        </div>
                    </router-link>
                    <router-link to="/consOrdem" id="consOrdem" title="Realizar consulta">
                        <div class="item-submenu">
                            <p>Consultar</p>
                        </div>
                    </router-link>
                    <router-link to="/aprovOrdemServico" title="Aprovar Ordens">
                        <div class="item-submenu">
                            <p>Analisar</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </nav>
        <nav v-if="user">
            <div class="logo">
                <div class="logo-item">
                    <router-link to="/login" id="login" title="I para página Inicial" @click = 'sair'>
                        <div class="logo-link-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle"
                                viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <div class="logo-link-item-p">
                                <p>{{ nameUser }}</p>
                                <p class="sair">Sair</p>
                            </div>
                            

                        </div>
                    </router-link>
                </div>
            </div>
            <div class="divisor"></div>
            <div class="nav-menu">
                <div class="nav-item">
                    <router-link to="/homeinicial" id="Home" title="Ir para página Inicial">
                        <div class="link-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                            </svg>
                            <p>Home</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { signOut } from '@/auth/auth';
import '../assets/css/nav/nav.css'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const nameUser = ref('')
const token = localStorage.getItem('token')

const role = localStorage.getItem('role')
const admin = ref(false)
const user = ref(false)

function roleUser(){
    if (role === 'ADMIN'){
        admin.value = true
    }else if(role === 'USER'){
        user.value = true
    }
}

async function userName(){
    const userId = localStorage.getItem('user');
    if(userId === '1'){
        nameUser.value = 'Admin'
    }else{
        const response = await axios.get(`http://localhost:8080/prestador/usuario/${userId}`,{
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        nameUser.value = response.data.prestadorNome
    }
    
}

onMounted(() => {
    userName(),
    roleUser()
});

const showSubMenuSegmento = ref(false)
const toggleSubMenuSegmento = () => {
    showSubMenuSegmento.value = !showSubMenuSegmento.value
    showSubMenuPrestador.value = false
    showSubMenuOrdem.value = false
}

const showSubMenuPrestador = ref(false)
const toggleSubMenuPrestador = () => {
    showSubMenuPrestador.value = !showSubMenuPrestador.value
    showSubMenuSegmento.value = false
    showSubMenuOrdem.value = false
}

const showSubMenuOrdem = ref(false)
const toggleSubMenuOrdem = () => {
    showSubMenuOrdem.value = !showSubMenuOrdem.value
    showSubMenuPrestador.value = false
    showSubMenuSegmento.value = false
}


const showSubMenuSolicitacao = ref(false)
const toggleSubMenuSolicitacao = () => {
    showSubMenuSolicitacao.value = !showSubMenuSolicitacao.value
    showSubMenuPrestador.value = false
    showSubMenuSegmento.value = false
    showSubMenuOrdem.value = false
}


const closeAllSubMenus = () => {
    // Feche todos os submenus definindo as variáveis como false
    showSubMenuSegmento.value = false
    showSubMenuPrestador.value = false
    showSubMenuOrdem.value = false
    showSubMenuSolicitacao.value = false
}

function sair(){
    signOut()
    location.reload();
}

</script>