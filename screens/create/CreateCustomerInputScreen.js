import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
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

const CreateCustomerInputScreen = (props) => {
  const initialState = "";
  const [name, setName] = useState(initialState);
  const [nickname, setNickname] = useState(initialState);
  const [location, setLocation] = useState(initialState);

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
              id="name"
              placeholder="Full Name"
              autoCapitalize="none"
              title="Name"
              iconName="user-o"
              iconSize={20}
              keyboardType="default"
              onChangeText={(text) => setName(text)}
              value={name}
              initialValue=""
              required={true}
              minLength={3}
            />
            <InputOnly
              id="nickname"
              placeholder="Mutual acquaintance or Name of your business"
              autoCapitalize="none"
              title="Byname"
              iconName="users"
              iconSize={20}
              keyboardType="default"
              errorText="Please enter a valid Byname."
              onChangeText={(text) => setNickname(text)}
              value={nickname}
              initialValue=""
              required={true}
              minLength={3}
            />
            <InputOnly
              id="location"
              placeholder="eg: Rajaji Nagar, Bangalore"
              autoCapitalize="none"
              title="Location"
              iconName="map-pin"
              iconSize={20}
              onChangeText={(text) => setLocation(text)}
              value={location}
              keyboardType="default"
              initialValue=""
              required={true}
              minLength={3}
            />
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signInContainer}
                activeOpacity={0.6}
                onPress={() =>
                  props.navigation.navigate("CreateCustomerInputSelfie", {
                    name: name,
                    nickname: nickname,
                    location: location,
                  })
                }
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  style={styles.signIn}
                >
                  <Text style={(styles.textSign, { color: Colors.white })}>
                    NEXT
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

export default CreateCustomerInputScreen;
