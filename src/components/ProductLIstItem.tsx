import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

type ProductItem = {
  name: string;
  image: string;
  id: string;
  price: number;
};
const ProductListItem = ({ data }: { data: ProductItem }) => (
  <View>
    <Image style={styles.image} source={{ uri: data.image }} alt={data.name} />
    <Text style={styles.title}>{data.name}</Text>
    <Text style={styles.price}>${data.price.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
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
