import { useContext } from "react"
import FilterContext from "../_contexts/FilterContext"

export const useContextFilter = () => useContext(FilterContext)
