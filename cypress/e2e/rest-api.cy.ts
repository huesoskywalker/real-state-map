/* global window */
/// <reference path="../types.d.ts" />

import { Property } from "@/types/property"
import { propertyKeys } from "../support/keys"

export {}

describe("Test the REST API endpoint with no search parameters, with them and handle error when there are no properties", () => {
    it("Should show all properties when no search parameters are provided", () => {
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({ searchParams: {} }),
        }).then((response) => {
            const { body, headers, isOkStatusCode, status, statusText, requestHeaders } = response
            console.log(body)
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
                expect(property.category).to.be.a("string")
                expect(property.description).to.be.a("string")
                expect(property.name).to.be.a("string")
                expect(property.price).to.be.a("number")
                expect(property.surfaceArea).to.be.a("number")
                expect(property.location).to.be.a("object").and.to.have.keys("lat", "lng")
            })
        })
    })
    it("Should handle errors when there are no properties", () => {
        const category: string = "Parcela"
        const priceMinimo: number = 100
        const priceMaximo: number = 500
        const surfaceAreaMinima: number = 100
        const surfaceAreaMaxima: number = 200
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                searchParams: {
                    category: category,
                    price: priceMinimo + "&" + priceMaximo,
                    surfaceArea: surfaceAreaMinima + "&" + surfaceAreaMaxima,
                },
            }),
        }).then((response) => {
            expect(response.body.status).to.equal(400)
            expect(response.body.statusText).to.equal("No properties found")
        })
    })

    it("Should show all properties when Category and Price parameters are provided", () => {
        const category: string = "Departamento Nuevo"
        const priceMinimo: number = 50000
        const priceMaximo: number = 100000
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                searchParams: {
                    category: category,
                    price: priceMinimo + "&" + priceMaximo,
                },
            }),
        }).then((response) => {
            const { body, headers, isOkStatusCode, status, statusText, requestHeaders } = response
            console.log(body)
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
                expect(property.category).to.be.a("string").and.equal("Departamento Nuevo")
                expect(property.description).to.be.a("string")
                expect(property.name).to.be.a("string")
                expect(property.price)
                    .to.be.a("number")
                    .and.to.be.at.least(priceMinimo)
                    .and.to.be.at.most(priceMaximo)
                expect(property.surfaceArea).to.be.a("number")
                expect(property.location).to.be.a("object").and.to.have.keys("lat", "lng")
            })
        })
    })
    it("Should show all properties when all parameters are provided", () => {
        const category: string = "Departamento Nuevo"
        const priceMinimo: number = 60000
        const priceMaximo: number = 900000
        const surfaceAreaMinima: number = 1000
        const surfaceAreaMaxima: number = 2400
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                searchParams: {
                    category: category,
                    price: priceMinimo + "&" + priceMaximo,
                    surfaceArea: surfaceAreaMinima + "&" + surfaceAreaMaxima,
                },
            }),
        }).then((response) => {
            const { body, headers, isOkStatusCode, status, statusText, requestHeaders } = response
            console.log(body)
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
                expect(property.category).to.be.a("string").and.equal("Departamento Nuevo")
                expect(property.description).to.be.a("string")
                expect(property.name).to.be.a("string")
                expect(property.price)
                    .to.be.a("number")
                    .and.to.be.at.least(priceMinimo)
                    .and.to.be.at.most(priceMaximo)
                expect(property.surfaceArea)
                    .to.be.a("number")
                    .and.to.be.at.least(surfaceAreaMinima)
                    .and.to.be.at.most(surfaceAreaMaxima)
                expect(property.location).to.be.a("object").and.to.have.keys("lat", "lng")
            })
        })
    })
})
