import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const SignInScreenF = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign In" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="johndoe@gmail.com" style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <Button text="Sign In" />

      <Link href={"/sign-up"} style={styles.textButton}>
        Create an Account
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreenF;
