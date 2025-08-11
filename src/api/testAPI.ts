import axios from "axios";

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
            const response = await instance.get("stocks", {
                params: {
                    key,
                    dateFrom: "2025-08-11",
                    dateTo: "2025-08-11",
                    page: 1,
                    limit: 1,
                },
            });
            console.log(response.data)
            return {ok: true}
    }
}

export default testAPI




