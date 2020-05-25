// 10:36

import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredentials) =>
        userCredentials.user.updateProfile({
          displayName: name.trim(),
        })
      )
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require("../assets/authHeader.png")}
        style={styles.headerImage}
      />
      <Image
        source={require("../assets/authFooter.png")}
        style={styles.footerImage}
      />
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-round-back" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>
          Wellcome!{`\r\n`} Sign up to get started!
        </Text>
        <TouchableOpacity style={styles.avatar}>
          <Ionicons
            name="ios-add"
            size={40}
            color="#FFF"
            style={{ marginTop: 6, marginLeft: 2 }}
          />
        </TouchableOpacity>
      </View>

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
    marginTop: -52,
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
  headerImage: {
    marginTop: Platform.OS === "web" ? 375 : -136,
    marginLeft: -50,
  },
  footerImage: {
    position: "absolute",
    bottom: -325,
    right: -225,
  },
  back: {
    position: "absolute",
    top: 32,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingContainer: {
    position: "absolute",
    top: 34,
    alignItems: "center",
    width: "100%",
  },
});
