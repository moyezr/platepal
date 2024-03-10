import { ActivityIndicator, FlatList, Image, StyleSheet, Text } from "react-native";
import ProductListItem from "@/components/ProductLIstItem";
import { useProductList } from "@/api/products";

export default function TabOneScreen() {

  const { data, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }


  return (
    <FlatList
      //@ts-ignore
      keyExtractor={(item) => item.id}
      data={data}
      renderItem={({ item }) => <ProductListItem data={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({});
