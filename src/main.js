import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

// Create the Vue app, use the router, and mount it to the DOM
createApp(App).use(router).mount('#app')
