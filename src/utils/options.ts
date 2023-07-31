import { IFilterOptions, IQueryParam } from "../types/filter"

export const surfaceAreaFilterOptions: IFilterOptions = {
    defaultMinValue: 0,
    defaultMaxValue: 2500,
}

export const priceFilterOptions: IFilterOptions = {
    defaultMinValue: 0,
    defaultMaxValue: 120000,
}
export const priceQueryParam: IQueryParam = {
    query_id: "price",
}
export const categoryQueryParam: IQueryParam = {
    query_id: "category",
}

export const surfaceAreaQueryParam: IQueryParam = {
    query_id: "surfaceArea",
}
