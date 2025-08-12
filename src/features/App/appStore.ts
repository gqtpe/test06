import {defineStore} from 'pinia'
import type {AppStatus, Error} from "@/features/App/types.ts";

export const useAppStore = defineStore('store', {
    state: () => ({
        error: null as Error,
        status: null as AppStatus,
    }),
    actions: {
        setAppStatus(state:AppStatus){
            this.status = state
        },
        setAppError(state:Error){
            this.error = state
        }
    }
})

