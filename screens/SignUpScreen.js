// 10:36

import React, { useReducer, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { merge } from "ramda";
import * as firebase from "firebase";
import TextInputField from "../components/TextInputField";

export default function SignUpScreen({ navigation }) {
  const [{ name = "", email = "", password = "" }, setFormData] = useReducer(
    merge,
    {}
  );
  const [errorMessage, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log(name, email, password, confirm);
    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) =>
        userCredentials.user.updateProfile({
          displayName: name,
        })
      )
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Wellcome!{`\r\n`} Sign up to get started!
      </Text>
      <View style={styles.error}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>

      <View style={styles.form}>
        <TextInputField
          label="Name"
          onChange={(name) => setFormData({ name })}
          value={name}
        />
        <TextInputField
          style={{ marginTop: 32 }}
          label="Email address"
          onChange={(email) => setFormData({ email })}
          value={email}
        />
        <TextInputField
          style={{ marginTop: 32 }}
          label="Password"
          onChange={(password) => setFormData({ password })}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.buttonSignIn} onPress={handleSubmit}>
        <Text style={styles.signInText}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.question}>
          Already have an account? <Text style={styles.loginText}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  error: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  errorMessage: {
    color: "#e9446a",
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  buttonSignIn: {
    marginHorizontal: 30,
    backgroundColor: "#e9446a",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    color: "white",
  },
  buttonSignUp: {
    alignSelf: "center",
    marginTop: 32,
  },
  question: {
    color: "#414959",
    fontSize: 13,
  },
  loginText: {
    fontWeight: "500",
    color: "#e9446a",
  },
});
