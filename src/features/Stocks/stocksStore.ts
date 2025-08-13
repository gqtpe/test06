import {defineStore} from 'pinia';
import type {DefaultPayload} from "@/features/App/types.ts";
import testAPI from "@/api/testAPI.ts";
import type {StockItem} from "@/api/entities.ts";
import type {PaginationLinks} from "@/api/types.ts";
import showError from "@/utils/error-util.ts";

export const useStocks = defineStore('stocks', {
    state: () => ({
        data: [] as StockItem[],
        links: {} as PaginationLinks,
        total: 0 as number,
        /*        error: {
                    dateFrom: '',
                    dateTo: '',
                    limit: '',
                    page: '',
                } as DataErrorType,*/
    }),
    actions: {
        async getStocks(payload: DefaultPayload) {
            try {
                const response = await testAPI.getStocks(payload);
                this.data = response.data.data;
                this.links = response.data.links;
                this.total = response.data.meta.total;
            } catch (error) {
                showError(error);
            }
        }
    },
});
