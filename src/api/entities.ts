export type OrderItem = {
    g_number: string;
    date: string; // "YYYY-MM-DD"
    last_change_date: string;// "YYYY-MM-DD"
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
export type SaleItem = {
    g_number: string;
    date: string;// "YYYY-MM-DD"
    last_change_date: string;
    supplier_article: string;
    tech_size: string;
    barcode: number;
    total_price: string;
    discount_percent: string;
    is_supply: boolean;
    is_realization: boolean;
    promo_code_discount: string | null;
    warehouse_name: string;
    country_name: string;
    oblast_okrug_name: string;
    region_name: string;
    income_id: number;
    sale_id: string;
    odid: string | null;
    spp: string;
    for_pay: string;
    finished_price: string;
    price_with_disc: string;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    is_storno: boolean | null;
};
export type StockItem = {
    date: string; // "YYYY-MM-DD"
    last_change_date: string | null;// "YYYY-MM-DD"
    supplier_article: string;
    tech_size: string;
    barcode: number;
    quantity: number;
    is_supply: boolean | null;
    is_realization: boolean | null;
    quantity_full: number | null;
    warehouse_name: string;
    in_way_to_client: number | null;
    in_way_from_client: number | null;
    nm_id: number;
    subject: string;
    category: string;
    brand: string;
    sc_code: number;
    price: string;
    discount: string;
};
export type IncomesItem = {
    income_id: number;
    number: string;
    date: string; // "YYYY-MM-DD"
    last_change_date: string; // "YYYY-MM-DD"
    supplier_article: string;
    tech_size: string;
    barcode: number;
    quantity: number;
    total_price: string;
    date_close: string;
    warehouse_name: string;
    nm_id: number;
}
export type EntitiesType = 'stocks'|'incomes'|'sales'|'orders';
export type Entities = (OrderItem|StockItem|SaleItem|IncomesItem)[];

