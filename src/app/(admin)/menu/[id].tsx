import { useProduct } from "@/api/products";
import products from "@/assets/data/products";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductLIstItem";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {};

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailsScreen = (props: Props) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();

  const { data: product, error, isLoading } = useProduct(id as string);
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
