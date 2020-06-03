import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import Fire from "../Fire";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  console.log("user: ", user);

  const signOutUser = () => {
    Fire.shared.signOut();
  };

  useEffect(() => {
    const user = Fire.shared.uid;

    return Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 64, alignItems: "center" }}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require("../assets/tempAvatar.jpg")
            }
          />
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>981</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>

        <Button onPress={signOutUser} title="Log out" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    marginTop: 64,
    alignItems: "center",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4,
    borderRadius: 68,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
