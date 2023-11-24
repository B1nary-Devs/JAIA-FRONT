<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Montserrat:wght@100&display=swap" rel="stylesheet">

  <div class="home-page">
    <div class="top-page">
      <div class="top-page-links">
        <div class="logo-link">
          <img src="../assets/img/home/logo.png" alt="">
        </div>
        <div class="page-link">
          <RouterLink to="">
            <div class="link-alternativo">
              <p>Nova Ordem</p>
            </div>
          </RouterLink>
          <router-link to="/login" id="login" title="Logar no sistema" @click = 'sair'>
            <div class="link-home">
              <p>Login</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="top-page-body">
        <div class="top-texts">
          <h4>B1nary Devs</h4>
          <h1>Transforme Inspeções em Uma Experiência Eficiente!</h1>
          <p>A B1nary Inspec simplificará a gestão de prestadores de serviço, segmentos e ordens de serviço.</p>
        </div>
        <div class="circle-top">
          <img src="../assets/img/home/robo-inspector.png" alt="">
        </div>
      </div>
    </div>
    <div class="home-page-body">
      <div class="page-body-title">
        <h1>INOVAÇÃO E COMPROMISSO</h1>
      </div>
      <div class="group-cards">
        <div class="card">
          <div class="img" id="cust">
            <img src="../assets/img/home/documentos.png" alt="">
            <span>Relatórios Customizáveis</span>
          </div>

          <div class="content">
            <span class="title">Flexibilidade</span>
            <p class="desc">Crie relatórios altamente personalizáveis que se adaptem às necessidades específicas de sua
              empresa ou clientes.</p>
          </div>

          <div class="arrow">
            <span>&#8673;</span>
          </div>
        </div>
        <div class="card">
          <div class="img" id="pad">
            <img src="../assets/img/home/acordo.png" alt="">
            <span>Padrões de Conformidade</span>
          </div>

          <div class="content">
            <span class="title">Praticidade</span>
            <p class="desc">Cumpra facilmente com regulamentos e padrões de conformidade, minimizando riscos legais.</p>
          </div>

          <div class="arrow">
            <span>&#8673;</span>
          </div>
        </div>
        <div class="card">
          <div class="img" id="tel">
            <img src="../assets/img/home/operador-de-telemarketing.png" alt="">
            <span>Competência</span>
          </div>

          <div class="content">
            <span class="title">Agilidade</span>
            <p class="desc">Conte com a ajuda de uma equipe qualificada para solução dos seus problemas</p>
          </div>

          <div class="arrow">
            <span>&#8673;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-page">
      <div class="about">
        <h4>Sobre o projeto</h4>
        <p>Um sistema de gerenciamento de controle de anomalias para laudos de Inspeção Predial, 
          com funcionalidades-chaves como diferenciações de segmentos específicos de um edifício, 
          cadastro de prestadores de serviço, geração eficiente de ordens de serviço e criação 
          de relatórios detalhados.</p>
      </div>
      <div class="page-github">
        <div class="logo-git">
          <img src="../assets/img/home/github.png" alt="">
          <div class="go-git">
            <h4>GITHUB</h4>
            <a href="https://github.com/B1nary-Devs/JAIA-SOFTWARE/">Acessar Repositório</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import '../assets/css/home/home.css'
import { signOut } from '@/auth/auth';

function sair(){
    signOut()
}

</script>
 
 