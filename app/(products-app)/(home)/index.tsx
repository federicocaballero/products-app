import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useProducst } from '@/presentation/products/hooks/useProducst';
import ProductList from '@/presentation/products/component/product-lists';
const HomeScreen = () => {
    const { productsQuery, loadNextPage } = useProducst();

    if (productsQuery.isLoading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={30} />
            </View>
        )
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <ProductList products={productsQuery.data?.pages.flatMap(page => page) ?? []} loadNextPage={loadNextPage} /> 
        </View>
    )
}

export default HomeScreen