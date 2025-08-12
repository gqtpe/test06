import { defineStore } from 'pinia';
import type { DefaultPayload } from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";

export const useStocksStore = defineStore('stocks', {
    state: () => ({
        stocks: null as any
    }),
    actions: {
        async getStocks(payload: DefaultPayload) {
            try {
                const response = await testAPI.getStocks(payload);
                this.stocks = response.data;
            } catch (e) {
                console.error(e);
            }
        }
    },
});
