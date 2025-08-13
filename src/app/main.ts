import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './main.css';
import App from '../features/App/App.vue'
import router from '@/app/router.ts'
import {useAuth} from "@/features/Auth/authStore.ts";
import OhVueIcon from "./ohh-vue.ts"

const app = createApp(App)

app.use(createPinia())
const auth = useAuth();
auth.initAuth().then(() => {
    app.use(router);
    app.component('v-icon', OhVueIcon)
    app.mount("#app");
});
