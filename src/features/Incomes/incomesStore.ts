import { defineStore } from 'pinia';
import type { DefaultPayload } from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";
import type {IncomesItem, StockItem} from "@/api/entities.ts";
import type {PaginationLinks} from "@/api/types.ts";
import showError from "@/utils/error-util.ts";

export const useIncomes = defineStore('incomes', {
    state: () => ({
        data: [] as IncomesItem[],
        links: {} as PaginationLinks,
        total: 0 as number,
    }),
    actions: {
        async getIncomes(payload: DefaultPayload) {
            try {
                const response = await testAPI.getIncomes(payload);
                this.data = response.data.data;
                this.links = response.data.links;
                this.total = response.data.meta.total;
            } catch (error) {
                showError(error);
            }
        }
    },
});
