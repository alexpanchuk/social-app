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
import Fire from "./Fire";
import "./utils/fixbugs/fixTimerBug.js";
import "./utils/fixbugs/fixAtob.js";

const Main = createStackNavigator();
const RootStack = createStackNavigator();
const AppTabs = createBottomTabNavigator();

const getIcon = (name) => ({ color }) => (
  <Ionicons name={name} size={24} color={color} />
);

const MainStackScreen = () => (
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
      name="CustomNavigation"
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
        tabBarVisible: false,
      }}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("Post");
        },
      })}
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
);

function AuthenticatedApp() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="Post" component={PostScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

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
