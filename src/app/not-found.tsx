"use client"
import React from "react"
import { useContextFilter } from "./_hooks/useContextFilter"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import useHandleDialog from "./_hooks/useHandleDialog"

const NotFound = () => {
    const { openDialog, closeDialog } = useHandleDialog()
    const { clearFilters } = useContextFilter()

    return (
        <Dialog open={openDialog} onOpenChange={() => closeDialog("error")}>
            <DialogContent className="h-fit bg-background max-w-md px-16 py-8">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h2 className="text-foreground">No properties were found matching criteria</h2>
                    <Button
                        variant={"destructive"}
                        size={"sm"}
                        className="text-destructive-foreground"
                        onClick={() => {
                            clearFilters()
                            closeDialog()
                        }}
                    >
                        Try again
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NotFound
