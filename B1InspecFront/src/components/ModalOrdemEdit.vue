<template>
    <div class="modal-ordem-background" >
        <div class="modal">
            <div class="modal-title">
                <h1>Ordem N° {{ id }}</h1>
                <!-- usando a função para trocar o estado do modal-->
                <div class="modal-title-buttons">
                    <button class="modal-fechar" @click="toggleModalEdit()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path
                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </button>
                    <button class="modal-aplicar" @click="() => { toggleModalEdit(); atualizarOrdem(); }">
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-check2"
                            viewBox="0 0 16 16">
                            <path
                                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="modal-cons-body">
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-calendar-check"
                                viewBox="0 0 16 16">
                                <path
                                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>
                            Data de Abertura:
                        </p>
                        <input type="text" v-model="dataAbertura">
                    </div>
                </div>
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-calendar-x"
                                viewBox="0 0 16 16">
                                <path
                                    d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
                                <path
                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                            </svg>
                            Data de Fechamento:
                        </p>
                        <input type="text" v-model="dataFechamento">
                    </div>
                </div>
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            Prestador:
                        </p>
                        <input type="text" v-model="prestadorNome" disabled>
                    </div>
                </div>
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-building"
                                viewBox="0 0 16 16">
                                <path
                                    d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                <path
                                    d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z" />
                            </svg>
                            Cliente:
                        </p>
                        <input type="text" v-model="clienteNome" disabled>
                    </div>
                </div>
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bookmark"
                                viewBox="0 0 16 16">
                                <path
                                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                            </svg>
                            status:
                        </p>
                        <input type="text" v-model="statusOrd">
                    </div>
                </div>
                <div class="modal-box-group">
                    <div class="modal-box">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                class="bi bi-wrench-adjustable-circle" viewBox="0 0 16 16">
                                <path
                                    d="M12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8Zm-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
                            </svg>
                            segmento:
                        </p>
                        <input type="text" v-model="segmentoNome" disabled>
                    </div>
                </div>

                <div class="modal-box-group" v-for="xx in checklist">
                    <div class="modal-box" >
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                            </svg>
                            ChecklistList:
                        </p>
                        <!-- <span>{{  xx.checklistPersonalizadoNome }}</span> -->
                    </div>
                    <div class="modal-box-check">
                        <span>{{  xx.checklistPersonalizadoNome }}</span>
                        <button>{{xx.situacao}}</button>
                    </div>

                    <!-- <div v-for="(y, cont) in xx.segmento.checklistList" class="modal-box-check">
                        <p><strong>Checklist Secundario: </strong>{{  y.checklistNome }}</p>
                    </div> -->
<!-- 
                    <div class="modal-box-check">
                        <p><strong>Situação: </strong>{{ xx.situacao }}</p>
                    </div> -->
                </div>

                <div class="modal-box-group">
                    <div class="modal-box-desc">
                        <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-textarea-t"
                                viewBox="0 0 16 16">
                                <path
                                    d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874V2.5zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5v3.563zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                <path
                                    d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z" />
                            </svg>
                            Descrição
                        </h4>
                        <p id="text-desc">{{ descricao }}</p>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import '../assets/css/modal/modal.css'
    import { ref,onMounted} from 'vue';
    import axios from 'axios';

    const props = defineProps({
        toggleModalEdit: {
            type: Function,
            required: true,
        },

        id: String,
        dtaAbertura: String,
        dtaFechamento: String,
        prestador: String,
        segmento: String,
        cliente: String,
        status: String,
        desc: String,
        check: Object,
        clienteId: String,
        prestadorId: String
    })

    
    const ordemId = ref(props.id);
    const dataAbertura = ref(props.dtaAbertura)
    const dataFechamento = ref(props.dtaFechamento)
    const prestadorNome = ref(props.prestador)
    const clienteNome = ref(props.cliente)
    const segmentoNome = ref(props.segmento)
    const statusOrd = ref(props.status)
    const descricao = ref(props.desc)
    const checklist = ref(props.check)
    const clienteId = ref(props.clienteId)
    const prestadorId = ref(props.prestadorId)

    const token = localStorage.getItem('token')
    async function atualizarOrdem(){
        try {
            await axios.put(`http://localhost:8080/ordemservico/${ordemId.value}`,{
                dataAbertura: dataAbertura.value,
                dataFechamento: dataFechamento.value,
                status: statusOrd.value,
                descricao: descricao.value,
                cliente: clienteId.value,
                prestadores: [prestadorId.value]
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
            }})

            alert('Registro atualizado!!');
            window.location.reload();
           
        } catch (error) {
            console.error('Ocorreu um erro ao cadastrar o prestador:', error);
            alert('Erro ao cadastrar o prestador.');
        }
    }

    

    
</script>