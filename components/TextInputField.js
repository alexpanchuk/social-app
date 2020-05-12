import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function TextInputField({ style, label, onChange, value }) {
  return (
    <View style={style}>
      <Text style={styles.inputTitle}>{label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputTitle: {
    color: "#8f8f9e",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8f8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
    color: "#161f3d",
  },
});
