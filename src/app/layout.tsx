import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import FilterNav from "./_components/FilterNav"
import { FilterContextProvider } from "./_providers/FilterContextProvider"
import { priceFilterOptions, surfaceAreaFilterOptions } from "@/utils/options"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "HS",
    description: "Technical Test",
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html>
            <body className={`${inter.className} overflow-y-scroll bg-gray-800`}>
                <FilterContextProvider
                    priceFilterOptions={priceFilterOptions}
                    surfaceAreaFilterOptions={surfaceAreaFilterOptions}
                >
                    <FilterNav />
                    <div className="pl-60"> {children} </div>
                </FilterContextProvider>
            </body>
        </html>
    )
}
