import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import useAuth from "./utils/hooks/useAuth";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAfOdUqWh4whZXQmSL6QmpPQybsvJqRQTs",
  authDomain: "socialapp-3f52a.firebaseapp.com",
  databaseURL: "https://socialapp-3f52a.firebaseio.com",
  projectId: "socialapp-3f52a",
  storageBucket: "socialapp-3f52a.appspot.com",
  messagingSenderId: "765203656038",
  appId: "1:765203656038:web:9fc4725161a4244d18aca7",
};

firebase.initializeApp(firebaseConfig);

const Main = createStackNavigator();

const AuthenticatedApp = () => (
  <NavigationContainer>
    <Main.Navigator headerMode="none">
      <Main.Screen name="Home" component={HomeScreen} />
    </Main.Navigator>
  </NavigationContainer>
);

const UnauthenticatedApp = () => (
  <NavigationContainer>
    <Main.Navigator headerMode="none" initialRouteName="Login">
      <Main.Screen name="SignUp" component={SignUpScreen} />
      <Main.Screen name="Login" component={LoginScreen} />
    </Main.Navigator>
  </NavigationContainer>
);

export default function App() {
  const [isLoading, isLoggedIn] = useAuth();

  if (isLoading) return <LoadingScreen />;

  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
