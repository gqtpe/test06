import {defineStore} from 'pinia';
import type {DefaultPayload} from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";
import type {SaleItem} from "@/api/entities.ts";
import type {PaginationLinks} from "@/api/types.ts";
import showError from "@/utils/error-util.ts";

export const useSales = defineStore('sales', {
    state: () => ({
        data: [] as SaleItem[],
        links: {} as PaginationLinks,
        total: 0 as number,
    }),
    actions: {
        async getSales(payload: DefaultPayload) {
            try {
                const response = await testAPI.getSales(payload);
                this.data = response.data.data;
                this.links = response.data.links;
                this.total = response.data.meta.total;
            } catch (error) {
                showError(error);
            }
        }
    },
});
