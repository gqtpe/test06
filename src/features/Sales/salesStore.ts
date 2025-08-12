import { defineStore } from 'pinia';
import type { DefaultPayload } from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";

export const useSales = defineStore('sales', {
    state: () => ({
        sales: null as any
    }),
    actions: {
        async getSales(payload: DefaultPayload) {
            try {
                const response = await testAPI.getSales(payload);
                this.sales = response.data;
            } catch (e) {
                console.error(e);
            }
        }
    },
});
