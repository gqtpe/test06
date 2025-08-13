export type AppStatus = string|null
export type Error = null|string
export type Loading = 'idle'|'fulfilled'|'rejected'|'pending'

export type DefaultPayload = {
    dateFrom: string
    dateTo: string
    page: number
    limit: number
}
export type Filters = {
    dateFrom: string
    dateTo: string
    page: number
    limit: number
}