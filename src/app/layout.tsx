import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import FilterNav from "./components/FilterNav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Propital",
    description: "Technical Test",
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html>
            <body className={`${inter.className} overflow-y-scroll bg-gray-900`}>
                <FilterNav />
                <div className="xl:pl-48 lg:pl-40">
                    <div className="mx-auto max-w-4xl px-2 pt-20 pb-8 lg:py-8 lg:px-8">
                        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                            <div className="rounded-lg bg-gray-800 p-3.5 lg:p-6">{children}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
