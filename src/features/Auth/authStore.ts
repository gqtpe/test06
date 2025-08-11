import {defineStore} from "pinia";
import testAPI from "@/api/testAPI.ts";
import {useAppStore} from "@/app/appStore.ts";
import type {AxiosError} from "axios";

export const useAuth = defineStore('auth', {
    state: () => ({
        key: null as string|null
    }),
    actions: {
        async logIn(key: string) {
            const appStore = useAppStore()
            try {
                const response = await testAPI.checkKey(key);
                if(response.ok){
                    testAPI._setKey(key)
                    this.key = key
                    localStorage.setItem("token", key)
                    appStore.setAppStatus('Login success')
                }
                return key;
            } catch (error) {
                const e = error as AxiosError<{error: string}>;
                if(e.response?.data.error){
                    appStore.setAppError(e.response.data.error)
                }else{
                    appStore.setAppError(e.message)
                }
            }
        },
        async initAuth(){
            const savedKey = localStorage.getItem("token");
            if (savedKey) {
                const response = await testAPI.checkKey(savedKey);
                if (response.ok) {
                    this.key = savedKey;
                    testAPI._setKey(savedKey);
                }
            }
        },
        isLoggedIn(){
            return !!this.key
        }
    },
})