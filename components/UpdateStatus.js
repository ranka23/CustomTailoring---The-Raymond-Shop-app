import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import Colors from "../constants/Colors";


const UpdateStatus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>STATUS</Text>
      <View style={styles.statusChangeContainer}>
        <Text style={styles.currentStatusText} numberOfLines={1}>
          Cloth Cutting
        </Text>
        <Text style={styles.arrowIcon}>
          <Fontisto name="arrow-right-l" size={24} color={Colors.green} />
        </Text>
        <Text style={styles.nextStatusText} numberOfLines={1}>
          Stitching Stage 1
        </Text>
      </View>
      <View style={styles.updateButton}>
        <Button title="Update" color={Colors.primary} />
      </View>
    </View>
  );
};

export default UpdateStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: Colors.lightGrey,
  },
  statusText: {
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  statusChangeContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems: "center",
  },
  currentStatusText: {
    flex: 1,
    fontWeight: "bold",
    color: Colors.darkerGrey,
  },
  arrowIcon: {
    flex: 0.4,
    justifyContent: "center",
    textAlign: "center",
  },
  nextStatusText: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
    color: Colors.darkerGrey,
  },
  updateButton: {
    borderRadius: 5,
    overflow: "hidden",
  },
});
