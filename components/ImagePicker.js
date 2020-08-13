import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = () => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Camera permissions not given!",
        "Please grant camera permissions to use the app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.6}
        onPress={takeImageHandler}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          style={styles.buttonGradient}
        >
          <Text style={(styles.btnText, { color: Colors.white })}>
            {props.buttonText}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  buttonGradient: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
  },
});
