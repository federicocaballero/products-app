import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ProductImages from "@/presentation/products/component/ProductImages";
import ThemeBottonGroup from "@/presentation/theme/components/ThemeBottonGroup";
import ThemeButton from "@/presentation/theme/components/ThemeButton";
import { Formik } from "formik";
import { Size } from "@/core/products/interface/products";

const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery, productMutation } = useProduct(`${id}`);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={24} color="white" />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href={"/(products-app)/(home)"} />;
  }

  const product = productQuery.data;

  return (
    <Formik
      initialValues={product}
      onSubmit={(productLike) => productMutation.mutate(productLike)}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <ProductImages images={values.images} />
            <ThemedView style={{ marginHorizontal: 10, marginTop: 5 }}>
              <ThemedTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemedTextInput
                placeholder="Descripcion"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>
            <ThemedView style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <ThemeBottonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOption={product.sizes}
                onSelect={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(
                    selectedSize as Size
                  )
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];
                  setFieldValue("sizes", newSizesValue);
                }}
              />
              <ThemeBottonGroup
                options={["kid", "men", "women", "Unisex"]}
                selectedOption={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue("gender", selectedOption)
                }
              />

              {/* Botton para guardar */}
              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 50,
                  marginTop: 20,
                  backgroundColor: "skyblue",
                }}
              >
                <ThemeButton
                  icon="save-outline"
                  onPress={() => handleSubmit()}
                  textButton="Guardar"
                />
              </View>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductScreen;
