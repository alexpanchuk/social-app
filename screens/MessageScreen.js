import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MessageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
