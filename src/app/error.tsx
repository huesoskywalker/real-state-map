"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useEffect } from "react"
import { useContextFilter } from "./_hooks/useContextFilter"
import { useRouter } from "next/navigation"
import useHandleDialog from "./_hooks/useHandleDialog"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const { openDialog, closeDialog } = useHandleDialog()

    const { clearFilters } = useContextFilter()
    const { push } = useRouter()

    useEffect(() => {
        // Log the error to an error reporting service
        clearFilters()
    }, [error])

    return (
        <Dialog open={openDialog} onOpenChange={() => closeDialog("error")}>
            <DialogContent className="h-fit max-w-md px-16 py-8">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h2 className="text-primary">{error.message}</h2>
                    <Button
                        variant={"destructive"}
                        size={"sm"}
                        className="text-primary"
                        onClick={async () => {
                            await Promise.all([push("/"), reset()])
                        }}
                    >
                        Try again
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
