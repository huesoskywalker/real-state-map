// reference code is written like below to avoid the clash in mocha types.
// in most of the cases, simple <reference types="cypress" /> will do.
/// <reference path="../../../node_modules/cypress/types/cy-blob-util.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cy-bluebird.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cy-minimatch.d.ts" />
/// <reference path="../../../node_modules/cypress/types/lodash/index.d.ts" />
/// <reference path="../../../node_modules/cypress/types/sinon/index.d.ts" />
/// <reference path="../../../node_modules/cypress/types/jquery/index.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cypress.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cypress-type-helpers.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cypress-global-vars.d.ts" />

declare namespace Cypress {
    import { ISearchParams } from "@/types/property"
    import { ApiResponseBody } from "cypress-plugin-api"
    interface Chainable<Subject = any> {
        handlePostRequest(searchParams: ISearchParams): Cypress.Chainable
        handleSuccess(response: ApiResponseBody, searchParams: ISearchParams): Cypress.Chainable
        handleError(
            response: ApiResponseBody,
            responseBody: string,
            responseStatus: number,
            responseStatusText: string
        ): Cypress.Chainable
    }
    interface ApplicationWindow {
        // let TS know the application's code will add
        // method window.add with the following signature
        add(a: number, b: number): number
    }
}
