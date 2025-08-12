export type Order = {
    g_number: string;
    date: string; //date
    last_change_date: string; // date
    supplier_article: string;
    tech_size: string;
    barcode: number;
    total_price: string;
    discount_percent: number;
    warehouse_name: string;
    oblast: string;
    income_id: number;
    odid: string;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    is_cancel: boolean;
    cancel_dt: string | null;
};
export type OrdersPageFilters = {
    dateFrom: string
    dateTo: string
    page: number
    limit: number
}