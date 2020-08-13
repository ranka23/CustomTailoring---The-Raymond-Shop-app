import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import InputOnly from "../../components/UI/InputOnly";
import Colors from "../../constants/Colors";

import * as Animatable from "react-native-animatable";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";

const CreateCustomerInputSelfieScreen = (props) => {
  // TODO: Add error handling for the inputs!!

  const initialState = "";

  const [phone, setPhone] = useState(initialState);
  const [email, setEmail] = useState(initialState);

  const { name } = props.route.params;
  const { nickname } = props.route.params;
  const { location } = props.route.params;

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
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300, height: 300 } }],
      { compress: 0.8, format: "jpeg" }
    );

    props.navigation.navigate("CreateCustomerInputConfirm", {
      name: name,
      nickname: nickname,
      location: location,
      phone: phone,
      email: email,
      image: manipResult.uri,
    });
  };

  return (
    <KeyboardAvoidingView behavior="default" style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={{ width: "100%", flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.header}>
            <Animatable.Image
              animation="bounceIn"
              duration={1500}
              source={require("../../assets/complete-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <InputOnly
              id="phone"
              placeholder="Phone Number"
              autoCapitalize="none"
              title="Phone Number"
              iconName="phone"
              iconSize={20}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              initialValue=""
              required={true}
              maxLength={10}
              minLength={10}
            />
            <InputOnly
              id="email"
              placeholder="Email address"
              autoCapitalize="none"
              title="Email Address"
              iconName="envelope-o"
              iconSize={20}
              keyboardType="email-address"
              initialValue=""
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signInContainer}
                activeOpacity={0.6}
                onPress={takeImageHandler} // TODO: Open camera and take selfie
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  style={styles.signIn}
                >
                  <Text style={(styles.textSign, { color: Colors.white })}>
                    TAKE A SELFIE
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: height_logo,
    marginTop: 70,
  },
  footer: {
    flex: 4,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
  },
  signInContainer: {
    width: "100%",
  },
  signUp: {
    width: "100%",
    height: 40,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signIn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
  },
  forgotPassword: {
    color: Colors.primary,
    marginTop: 15,
  },
});

export default CreateCustomerInputSelfieScreen;
