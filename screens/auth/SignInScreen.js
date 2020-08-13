import React, { useState, useEffect, useReducer, useCallback } from "react";
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

const SignInScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    const login = authActions.login(
      formState.inputValues.email,
      formState.inputValues.password
    );

    setError(null);
    setIsLoading(true);
    try {
      dispatch(login);
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
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.primary} />
              ) : (
                <TouchableOpacity
                  style={styles.signInContainer}
                  activeOpacity={0.6}
                  onPress={authHandler}
                >
                  <LinearGradient
                    colors={[Colors.primary, Colors.primaryDark]}
                    style={styles.signIn}
                  >
                    <Text style={(styles.textSign, { color: Colors.white })}>
                      Sign In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SignUp")}
                style={[
                  styles.signIn,
                  {
                    borderColor: Colors.primary,
                    borderWidth: 2,
                    marginTop: 5,
                  },
                ]}
              >
                <Text
                  style={
                    (styles.textSign,
                    {
                      color: Colors.primary,
                    })
                  }
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
    flex: 4,
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

export default SignInScreen;
