export interface IFilterOptions {
    defaultMinValue: number
    defaultMaxValue: number
}
export interface IQueryParam {
    query_id: string
}
export interface Filter {
    category: string
    surfaceArea: {
        $lte: number
        $gte: number
    }
    price: {
        $lte: number
        $gte: number
    }
}
