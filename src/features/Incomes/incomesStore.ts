import { defineStore } from 'pinia';
import type { DefaultPayload } from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";

export const useIncomes = defineStore('incomes', {
    state: () => ({
        incomes: null as any
    }),
    actions: {
        async getIncomes(payload: DefaultPayload) {
            try {
                const response = await testAPI.getIncomes(payload);
                this.incomes = response.data;
            } catch (e) {
                console.error(e);
            }
        }
    },
});
