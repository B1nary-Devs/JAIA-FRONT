import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { verifyTokenAcesso, verifyTokenEspecial } from '@/auth/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (!verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/')
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/cadPrestador',
      name: 'cadPrestador',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroPrestador.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/consPrestador',
      name: 'consPrestador',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsPrestador.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/cadSegmento',
      name: 'cadSegmento',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroSegmento.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/consSegmento',
      name: 'consSegmento',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsSegmento.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/cadOrdem',
      name: 'cadOrdem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroOrdemServico.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/consOrdem',
      name: 'consOrdem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsOrdemServico.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/cadOrdemServico',
      name: 'cadOrdemServico',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroOrdemServico.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/aprovOrdemServico',
      name: 'aprovOrdemServico',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AprovOrdemServico.vue'),
      beforeEnter (to, from, next) { 
        const user = localStorage.getItem('acesso')// Impede usuários não assinados
        if (user === 'ADMIN') {
          // Usuários do tipo 'admin' têm acesso à rota
          next();
        } else if (user === 'USER') {
          next();
        } else {
          // Usuários não autenticados (guest) ou de outros tipos são redirecionados para uma página de login
          next('/login');
        }
      }
    },
    {
      path: '/aprovOrdemServico2/:dataAbertura/:dataFechamento/:empresa/:status/:segmento/:prestador/:idSegmento/:descricao/:idOrdem:/:idCliente/:idPrestador',
      name: 'aprovOrdemServico2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AprovOrdemServico2.vue'),
      beforeEnter (to, from, next) { 
        const user = localStorage.getItem('acesso')// Impede usuários não assinados
        if (user === 'ADMIN') {
          // Usuários do tipo 'admin' têm acesso à rota
          next();
        } else if (user === 'USER') {
          next();
        } else {
          // Usuários não autenticados (guest) ou de outros tipos são redirecionados para uma página de login
          next('/login');
        }
      }
    },
    {
      path: '/ImpressaoOrdem/:dataAbertura/:dataFechamento/:empresa/:status/:segmento/:prestador/:idSegmento/:descricao/:idOrdem',
      name: 'ImpressaoOrdem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ImpressaoAprovOrdemServico.vue')
    },
    {
      path: '/homeinicial',
      name: 'homeinicial',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeInicial.vue'),
      beforeEnter (to, from, next) { 
        const user = localStorage.getItem('acesso')// Impede usuários não assinados
        if (user === 'ADMIN') {
          // Usuários do tipo 'admin' têm acesso à rota
          next();
        } else if (user === 'USER') {
          next();
        } else {
          // Usuários não autenticados (guest) ou de outros tipos são redirecionados para uma página de login
          next('/login');
        }
      }
    },
    {
      path: '/editOrdem/:dataAbertura/:empresa/:status/:segmento/:prestador/:idSegmento/:descricao/:idOrdem',
      name: 'editOrdem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditOrdemServico.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
    },
    {
      path: '/solicitacoes/:id',
      name: 'solicitacoes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Solicitacoes.vue'),
    },
    {
      path: '/consSolicitacoes',
      name: 'consSolicitacoes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsSolicitacoes.vue'),
      beforeEnter (to, from, next) { 
        const user = localStorage.getItem('acesso')// Impede usuários não assinados
        if (user === 'ADMIN') {
          // Usuários do tipo 'admin' têm acesso à rota
          next();
        } else if (user === 'USER') {
          next();
        } else {
          // Usuários não autenticados (guest) ou de outros tipos são redirecionados para uma página de login
          next('/login');
        }
      }
    },
    {
      path: '/AprovSolicitacoes/:idEmpresa/:nomeEmpresa/:status/:idSegmento/:segmentoNome/:descricao/:cnpj/:idSolicitacao',
      name: 'AprovSolicitacoes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AprovSolicitacoes.vue'),
      beforeEnter (to, from, next) { 
        const user = localStorage.getItem('acesso')// Impede usuários não assinados
        if (user === 'ADMIN') {
          // Usuários do tipo 'admin' têm acesso à rota
          next();
        } else if (user === 'USER') {
          next();
        } else {
          // Usuários não autenticados (guest) ou de outros tipos são redirecionados para uma página de login
          next('/login');
        }
      }
    },
    {
      path: '/novaOrdem',
      name: 'novaOrdem',
      component: () => import('../views/FormularioPerson.vue'),
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (!verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/')
      }
    },
  ]
})

export default router
