import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
interface Props {
    images: string[];
}
const ProductImages = ({ images }: Props) => {

    if (images.length === 0) {
        return (<View>
            <Image source={require('../../../assets/images/no-product-image.png')} style={{ width: 300, height: 300 }} />
        </View>
        )
    }
    return (
        <FlatList
            data={images}
            keyExtractor={image => image}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
                <Image source={{ uri: item }} style={{ width: 300, height: 300, marginHorizontal: 10, borderRadius: 6 }} />
            )}
        />
    )
}

export default ProductImages