import { FlatList, Image, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import products from "../../../assets/data/products";
import ProductListItem from "@/components/ProductLIstItem";



export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        //@ts-ignore
        keyExtractor={(item) => item.id}
        data={products}
        renderItem={({ item }) => <ProductListItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
  },

});
