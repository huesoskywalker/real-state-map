import React from "react"

const PropertyData = ({
    name,
    description,
    price,
    surfaceArea,
}: {
    name: string
    description: string
    price: number
    surfaceArea: number
}) => {
    return (
        <div className="max-w-xs p-4">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <div className="mt-4">
                <span className="text-sm font-semibold text-gray-700">Price:</span>
                <span className="text-sm text-gray-700 ml-2">${price}</span>
            </div>
            <div className="mt-2">
                <span className="text-sm font-semibold text-gray-700">Surface Area:</span>
                <span className="text-sm text-gray-700 ml-2">{surfaceArea} m²</span>
            </div>
        </div>
    )
}

export default PropertyData
