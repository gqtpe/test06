import { defineStore } from 'pinia';
import type { DefaultPayload } from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";
import type {Order} from "@/features/Orders/types/types.ts";
import type {PaginationLinks} from "@/api/types.ts";

export const useOrders = defineStore('orders', {
    state: () => ({
        orders: [] as Order[],
        links: {} as PaginationLinks
    }),
    actions: {
        async getOrders(payload: DefaultPayload) {
            try {
                const response = await testAPI.getOrders(payload);
                this.orders = response.data.data;
                this.links = response.data.links;
            } catch (e) {
                console.error(e);
            }
        }
    },
});
