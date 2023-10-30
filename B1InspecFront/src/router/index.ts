import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cadPrestador',
      name: 'cadPrestador',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroPrestador.vue')
    },
    {
      path: '/consPrestador',
      name: 'consPrestador',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsPrestador.vue')
    },
    {
      path: '/cadSegmento',
      name: 'cadSegmento',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroSegmento.vue')
    },
    {
      path: '/consSegmento',
      name: 'consSegmento',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsSegmento.vue') 
    },
    {
      path: '/cadOrdem',
      name: 'cadOrdem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroOrdemServico.vue')
    },
    {
      path: '/consOrdem',
      name: 'consOrdem',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConsOrdemServico.vue')
    },
    {
      path: '/cadOrdemServico',
      name: 'cadOrdemServico',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CadastroOrdemServico.vue')
    },
    {
      path: '/aprovOrdemServico',
      name: 'aprovOrdemServico',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AprovOrdemServico.vue')
    },
    {
      path: '/aprovOrdemServico2/:dataAbertura/:empresa/:status/:segmento/:prestador/:descricao',
      name: 'aprovOrdemServico2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AprovOrdemServico2.vue')
    }
  ]
})

export default router
