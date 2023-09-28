/// <reference types="cypress" />

export {}
/// <reference types="cypress" />

import { ISearchParams, Property } from "@/types/property"
import { ApiResponseBody } from "cypress-plugin-api"
import { propertyKeys } from "./keys"

export {}

Cypress.Commands.add(
    "handleError",
    (
        response: ApiResponseBody,
        responseBody: string,
        responseStatus: number,
        responseStatusText: string
    ) => {
        const { body, headers, isOkStatusCode, status, statusText, requestHeaders } = response
        expect(body).to.equal(responseBody)
        expect(headers).to.include({ "content-type": "application/json" })
        expect(status).to.equal(responseStatus)
        expect(isOkStatusCode).to.equal(false)
        expect(statusText).to.equal(responseStatusText)
        expect(requestHeaders).to.include({
            "content-type": "application/json; charset=utf-8",
        })
    }
)

Cypress.Commands.add("handleGetRequest", (searchParams: Partial<ISearchParams>) => {
    const queryString = new URLSearchParams(searchParams)
    cy.api({
        url: `/api/properties?${queryString}`,
        method: "GET",
        headers: { "content-type": "application/json; charset=utf-8" },
        failOnStatusCode: false,
    })
})

Cypress.Commands.add(
    "handleSuccess",
    (response: ApiResponseBody, searchParams: Partial<ISearchParams>) => {
        const { body, headers, isOkStatusCode, status, statusText, requestHeaders } = response
        expect(requestHeaders).to.include({
            "content-type": "application/json; charset=utf-8",
        })
        expect(status).to.equal(200)
        expect(isOkStatusCode).to.equal(true)
        expect(statusText).to.equal("OK")
        expect(headers).to.include({ "content-type": "application/json" })
        expect(body).to.be.an("array")
        body.forEach((property: Property) => {
            expect(property).to.have.all.keys(propertyKeys)
            expect(property._id).to.be.a("string")
            if (searchParams.category) {
                expect(property.category).to.be.a("string").and.equal(searchParams.category)
            } else {
                expect(property.category).to.be.a("string")
            }
            expect(property.description).to.be.a("string")
            expect(property.name).to.be.a("string")
            if (searchParams.price) {
                const splitPrice = searchParams.price.split("&")
                const minPrice = parseInt(splitPrice[0])
                const maxPrice = parseInt(splitPrice[1])
                expect(property.price)
                    .to.be.a("number")
                    .and.to.be.at.least(minPrice)
                    .and.to.be.at.most(maxPrice)
            } else {
                expect(property.price).to.be.a("number")
            }
            if (searchParams.surfaceArea) {
                const splitSurfaceArea = searchParams.surfaceArea.split("&")
                const minSurfaceArea = parseInt(splitSurfaceArea[0])
                const maxSurfaceArea = parseInt(splitSurfaceArea[1])
                expect(property.surfaceArea)
                    .to.be.a("number")
                    .and.to.be.at.least(minSurfaceArea)
                    .and.to.be.at.most(maxSurfaceArea)
            } else {
                expect(property.surfaceArea).to.be.a("number")
            }
            expect(property.location).to.be.a("object").and.to.have.keys("lat", "lng")
        })
    }
)
