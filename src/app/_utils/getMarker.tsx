import { departamentoNuevoMarker } from "../../../public/markers/departamentoNuevoMarker"
import { departamentoSeminuevoMarker } from "../../../public/markers/departamentoSeminuevoMarker"
import { parcelaMarker } from "../../../public/markers/parcelaMarker"

export const getMarker = (type: string): string | undefined => {
    switch (type) {
        case "Departamento Nuevo":
            return departamentoNuevoMarker
        case "Departamento Seminuevo":
            return departamentoSeminuevoMarker
        case "Parcela":
            return parcelaMarker
        default:
            return undefined
    }
}
