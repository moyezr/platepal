import { FlatList, Image, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import products from "../../../../assets/data/products";
import ProductListItem from "@/components/ProductLIstItem";

export default function TabOneScreen() {
  return (
    <FlatList
      //@ts-ignore
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={({ item }) => <ProductListItem data={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({});
