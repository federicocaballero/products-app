import { FlatList } from 'react-native'
import React, { useState } from 'react'
import { Product } from '@/core/products/interface/products'
import { ProductCard } from './product-card'
import { useQueryClient } from '@tanstack/react-query'
import { RefreshControl } from 'react-native-gesture-handler'
interface Props {
    products: Product[],
    loadNextPage: () => void
}
const ProductList = ({ products, loadNextPage }: Props) => {
    const [isRefeshing, setIsRefeshing] = useState(false);
    const queryClient = useQueryClient();

    const onPullToRefresh = async () => {
        setIsRefeshing(true)
        await new Promise(resolve => setTimeout(resolve, 200))
        queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })
        setIsRefeshing(false)
    };
    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={product => product.id}
            renderItem={({ item }) => (<ProductCard product={item} />)}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.8}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefeshing} onRefresh={onPullToRefresh} />}
        />
    )
}

export default ProductList