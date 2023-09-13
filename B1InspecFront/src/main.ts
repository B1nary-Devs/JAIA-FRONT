import './assets/css/cadastroCategoria/cadastroCategoria.css'
import './assets/css/cadastroCategoria/checklist.css'
//import './assets/css/header/header.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
