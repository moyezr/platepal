import Button from "@/components/Button";
import CartListItem from "@/components/CartListItem";
import { useCart } from "@/providers/CartProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Platform, FlatList } from "react-native";

type Props = {};

const CartScreen = (props: Props) => {
  const { items, total } = useCart();

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button text="Checkout" />
      <StatusBar style={Platform.OS == "ios" ? "light" : "auto"} />
    </View>
  );
};
export default CartScreen;
