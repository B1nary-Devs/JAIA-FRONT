import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { verifyTokenAcesso } from '@/auth/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter (_, __, next) { // Impede usuários não assinados
        if (verifyTokenAcesso()) {       // de acessar a página Home.
          next();
          return;
        }
        next('/login')
      }
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
    }
  ]
})

export default router
