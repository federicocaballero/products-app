import { getProductById } from '@/core/products/actions/get-products-by-id'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export const useProduct = (productId: string) => {

    const productQuery = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60
    })

    //Mutacion

    //Matener el ID del producto en caso de ser uno nuevo
    return {
        productQuery
    }
}
