import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductLIstItem";
import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id: idString } = useLocalSearchParams();
  const id = typeof idString === "string" ? idString : idString[0];

  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: updatingProduct } = useProduct(id);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setPrice(updatingProduct.image as string);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName("");
    setPrice("");
  };
  const router = useRouter();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateInput = (): boolean => {
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }

    // @ts-ignore
    if (isNaN(price)) {
      setError("Price is not a number");
      return false;
    }
    setError("");

    return true;
  };

  const onCreate = () => {
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onUpdate = () => {
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const onSubmit = () => {
    if (!validateInput()) {
      return;
    }
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)")
      }
    });
  };
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Edit Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select an image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      ></TextInput>
      <Text style={styles.label}>Price {`($)`}</Text>
      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={(txt) => setPrice(txt)}
      ></TextInput>

      <Text style={{ color: "red" }}>{error}</Text>

      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Button
          text="Delete"
          style={styles.textButton}
          onPress={confirmDelete}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
