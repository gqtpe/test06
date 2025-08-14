import {onBeforeMount, type Ref, ref, watch} from "vue";
import type {Filters} from "@/features/App/types.ts";
import dayjs from "dayjs";
import {useRoute, useRouter} from "vue-router";


export default function useFetchData(fetch: (payload: Filters) => void, length: number): {
    filters: Ref<Filters>,
    changeLimit: (value: number) => void
} {
    const router = useRouter()
    const route = useRoute()
    const filters = ref<Filters>({
        dateFrom: "",
        dateTo: "",
        limit: 10,
        page: 1,
    });
    onBeforeMount(() => {
            if (!filters.value.dateFrom || !filters.value.dateTo) {
                const today = dayjs();
                filters.value.dateFrom = filters.value.dateFrom || today.clone().subtract(1, "day").format("YYYY-MM-DD");
                filters.value.dateTo = filters.value.dateTo || today.format("YYYY-MM-DD");
            }
            for (const key of Object.keys(route.query)) {
                if (key in filters.value) {
                    const typedKey = key as keyof Filters;
                    const value = route.query[typedKey];
                    if (typedKey === "page" || typedKey === "limit") {
                        filters.value[typedKey] = Number(value) as Filters[typeof typedKey];
                    } else {
                        if (dayjs(String(value), 'YYYY-MM-DD', true).isValid()) {
                            filters.value[typedKey] = String(value) as Filters[typeof typedKey];
                        }
                    }
                }
            }
    });
    const changeLimit = (newValue: number) => {
        filters.value.limit = newValue
    }
    watch(filters, (newValue) => {
        router.push({query: {...newValue}});
        fetch(newValue);
    }, {deep: true});
    return {filters, changeLimit}
}