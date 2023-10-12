<template>
    <div class="componente-nav" @mouseleave="closeAllSubMenus">
        <nav>
            <div class="logo">
                <div class="logo-item">
                    <router-link to="/" id="cadPrestador" title="I para página Inicial">
                        <div class="logo-link-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle"
                                viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <p>Login</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="divisor"></div>
            <div class="nav-menu">
                <div class="nav-item">
                    <router-link to="/" id="Home" title="Ir para página Inicial">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" :class="{ 'arrow-rotate': showSubMenuSegmento }" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                        </svg>
                        <p>Prestador</p>
                    </div>
                    <div class="icons-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" :class="{ 'arrow-rotate': showSubMenuPrestador }" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
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
                <div class="link-item" @click="toggleSubMenuOrdem">
                    <div class="icons-item">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-building-fill-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.493 4.493 0 0 0 12.5 8a4.493 4.493 0 0 0-3.59 1.787A.498.498 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.476 4.476 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                        </svg>
                        <p>Ordem de serviço</p>
                    </div>
                    <div class="icons-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" :class="{ 'arrow-rotate': showSubMenuOrdem }" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
                <div class="submenu" v-show="showSubMenuOrdem">
                    <router-link to="/" id="cadOrdem" title="Realizar um novo cadastro">
                        <div class="item-submenu">
                            <p>Cadastrar</p>
                        </div>
                    </router-link>
                    <router-link to="/consOrdem" id="consOrdem" title="Realizar consulta">
                        <div class="item-submenu">
                            <p>Consultar</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import '../assets/css/nav/nav.css'
import { ref } from 'vue'

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

const closeAllSubMenus = () => {
  // Feche todos os submenus definindo as variáveis como false
  showSubMenuSegmento.value = false
  showSubMenuPrestador.value = false
  showSubMenuOrdem.value = false
}

</script>