import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignUpScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    inputValidities: {
      name: false,
      email: false,
      phone: false,
      password: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {

    const signup = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.password,
    )

      const createUser = authActions.createUserInDatabase(
      formState.inputValues.name,
      formState.inputValues.email,
      formState.inputValues.phone,
    );

    setError(null);
    setIsLoading(true);
    try {
        await dispatch(signup);
        await dispatch(createUser);
      // props.navigation.navigate("Home");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

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
            <View style={styles.backButton}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("SignIn");
                }}
              >
                <Feather
                  name="arrow-left-circle"
                  size={30}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <Animatable.Image
                animation="bounceIn"
                duration={1500}
                source={require("../../assets/ct-design-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Input
              id="name"
              placeholder="Full Name"
              autoCapitalize="none"
              title="Name"
              iconName="user-o"
              iconSize={20}
              keyboardType="default"
              errorText="Please enter a name."
              onInputChange={inputChangeHandler}
              initialValue=""
              required={true}
              minLength={3}
            />
            <Input
              id="email"
              placeholder="Email address"
              autoCapitalize="none"
              title="Email Address"
              iconName="envelope-o"
              iconSize={20}
              keyboardType="email-address"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
              required={true}
            />
            <Input
              id="phone"
              placeholder="Phone Number"
              autoCapitalize="none"
              title="Phone Number"
              iconName="phone"
              iconSize={20}
              keyboardType="phone-pad"
              errorText="Please enter a valid phone number."
              onInputChange={inputChangeHandler}
              initialValue=""
              required={true}
              maxLength={10}
              minLength={10}
            />
            <Input
              id="password"
              placeholder="Password"
              autoCapitalize="none"
              title="Password"
              iconName="lock"
              iconSize={20}
              keyboardType="default"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
              required={true}
              minLength={6}
              togglePasswordVisibility={true}
            />
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              autoCapitalize="none"
              title="Confirm Password"
              iconName="lock"
              iconSize={20}
              keyboardType="default"
              errorText="The passwords do not match."
              onInputChange={inputChangeHandler}
              initialValue=""
              required={true}
              minLength={6}
              togglePasswordVisibility={true}
            />
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={authHandler}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  style={styles.signUp}
                >
                  <Text style={(styles.textSign, { color: Colors.white })}>
                    Create a New Account
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
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 40,
  },
  logoContainer: {
    flex: 1,
    marginTop: 50,
    marginLeft: -25,
  },
  logo: {
    alignSelf: "center",
    justifyContent: "center",
    height: height_logo,
  },
  footer: {
    flex: 5,
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
});

export default SignUpScreen;
