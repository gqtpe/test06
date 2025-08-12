import axios from "axios";
import type {DefaultPayload} from "@/features/App/types.ts";
import type {DefaultResponseType} from "@/api/types.ts";
import type {Order} from "@/features/Orders/types/types.ts";

const protocol = import.meta.env.VITE_APP_TEST_APP_PROTOCOL
const host = import.meta.env.VITE_APP_TEST_APP_HOST
const port = import.meta.env.VITE_APP_TEST_APP_PORT


const instance = axios.create({
    baseURL: `${protocol}://${host}:${port}/api/`,

})

const testAPI = {
    _setKey: (key: string) => {
        instance.interceptors.request.use((config)=>{
            if(!config.params){
                config.params = {}
            }
            config.params.key = key
            return config;
        })
    },
    checkKey: async ( key: string):Promise<{ok: boolean}> =>{
            const date = new Date();
            const formatted = date.toISOString().split('T')[0];
            const response = await instance.get("stocks", {
                params: {
                    key,
                    dateFrom: formatted,
                    dateTo: formatted,
                    page: 1,
                    limit: 1,
                },
            });
            return {ok: true}
    },
    getStocks: async(payload: DefaultPayload)=>{
        return await instance.get("stocks", {params: {...payload}});
    },
    getIncomes: async(payload: DefaultPayload)=>{
        return await instance.get("incomes", {params: {...payload}});
    },
    getOrders: async(payload: DefaultPayload)=>{
        return await instance.get<DefaultResponseType<Order[]>>("orders", {params: {...payload}});
    },
    getSales: async(payload: DefaultPayload)=>{
        return await instance.get("sales", {params: {...payload}});
    },


}

export default testAPI




