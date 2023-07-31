export class CustomError extends Error {
    status: number
    data: string

    constructor(status: number, data: string) {
        super(data)
        this.status = status
        this.data = data
    }
}
