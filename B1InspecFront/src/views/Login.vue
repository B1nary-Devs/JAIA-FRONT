
<template>
    <div class="loginPage">
        <div class="login">
            <h1>Login</h1>
            <div class="input-box">
                <label for="email">E-mail</label>
                <input
                    type="email"
                    class="input-email"
                    id="email"
                    v-model="email"
                />
                <p v-if="errorEmail">E-mail Inválido!</p>
            </div>
            <div class="input-box">
                <label for="senha">Senha</label>
                <input
                    type="password"
                    class="input-senha"
                    id="senha"
                    v-model="senha"
                />
                <p v-if="errorSenha">Senha Inválida!</p>
            </div>
            <p>Esqueci a senha</p>
            <div class="btnEntrar" @click="Login">
                <button class="btn" >Entrar</button>
            </div>
        </div>
        <ThePopUp/>
    </div>
</template>

<script setup lang="ts">
    import '../assets/css/login/login.css'
    import { ref } from 'vue'
    import axios from 'axios'
    import ThePopUp from '../components/ThePopUp.vue';
    import {exibirPopup} from '../components/ThePopUp.vue'
    import {signIn} from '../auth/auth'
    import router from '@/router';

    const email = ref("")
    const senha = ref("")
    const errorEmail= ref(false)
    const errorSenha = ref(false)

    async function Login() {
        try {
            if(email.value === ""){
                errorEmail.value = true
            }
            if(senha.value === ""){
                errorSenha.value = true
            }

            await signIn(email.value, senha.value)
            router.push('/');
            
        } catch (error) {
            console.log(error)
        }
    }
</script>