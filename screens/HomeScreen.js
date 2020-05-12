import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default function HomeScreen() {
  const [user, setUser] = useState({});
  const signOut = () => firebase.auth().signOut();

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    setUser({ email, displayName });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hi, {user.displayName}</Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 32,
  },
});
