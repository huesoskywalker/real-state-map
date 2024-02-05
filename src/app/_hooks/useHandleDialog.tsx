"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const useHandleDialog = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { back } = useRouter()

    useEffect(() => {
        void setOpenDialog(true)
    }, [])

    const closeDialog = async (type?: "error") => {
        await Promise.all([setOpenDialog(false), back()])
    }
    return { openDialog, closeDialog }
}

export default useHandleDialog
