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
          <RouterLink to="/novaOrdem">
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
import { signOut } from '@/auth/auth';

function sair(){
    signOut()
}

</script>
 
<style scoped>

.home-page{
    width: 100%;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
}

.top-page{
    background-color: rgb(13, 14, 13);
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
}
 
.top-page-links{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
}
 
.logo-link{
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
}
 
.logo-link img{
    width: 180px;
    margin-left: 30px;
    margin-top: 3px;
}
 
.page-link{
    display: flex;
    align-items: center;
    margin-right: 20px;
    color: #F5F5F5;
}
 
.link-home{
    width: 80px;
    border: #ffffff solid 2px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    transition: 0.4s ease-in;
}
 
.link-home p{
    color: #F5F5F5;
    transition: 0.4s ease-in-out;
}

.link-home:hover{
    background-color: #ffffff;
}

.link-home:hover p{
    color: #000000;
}

.link-alternativo p{
    color: #F5F5F5;
    transition: 0.4s all;
    border-bottom: 2px solid transparent;
}

.link-alternativo p:hover{
    border-bottom: 2px solid #F5F5F5;
}
 
.top-page-body{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
 
.top-texts{
    width: 600px;
    display: flex;
    flex-direction: column;
}
 
.top-texts h4{
    letter-spacing: 4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #1cb4d6eb;
    margin-bottom: 15px;
}
 
.top-texts h1{
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    color: #fff;
    letter-spacing: 2px;
    margin-right: 20px;
}
 
.top-texts p{
    margin-top: 15px;
    font-family: 'Montserrat', sans-serif;
    color: #ffffff;
    font-weight: bold;
    font-size: 15px;
    letter-spacing: 2px;
}
 
.top-page .circle-top{
    background-color: #1cb4d6eb;
    width: 230px;
    height: 230px;
    border-radius: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
}
 
.top-page .circle-top img{
    width: 60px;
}

.home-page-body{
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
}

.page-body-title{
    margin-top: 20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.page-body-title h1{
    color: #050505;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}

.group-cards{
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 40px;
    height: 700px;
}
 
.card {
    border-radius: 16px;
    background-color: #030303;
    box-shadow: rgba(14, 13, 13, 0.63) 0px 5px 15px;
    cursor: pointer;
    width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all .5s;
    margin-right: 30px;
}
 
.card:hover {
    background-image: linear-gradient(#111111e5, #111113);
}
 
.card .img {
    background-color: rgb(255, 255, 255);
    width: 360px;
    display: flex;
    justify-content:space-around;
    align-items: center;
    flex-direction: column;
    height: 200px;
    background-size: cover;
    background-position: center;
    transition: all .5s;
    z-index: 2;
    position: relative;
}

.card .img img{
    margin-top: 5px;
    width: 120px;
}
 
.card .img span {
    margin-top: 10px;
    text-transform: uppercase;
    font-size: 18px;
    transition: all .5s;
    font-family: 'Montserrat', sans-serif;
    color: #000000;
    font-weight: bold;
}
 
.card:hover .img {
    width: 430px;
    opacity: 1;
}
 
.card .content {
    padding: 0px 20px;
    height: 0;
    opacity: 0;
    transition: all .5s;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    transform: translateY(30px);
}
 
.card:hover .content {
    height: 110px;
    padding: 20px;
    opacity: 1;
    transform: translateY(0);
}
 
.card .content p {
    margin: 0;
    color: #F5F5F5;
}
 
.card .content .title {
    font-size: 20px;
    font-weight: 600;
    color: #F5F5F5;
}
 
.card .content .desc {
    font-size: 14px;
    font-weight: 100;
    opacity: .8;
    margin-top: 8px;
}
 
.card .arrow {
    padding: 15px;
    transform: rotate(-180deg);
    transition: all .5s;
}
 
.card:hover .arrow {
    transform: rotate(0);
}
 
.card .arrow span {
    font-size: 24px;
    color: #F5F5F5;
}

.footer-page{
    width: 100%;
    height: 300px;
    display: flex;
    background-color:#030303;
}

.footer-page .about{
    width: 45%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.footer-page .about h4{
    color: rgb(255, 255, 255);
    margin-top: 10px;
    font-size: 35px;
    letter-spacing: 2px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
}

.footer-page .about p{
    margin-top: 15px;
    font-size: 18px;
    color: #F5F5F5;
    margin-left: 10px;
    letter-spacing: 2px;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
}

.page-github{
    width: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.logo-git{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.logo-git img{
    width: 180px;
}

.go-git{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.go-git h4{
    color: #F5F5F5;
    font-size: 60px;
    font-family: 'Montserrat', sans-serif;
    margin-left: 30px;
    letter-spacing: 5px;
}

.go-git a{
    border: 1px #F5F5F5 solid;
    border-radius: 50px;
    transition: ease-in 0.5s;
    padding: 10px;
    margin-top: 15px;
    color: #F5F5F5;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    margin-left: 10px;
    letter-spacing: 2px;
}

.go-git a:hover{
    background-color: #ffffff;
    color: #000000;
    font-weight: bold;
    border: 1px transparent solid;
}

</style>
 