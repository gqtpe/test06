import {defineStore} from 'pinia';
import type {DefaultPayload} from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";
import type {PaginationLinks} from "@/api/types.ts";
import type {OrderItem} from "@/api/entities.ts";
import showError from "@/utils/error-util.ts";

export const useOrders = defineStore('orders', {
    state: () => ({
        data: [] as OrderItem[],
        links: {} as PaginationLinks,
        total: 0 as number,
    }),
    actions: {
        async getOrders(payload: DefaultPayload) {
            try {
                const response = await testAPI.getOrders(payload);
                this.data = response.data.data;
                this.links = response.data.links;
                this.total = response.data.meta.total;
            } catch (error) {
                showError(error);
            }
        }
    },
});
