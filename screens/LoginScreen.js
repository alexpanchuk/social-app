// 10:36

import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import { merge } from "ramda";
import TextInputField from "../components/TextInputField";
import * as firebase from "firebase";

export default function LoginScreen({ navigation }) {
  const [{ email = "", password = "" }, setFormData] = useReducer(merge, {});
  const [errorMessage, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  LayoutAnimation.easeInEaseOut();

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
      <Image
        source={require("../assets/loginLogo.png")}
        style={styles.loginLogo}
      />
      <Text style={styles.greeting}>Hello again.{`\r\n`} Wellcome back.</Text>
      <View style={styles.error}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>

      <View style={styles.form}>
        <TextInputField
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
          {isLoading ? "Loading..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.question}>
          New to Social App? <Text style={styles.signUpText}>Sign Up</Text>
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
    marginTop: -16,
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
    marginTop: -32,
    marginBottom: 48,
    marginHorizontal: 30,
  },
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
  password: {
    marginTop: 32,
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
  signUpText: {
    fontWeight: "500",
    color: "#e9446a",
  },
  headerImage: {
    marginTop: -216,
    marginLeft: -50,
  },
  footerImage: {
    position: "absolute",
    bottom: -325,
    right: -225,
  },
  loginLogo: {
    marginTop: -110,
    alignSelf: "center",
  },
});
