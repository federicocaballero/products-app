import { updtateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-products-by-id";
import { Product } from "@/core/products/interface/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);

  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  //Mutacion
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      updtateCreateProduct({ ...data, id: productIdRef.current }),

    onSuccess: (data: Product) => {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", data.id],
      });
      Alert.alert(
        "Producto guardado",
        `El producto ${data.title} ha sido guardado correctamente`
      );
    },
  });

  //Matener el ID del producto en caso de ser uno nuevo
  return {
    productQuery,
    productMutation,
  };
};
