export type DefaultResponseType<T> = {
    data: T
    links: PaginationLinks
    meta: PaginationMeta;
}

export type PaginationLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};
export type DataErrorType = {
    dateFrom: string;
    dateTo: string;
    limit: string;
    page: string;
}
export type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationMetaLink[];
    path: string;
    per_page: string;
    to: number;
    total: number;
};


export type PaginationMetaLink = {
    url: string | null;
    label: string;
    active: boolean;
};