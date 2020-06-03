import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";
import UserPermissions from "../utils/UserPermissions";

const firebase = require("firebase");
require("firebase/firestore");

export default function PostScreen({ navigation }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = () => {
    Fire.shared
      .addPost({ text: text.trim(), localUri: image })
      .then(() => {
        setText("");
        setImage(null);
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    UserPermissions.getCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePost}>
          <Text style={{ fontWeight: "500" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/tempAvatar.jpg")}
          style={styles.avatar}
        ></Image>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Want to share something?"
          onChangeText={setText}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
      </TouchableOpacity>

      <View style={styles.imagePreview}>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
  imagePreview: {
    marginHorizontal: 32,
    marginTop: 32,
    height: 150,
  },
});
