import { useState } from "react"

export function useShowOffice(): {
    showOffice: boolean
    toggleShowOffice: () => void
} {
    const [showOffice, setShowOffice] = useState<boolean>(false)

    const toggleShowOffice = () => {
        setShowOffice(!showOffice)
    }

    return { showOffice, toggleShowOffice }
}
