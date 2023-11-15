<template>
  <div class="loginPage">
    <div class="login">
      <h1 class="titulo">Login</h1>
      <div class="login-box">
        <label for="email">E-mail</label>
        <input type="email" class="input-email" id="email" v-model="email" />
        <p v-if="errorEmail">E-mail Inválido!</p>
      </div>
      <div class="login-box">
        <label for="senha">Senha</label>
        <input type="password" class="input-senha" id="senha" v-model="senha" />
        <p v-if="errorSenha">Senha Inválida!</p>
      </div>
      <p v-if="errorDados">E-mail ou senha incorreta!</p>
      <div class="btnEntrar" @click="login">
        <button class="btn">Entrar</button>
      </div>
    </div>
    <ThePopUp />
  </div>
</template>

<script setup lang="ts">
import '../assets/css/login/login.css'
import { ref } from 'vue'
import axios from 'axios'
import ThePopUp from '../components/ThePopUp.vue'
import { exibirPopup } from '../components/ThePopUp.vue'
import { signIn } from '@/auth/auth'
import router from '@/router'

const email = ref('')
const senha = ref('')
const errorEmail = ref(false)
const errorSenha = ref(false)
const errorDados = ref(false)

async function login() {
  try {
      errorEmail.value = email.value === ''
      errorSenha.value = senha.value === ''

    if (!errorEmail.value && !errorSenha.value) {
      await signIn(email.value, senha.value)

      const token = localStorage.getItem('token')
      if(token === 'Autenticação falhou'){
        errorDados.value = true
      }else{
        const acesso = localStorage.getItem('acesso')

        if (acesso === 'ADMIN') {
          router.push('/homeinicial') // Redireciona para a página inicial se for adm
        } else if (acesso === 'USER') {
          router.push('/aprovOrdemServico') // Redireciona para a rota '/aprovOrdemServico' se for prestador
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
