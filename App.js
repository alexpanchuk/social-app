import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MessageScreen from "./screens/MessageScreen";
import NotificationScreen from "./screens/NotificationScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Main = createStackNavigator();
const AppTabs = createBottomTabNavigator();
const getIcon = (name) => ({ color }) => (
  <Ionicons name={name} size={24} color={color} />
);

const AuthenticatedApp = () => (
  <NavigationContainer>
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: "#161f3d",
        inactiveTintColor: "#b8bbc4",
        showLabel: false,
      }}
    >
      <AppTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: getIcon("ios-home") }}
      />
      <AppTabs.Screen
        name="Message"
        component={MessageScreen}
        options={{ tabBarIcon: getIcon("ios-chatboxes") }}
      />
      <AppTabs.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="ios-add-circle"
              size={48}
              color="#e9446a"
              style={{
                shadowColor: "#e9446a",
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 10,
                shadowOpacity: 0.3,
              }}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ tabBarIcon: getIcon("ios-notifications") }}
      />
      <AppTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: getIcon("ios-person") }}
      />
    </AppTabs.Navigator>
  </NavigationContainer>
);

const UnauthenticatedApp = () => (
  <NavigationContainer>
    <Main.Navigator headerMode="none">
      <Main.Screen name="Login" component={LoginScreen} />
      <Main.Screen name="SignUp" component={SignUpScreen} />
    </Main.Navigator>
  </NavigationContainer>
);

export default function App() {
  const [isLoading, isLoggedIn] = useAuth();

  if (isLoading) return <LoadingScreen />;

  return isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
