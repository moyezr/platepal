import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      {isAdmin && (
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
      )}
      {!session && (
        <Link href={"/sign-in"} asChild>
          <Button text="Sign In" />
        </Link>
      )}
      {session && (
        <Button
          text="Sign Out"
          onPress={async () => await supabase.auth.signOut()}
        />
      )}
    </View>
  );
};

export default index;
