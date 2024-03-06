import products from "@/assets/data/products";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductLIstItem";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {};

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailsScreen = (props: Props) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{
          uri: product.image || defaultPizzaImage,
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
