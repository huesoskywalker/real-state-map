/* global window */
/// <reference path="../types.d.ts" />

import { ISearchParams } from "@/types/property"
import { ApiResponseBody } from "cypress-plugin-api"

export {}

describe("Test the REST API endpoint with no search parameters, with them and handle error when there are no properties or bad requests", () => {
    it("Should show all properties when no search parameters are provided", () => {
        const searchParams: Partial<ISearchParams> = {}
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            cy.handleSuccess(response, searchParams)
        })
    })
    it("Should show all matching properties when Category and Price parameters are provided", () => {
        const category: string = "Departamento Nuevo"
        const minPrice: number = 50000
        const maxPrice: number = 100000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            price: `${minPrice}&${maxPrice}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            cy.handleSuccess(response, searchParams)
        })
    })
    it("Should show all matching properties when Category and SurfaceArea parameters are provided", () => {
        const category: string = "Departamento Nuevo"
        const minSurfaceArea: number = 800
        const maxSurfaceArea: number = 2100
        const searchParams: Partial<ISearchParams> = {
            category: category,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            cy.handleSuccess(response, searchParams)
        })
    })
    it("Should show all matching properties when Price and SurfaceArea parameters are provided", () => {
        const minPrice: number = 77000
        const maxPrice: number = 110000
        const minSurfaceArea: number = 700
        const maxSurfaceArea: number = 1900
        const searchParams: Partial<ISearchParams> = {
            price: `${minPrice}&${maxPrice}`,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            cy.handleSuccess(response, searchParams)
        })
    })
    it("Should show all matching properties when all parameters are provided", () => {
        const category: string = "Departamento Nuevo"
        const minPrice: number = 60000
        const maxPrice: number = 900000
        const minSurfaceArea: number = 1000
        const maxSurfaceArea: number = 2400

        const searchParams: ISearchParams = {
            category: category,
            price: `${minPrice}&${maxPrice}`,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }

        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            cy.handleSuccess(response, searchParams)
        })
    })

    it("Should handle error when there are no properties matching criteria", () => {
        const category: string = "Parcela"
        const minPrice: number = 100
        const maxPrice: number = 500
        const minSurfaceArea: number = 100
        const maxSurfaceArea: number = 200
        const searchParams: ISearchParams = {
            category: category,
            price: `${minPrice}&${maxPrice}`,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "No properties were found matching criteria"
            cy.handleError(response, resBody, 404, "Not Found")
        })
    })
    it("Should handle error when there is an extra value is the price parameters", () => {
        const category: string = "Parcela"
        const minPrice: number = -50000
        const maxPrice: number = 77000
        const extraPriceParam: number = 110000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            price: `${minPrice}&${maxPrice}&${extraPriceParam}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid price parameter"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when minPrice value is a negative number", () => {
        const category: string = "Parcela"
        const minPrice: number = -50000
        const maxPrice: number = 77000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            price: `${minPrice}&${maxPrice}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid price value"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when maxPrice value is a negative number", () => {
        const category: string = "Departamento Nuevo"
        const minPrice: number = 55000
        const maxPrice: number = -90000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            price: `${minPrice}&${maxPrice}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid price value"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when minPrice is greater than maxPrice", () => {
        const category: string = "Departamento Nuevo"
        const minPrice: number = 95000
        const maxPrice: number = 70000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            price: `${minPrice}&${maxPrice}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid price value"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when there is an extra value in the surfaceArea parameter", () => {
        const category: string = "Parcela"
        const minSurfaceArea: number = -50000
        const maxSurfaceArea: number = 77000
        const extraSurfaceAreaParam: number = 113000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}&${extraSurfaceAreaParam}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid surfaceArea parameter"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when minSurfaceArea value is a negative number", () => {
        const category: string = "Parcela"
        const minSurfaceArea: number = -50000
        const maxSurfaceArea: number = 77000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid surfaceArea value"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when maxSurfaceArea value is a negative number", () => {
        const category: string = "Departamento Seminuevo"
        const minSurfaceArea: number = 60000
        const maxSurfaceArea: number = -97000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid surfaceArea value"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
    it("Should handle error when minSurfaceArea is greater than maxSurfaceArea ", () => {
        const category: string = "Parcela"
        const minSurfaceArea: number = 60000
        const maxSurfaceArea: number = -97000
        const searchParams: Partial<ISearchParams> = {
            category: category,
            surfaceArea: `${minSurfaceArea}&${maxSurfaceArea}`,
        }
        cy.handlePostRequest(searchParams).then((response: ApiResponseBody) => {
            const resBody = "Invalid surfaceArea value"
            cy.handleError(response, resBody, 400, "Bad Request")
        })
    })
})
