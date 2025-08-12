import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import LoginPage from "@/features/Auth/LoginPage.vue";
import Stocks from "@/features/Stocks/Stocks.vue";
import {useAuth} from "@/features/Auth/authStore.ts";
import NotFound from "@/features/App/NotFound.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: LoginPage,
    },

    {
        path: '/stocks',
        component: Stocks,
        meta: {requiresAuth: true},
    }
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from) => {
    const authStore = useAuth();
    if (to.meta.requiresAuth) {
        if (!authStore.isLoggedIn()) {
            return {
                path: '/login',
                query: {redirect: to.fullPath},
            }
        }
    }
})

export default router
