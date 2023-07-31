import React from "react"
import { office } from "../../utils/data"

const OfficeData = ({}: {}) => {
    return (
        <div className="max-w-xs p-4">
            <h2 className="text-xl font-semibold text-gray-800">{office.name}</h2>
            <div className="mt-4">
                <span className="text-sm font-semibold text-gray-700">Direction:</span>
                <span className="text-sm text-gray-700 ml-2">{office.direction}</span>
            </div>
            <div className="mt-2">
                <span className="text-sm font-semibold text-gray-700">Telephone:</span>
                <span className="text-sm text-gray-700 ml-2">{office.telephone}</span>
            </div>
        </div>
    )
}

export default OfficeData
