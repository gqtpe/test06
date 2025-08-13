import type {AxiosError} from "axios";
import {useAppStore} from "@/features/App/appStore.ts";
type Error = {error?: string,dateFrom:string,dateTo: string, limit: string, page:string}
export default function showError (error: unknown) {
    const appStore = useAppStore()
    const e = error as AxiosError<Error>;
    if(e.response?.data){
        if(e.response.data.error){
            appStore.setAppError(e.response.data.error)
            return;
        }
        if(Object.keys(e.response.data).length){
            for(let error in e.response.data){
                appStore.setAppError(e.response.data[error as keyof Error] || null)
            }
        }


    }else{
        appStore.setAppError(e.message)
    }
}