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
                expect(property.categoria).to.be.a("string")
                expect(property.descripcion).to.be.a("string")
                expect(property.nombre).to.be.a("string")
                expect(property.precio).to.be.a("number")
                expect(property.superficie).to.be.a("number")
                expect(property.ubicacion).to.be.a("object").and.to.have.keys("lat", "lng")
            })
        })
    })
    it("Should handle errors when there are no properties", () => {
        const categoria: string = "Parcela"
        const precioMinimo: number = 100
        const precioMaximo: number = 500
        const superficieMinima: number = 100
        const superficieMaxima: number = 200
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                searchParams: {
                    categoria: categoria,
                    precio: precioMinimo + "&" + precioMaximo,
                    superficie: superficieMinima + "&" + superficieMaxima,
                },
            }),
        }).then((response) => {
            expect(response.body.status).to.equal(400)
            expect(response.body.statusText).to.equal("No properties found")
        })
    })

    it("Should show all properties when Category and Price parameters are provided", () => {
        const categoria: string = "Departamento Nuevo"
        const precioMinimo: number = 50000
        const precioMaximo: number = 100000
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                searchParams: {
                    categoria: categoria,
                    precio: precioMinimo + "&" + precioMaximo,
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
                expect(property.categoria).to.be.a("string").and.equal("Departamento Nuevo")
                expect(property.descripcion).to.be.a("string")
                expect(property.nombre).to.be.a("string")
                expect(property.precio)
                    .to.be.a("number")
                    .and.to.be.at.least(precioMinimo)
                    .and.to.be.at.most(precioMaximo)
                expect(property.superficie).to.be.a("number")
                expect(property.ubicacion).to.be.a("object").and.to.have.keys("lat", "lng")
            })
        })
    })
    it("Should show all properties when all parameters are provided", () => {
        const categoria: string = "Departamento Nuevo"
        const precioMinimo: number = 60000
        const precioMaximo: number = 900000
        const superficieMinima: number = 1000
        const superficieMaxima: number = 2400
        cy.api({
            url: "/api/properties",
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                searchParams: {
                    categoria: categoria,
                    precio: precioMinimo + "&" + precioMaximo,
                    superficie: superficieMinima + "&" + superficieMaxima,
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
                expect(property.categoria).to.be.a("string").and.equal("Departamento Nuevo")
                expect(property.descripcion).to.be.a("string")
                expect(property.nombre).to.be.a("string")
                expect(property.precio)
                    .to.be.a("number")
                    .and.to.be.at.least(precioMinimo)
                    .and.to.be.at.most(precioMaximo)
                expect(property.superficie)
                    .to.be.a("number")
                    .and.to.be.at.least(superficieMinima)
                    .and.to.be.at.most(superficieMaxima)
                expect(property.ubicacion).to.be.a("object").and.to.have.keys("lat", "lng")
            })
        })
    })
})
