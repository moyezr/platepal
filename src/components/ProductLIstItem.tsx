import { Product } from "@/types";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Link } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

const ProductListItem = ({ data }: { data: Product }) => (
  <Link href={`/menu/${data.id}`} asChild>
    <Pressable style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: data.image || defaultPizzaImage }}
        alt={data.name}
        resizeMode="contain"
      />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.price}>${data.price.toFixed(2)}</Text>
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    flex: 1,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginTop: "auto",
  },
});
export default ProductListItem;
