import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTime from "luxon/src/datetime.js";

export default function Post({ id, name, text, timestamp, avatar, image }) {
  return (
    <View style={styles.feedItem}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.timestamp}>
              {DateTime.fromMillis(timestamp).toRelative()}
            </Text>
          </View>

          <Ionicons name="ios-more" size={24} color="#73788B" />
        </View>
        <Text style={styles.post}>{text}</Text>
        <Image source={image} style={styles.postImage} resizeMode="cover" />
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-heart-empty"
            size={24}
            color="#73788B"
            style={styles.likeIcon}
          />
          <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  iconContainer: {
    flexDirection: "row",
  },
  likeIcon: {
    marginRight: 16,
  },
});
