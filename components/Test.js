import React from "react";
import {
  View,
  Button,
  Platform,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Card from "./UI/Card";
import { AntDesign, Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Test = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={styles.closeButton}>
        <AntDesign name="closecircleo" size={24} color={Colors.white} />
      </TouchableOpacity>
      <Card style={styles.cardContainer}>
        <View style={styles.inputContainer}>
          <Feather name="user" size={24} color="black" />
          <TextInput style={styles.textInput} placeholder="Customer name" />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="users" size={24} color="black" />
          <TextInput style={styles.textInput} placeholder="Byname" />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="map-pin" size={24} color="black" />
          <TextInput style={styles.textInput} placeholder="Location" />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="phone" size={24} color="black" />
          <TextInput style={styles.textInput} placeholder="Phone Number" />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={24} color="black" />
          <TextInput style={styles.textInput} placeholder="Email address" />
        </View>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.inputContainer}>
            <AntDesign name="picture" size={24} color={Colors.darkerGrey} />
            <Text style={styles.imageText}>Customer Image</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.button}>
          <Button title="Update" onPress={() => {}} color={Colors.primary} />
        </View>
      </Card>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  textInput: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 1,
    marginBottom: 10,
    width: "80%",
  },
  button: {
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 5,
  },
  imageText: {
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 1,
    marginBottom: 10,
    width: "80%",
    color: Colors.grey,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20,
  }
});
