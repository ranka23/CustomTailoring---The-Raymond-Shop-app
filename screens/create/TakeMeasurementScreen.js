import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import * as customerActions from "../../store/actions/customer";
import { useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";

import * as Animatable from "react-native-animatable";

const TakeMeasurementScreen = (props) => {
  const { name } = props.route.params;
  const { customerId } = props.route.params;
  const { totalInvoices } = props.route.params

  const dispatch = useDispatch();

  const [measurementInput, setMeasurementInput] = useState("");

  const handleMeasurementSubmit = async () => {
    const measurementArray = measurementInput.split(" ");

    const addMeasurements = await customerActions.addCustomerMeasurementToDatabase(
      customerId,
      measurementArray
    );

    try {
      dispatch(addMeasurements);
      props.navigation.navigate("CreateCustomerInvoice", {
        customerId,
        totalInvoices
      });
    } catch (err) {
      console.log(err)
    }
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
          <View style={styles.textInputContainer}>
            <Text style={styles.headerText}>Mr. {name}'s Measurement</Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              keyboardType={
                Platform.OS === "ios"
                  ? "numbers-and-punctuation"
                  : "decimal-pad"
              }
              placeholder="Please make sure to separate each input with a space to register the measurements properly."
              value={measurementInput}
              onChangeText={(text) => setMeasurementInput(text)}
              initialValue=""
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signInContainer}
              activeOpacity={0.6}
              onPress={handleMeasurementSubmit}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>SAVE MEASUREMENTS</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.takeLater}>MAYBE LATER</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

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
  textInputContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  textInput: {
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    textAlignVertical: "top",
    height: height_logo,
    marginTop: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  signIn: {
    marginTop: 10,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontWeight: "bold",
    color: Colors.white,
  },
  takeLater: {
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 20,
  },
});

export default TakeMeasurementScreen;
